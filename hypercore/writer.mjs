import Hyperswarm from "hyperswarm";
import Hypercore from 'hypercore';
import goodbye from "graceful-goodbye";
import b4a from "b4a";


const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

const core = new Hypercore('./writer-storage');

// core.key e core.discoveryKey so seraao definidos depois que core.ready() for resolvido
await core.ready();
console.log('hypercore key:',  b4a.toString(core.key, 'hex'));

//Anexar todos dados de entrada em blocos separados ao nucleo(core)
process.stdin.on('data', data => core.append(data));

// core.discoveryKey nao eh um recurso de leitura ao nucleo(core)
// E usado apenas para encontrar outros pares(peers) que *podem* ter o nucleo(core)
swarm.join(core.discoveryKey);
swarm.on('connection', conn => core.replicate(conn));