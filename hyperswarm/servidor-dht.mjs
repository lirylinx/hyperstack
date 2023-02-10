import DHT from '@hyperswarm/dht';
import goodbye  from 'graceful-goodbye';
import b4a from 'b4a';

/* server.mjs criará um par de chaves e, em seguida,
    iniciará um servidor que escutará o par de chaves gerado.
    A chave pública é registrada no console
*/


// instanciar DHT
const dht = new DHT();


// O par de chaves gerados, sera o idenficador de par(peer) no DHT
const keyPair = DHT.keyPair();


// Criar o servidor
const server = dht.createServer(conn => {
    console.log('Criado conexao');
    process.stdin.pipe(conn).pipe(process.stdout);
});

// Esperar por pares na rede com acesso ao chave publica se conectarem ao servidor
server.listen(keyPair).then(() => {
    console.log('Escutando em:', b4a.toString(keyPair.publicKey, 'hex'));
});


// Anuncie a chave pública antes de sair do processo 
// (Isso não é um requisito, mas ajuda a evitar a poluição do DHT)
goodbye(() => server.close());
