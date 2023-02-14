import Corestore from "corestore";
import Hyperswarm from "hyperswarm";
import goodbye from "graceful-goodbye";
import b4a from 'b4a';

// passar a chave como argumento 
const key = b4a.from(process.argv[2], 'hex');

// Criar a instancia Corestore
const store = new Corestore('./reader-storage-1');
const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

// Replicacao da instancia Corestore para todas conexoes
swarm.on('connection', conn => store.replicate(conn));

// Criacao/Obtencao de uma instancia hypercore usando a chave passada
const core = store.get({key, valueEncoding: 'json'});

// Aguardar ate que todas propriedades do hypercore estejam inicializadas
await core.ready();

const foundPeers = store.findingPeers();

// Juntar-se a um topico
swarm.join(core.discoveryKey);
swarm.flush().then(() => foundPeers);

// Actualizar os metadados da instancia hypercore
await core.update();

if ( core.length === 0) {
    console.log('Nao ha conexao com o par(peer) escritor');
    process.exit(1);
}


// Obter os nucleos(core) usando as chaves armazenados no primeiro bloco do nucleo principal
const { otherKeys } = await core.get(0);
for ( key in otherKeys ) {
    const core = store.get({ key: b4a.from(key, 'hex')});

    // Em todos anexos ao hypercore
    // baixar os ultimos blocos do nucleo e mostrar no console
    core.on('append', () => {
        const seq = core.length - 1;
        core.get(seq).then(block => {
            console.log(`Bloco ${seq} no nucleo ${key}: ${block}`)
        });
    });
}