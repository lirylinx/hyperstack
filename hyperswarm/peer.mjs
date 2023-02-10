import Hyperswarm from 'hyperswarm';
import goodbye from 'graceful-goodbye';
import crypto from 'hypercore-crypto';
import b4a from 'b4a';


/**
 * peer.mjs é um servidor e cliente ponto que conecta-se a outros pares através de um topico comum entre os pares(peers)
 * usa o  hyperswarm um modulo de alto nivel que faz uso do modulo hyperswarm/dht para conectar varios pares(peers) através de um topico comum.
 * 
 */

const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

// Acompanhar todas conexões e os dados de entrada do console.log

const conns = [];

// Exame de conexões ou peers
// Quando os pares se conectam, activam o evento 'connection'
swarm.on('connection', conn => {
    const name = b4a.toString(conn.remotePublicKey, 'hex');
    console.log('* Uma conexão apartir de', name, '*');
    conns.push(conn);
    conn.once('close', ()=> conns.splice(conns.indexOf(conn), 1));
    conn.on('data', data => console.log(`${name}: ${data}`));
});

// Broadcast a entrada de dados para todas conexões criadas
process.stdin.on('data', d => {
    for (const conn of conns) {
        conn.write(d);
    };
});

// juntar-se a um tópico comum
const topico = process.argv[2] ? b4a.from(process.argv[2], 'hex') : crypto.randomBytes(32);
const discovery = swarm.join(topico, { client: true, server: true});

// A Promise liberada será resolvida quando o tópico for totalmente anúnciado ao DHT
discovery.flushed().then(() => {
    console.log('topico:', b4a.toString(topico, 'hex'));
});