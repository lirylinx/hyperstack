# hyperstack ou Holepunch

Repositório que contêm  exercicios e exemplos de codigos que usam o Holepunch.
## Holepunch 
O Holepunch equipa os desenvolvedores com um poderoso conjunto de componentes independentes para construir sem esforço aplicativos peer-to-peer.
O Ecosistema Holepunch  é construído utilizando os seguintes componentes estruturais.
-  [Hypercore](https://docs.holepunch.to/building-blocks/hypercore): Um log somente de anexo seguro e distribuído é uma ferramenta útil para criar aplicativos rápidos e escaláveis sem um back-end, pois é totalmente ponto a ponto.
- [Corestore](https://docs.holepunch.to/building-blocks/corestore): Uma fábrica Hypercore projetada para facilitar o gerenciamento de grandes coleções de Hypercore nomeados.
- [Hyperswarm](https://docs.holepunch.to/building-blocks/hyperswarm): Uma API de alto nível para localizar e conectar-se a pares (peers) interessados em um "tópico".
  - [@hyperswarm/dht](https://docs.holepunch.to/building-blocks/hyperswarm#dht): Um DHT alimentando o Hyperswarm. Por meio desse DHT, cada servidor é vinculado a um par de chaves exclusivo, com o cliente conectando-se ao servidor usando a chave pública do servidor.
  - [@hyperswarm/secretstream](https://docs.holepunch.to/building-blocks/hyperswarm#secretstream): O Secretstream é usado para criar conexões seguras entre dois pares(peers) no Hyperswarm.
- [Hyperbee](https://docs.holepunch.to/building-blocks/hyperbee): Uma árvore-B (B-tree) somente de anexo em execução em um Hypercore. Ele fornece API de armazenamento de chave-valor, com métodos para inserir e obter pares de chave/valor, inserções de lote(batch) atômico e criação de iteradores classificados ou ordenados.
- [Hyperdrive](https://docs.holepunch.to/building-blocks/hyperdrive): Um sistema de arquivos distribuído seguro e em tempo real que simplifica o compartilhamento de arquivos ponto a ponto (P2P). Ele fornece uma maneira eficiente de armazenar e acessar dados em vários dispositivos conectados de maneira descentralizada.
- [Autobase](https://docs.holepunch.to/building-blocks/autobase): Um módulo experimental usado para rebasear(rebase) automaticamente vários Hypercores vinculados causalmente em um único Hypercore linearizado para colaboração de multiusuário.
