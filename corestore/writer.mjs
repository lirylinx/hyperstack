import Corestore from "corestore";
import Hyperswarm from "hyperswarm";
import goodbye from "graceful-goodbye";
import b4a from 'b4a';


const store = new Corestore('./writer-storage-1');
const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());


// O nome usado no corestore eh local e mapeado para um par de chaves.
// Nao eh visivel para os leitores.
// Uma vez que um nome sempre corresponde a um par de chaves, todas sao gravaveis.

const core1 = store.get({name: 'core-1', valueEncoding: 'json'});
const core2 = store.get({name: 'core-2'});
const core3 = store.get({name: 'core-3'});
await Promise.all([core1.ready(), core2.ready(), core3.ready()]);

console.log('Nucleo principal chave:', b4a.toString(core1.key, 'hex'));

// Nao sera preciso anunciar o core2 e core3, porque serao replicado 
// juntamente com o core1
swarm.join(core.discoveryKey);

// A replicacao corestore gerencia internamente para rreplicar cada nucleo carregado
// Corestore nao troca de chaves(recurso de leitura) durante a replicacao.

swarm.on('connection', conn => store.replicate(conn));

if (core1.length === 0) {
    await core1.append({
        otherKeys: [core2, core3].map(core => b4a.toString(core.key, 'hex'))
    })
}

// Armazenar todas mensagens curtas em core3 e as longas em core3
process.stdin.on('data', data => {
    if ( data.length < 5) {
        console.log('Anexando dados curtos em core2');
        core2.append(data);
    } else {
        console.log('Anexando dados longos em core3')
        core3.append(data);
    }
});