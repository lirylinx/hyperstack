import Hyperswarm from "hyperswarm";
import Hypercore from "hypercore";
import goodbye from "graceful-goodbye";


const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

const core = new Hypercore('./reader-storage', process.argv[2]);
await core.ready();

const foundPeers = core.findingPeers();
swarm.join(core.discoveryKey);
swarm.on('connection', conn => core.replicate(conn));


// swarm.flush() irá esperar até que *todos* os peers detectáveis ​​tenham sido conectados 
// Pode demorar um pouco, então melhor nao esperar (await)
// Em vez disso, usar core.findingPeers() para marcar quando o processo de descoberta for concluído
swarm.flush().then(() => foundPeers);

let position = core.length;
console.log(`Pulando ${core.length} blocos anteriores...`)

for await (const block of core.createReadStream({start: core.length,live: true})) {
    console.log(`Bloco ${position++}: ${block}`);
}

