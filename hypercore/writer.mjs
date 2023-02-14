import Hyperswarm from "hyperswarm";
import Hypercore from 'hypercore';
import goodbye from "graceful-goodbye";
import b4a from "b4a";


const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

const core = new Hypercore('./writer-storage');

// core.key e core.discoveryKey só serão definidos depois que core.ready() for resolvido
await core.ready();
console.log('hypercore key:',  b4a.toString(core.key, 'hex'));

//Anexar todos dados de entrada em blocos separados ao núcleo(core)
process.stdin.on('data', data => core.append(data));

// core.discoveryKey não é um recurso de leitura ao núcleo(core)
// É usado apenas para encontrar outros pares(peers) que *podem* ter o núcleo(core)
swarm.join(core.discoveryKey);
swarm.on('connection', conn => core.replicate(conn));