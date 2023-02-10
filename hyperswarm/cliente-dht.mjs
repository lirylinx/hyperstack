import DHT from '@hyperswarm/dht';
import b4a from 'b4a';

/*
cliente.mjs criará um cliente e a chave pública copiada do servidor 
deve ser fornecida como um argumento de linha de comando para conectar ao servidor. 
O processo do cliente registrará(log) a conexão obtida no console quando se conectar ao servidor.

Depois de conectado, pode-se digitar qualquer coisa nos dois terminais
*/

const key = process.argv[2];
console.log('Conectando a ', key);
const publicKey = b4a.from(key, 'hex');

const dht = new DHT();
const conn = dht.connect(publicKey);
conn.once('open', () => console.log('Conexão obtida!'));

process.stdin.pipe(conn).pipe(process.stdout);