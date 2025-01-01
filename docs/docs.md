////////////////////////// APPLICATION ARCHITECTURE //////////////////////////

# COMPONENTS MODEL




# KAATAN CHAT

## Carregamento Inicial

**Kaatan Chat** é uma aplicação *vanilla* de página única, todo o conteúdo é renderizado em *index.html*.

A aplicação roda por meio do script ***kaatan.js*** que é o primeiro a ser carregado em *index.html*, antes mesmo da chamada de `window.load()`.
Toda comunicação com o servidor é efetuada por meio do service worker ***ksw.js***.
Ao iniciar a aplicação as duas sequencias de execução principais são iniciadas:

1. A comunicação de rede por meio do KSW.

2. A logica e interação com usuário por meio do script Kaatan.

A renderização é feita por meio de chamadas ao script *renderer.js*, responsável pela renderização da página e *acacia.js* responsável por fornecer os componentes de interface. A biblioteca de componentes Acácia (*acacia.js* e *acacia.css*) é uma biblioteca lightweight, singlefile, que fornece componentes vanilla responsivos e simples de se utilizar, ver capítulo específico.

O tratamento de conteudo, dados de usuários, de salas da aplicação, midia e texto enviado e recebido e qualquer dado armazenado é feito pelo script ***content.js***.

Dessa forma, o script Kaatan que gerencia a aplicação principal a qual o usuário tem acesso se comunica intermitentemento com os scripts de interface (front), e os de rede e dados (back).

![FRONTEND](/docs/Kaatan%20Chat%20Arch.svg)

O script *kaatan.js* começa a ser executado automaticamente quando index.html é carregado pelo navegador, ele inicia chamando o método `App.Main()` que possui o identificador `#kaatanjs001` (os identificadores se encontram em *identifiers.md* na raiz da aplicação e servem para busca de partes importantes do código ou sessões com conteúdo incompleto a ser terminado).

1.  `App.Main()` Sequência Principal da Aplicação:

	_id: `#kaatanjs001`

Inicia a aplicação. É chamado em index.html e adiciona um ouvinte de eventos a `window.load`, para que, assim que a *splash-screen* for renderizada:

* 1.1. Criar todos eventos personalizados a serem usados pela aplicação.

* 1.2. Verificar a existencia do registro `kaatan-id` no armazenamento local com os dados do usuário.
	- 1.2.1. Caso o registro `kaatan-id` conste no armazenamento local:
		- _"Registra `ksw.js` como service-worker da página."_
		- Escuta o recebimentos de mensagens de `ksw.js`
		- Atualiza o estado _inmemory_ da aplicação (State).
		- Adiciona como ouvinte do evento `startpreload` a função `App.Preload()`.
		- Adiciona um manipulador ao evento `onbeforeunload` para tratar a comunicação de rede somente em segundo plano.
		- Adiciona um manipulador ao evento `onoffline` para desconectar a aplicação principal e adicionar as mensagens enviadas à fila.
		- Adiciona um manipulador ao evento `ononline` para reconectar a aplicação, enviar as mensagens da fila e retomar a comunicação de rede em primeiro plano.
	- 1.2.2. Se o registro não constar no armazenamento local, redireciona para a página de acesso, onde o usuário pode acessar com uma nova conta ou efetuar login.

* 1.3. 

2.  KSW - Sequência Principal de Rede:

	_id: `#kswjs002`
	

3.  Página de Acesso:


4.  App.Preload():

	_id: `#kaatanjs002`


5.  App.LOOP:


6.  KSW.Invoke():


7.  KSW.Receive():

Responsável por:

* Conectar ao servidor.

* Obter a string de conexão.

* Obter um novo usuário se inexistente.

* Tratar as mensagens recebidas pelo servidor.

* 2.1. Efetua uma chamada à API `/connectionid`para obter uma string de conexão e armazena-a no armazenamento de sessão (no escopo somente da guia atual).

* 2.1.1. Se a solicitação falhar, chamar `App.ServerError()` e encerra a aplicação.

* 2.2. Cria o evento `window.connected` e adiciona `ChatServer.ReceiveMessage()` ao ouvinte do evento.

* 2.3. Cria o evento `window.preloadstart` e adiciona `App.PreloadComplete()` ao ouvinte do evento.

* 2.4. Configurações finais:

* Cria o objeto de conexão `WebSocket`.

* Efetua a conexão e dispara `window.connected`.

* Trata `beforeunload` para desconectar do servidor ao fechar a aplicação.

* Trata os status online e offline.

  

3.  `ChatServer.ReceiveMessage()`:

Ouvinte do evento `window.connected`. Chamado quando a conexão com o servidor foi estabelecida com sucesso e responsável por adicionar o novo usuário à lista de ativos, e manipular o recebimento de mensagens.

* 3.1. Manipula todas as requisições de `State.CONNECTION.onmessage` chamando uma função de `ChatServer` de acordo com a propriedade `msg.Type`, e enviando à função o objeto `msg.Content` recebido.

* 3.2. Envia uma solicitação `NewLocalUser` ao servidor de socket para adicionar o novo usuário à lista de usuários online do servidor.
 

4.  `App.PreloadComplete()`:

Ouvinte do evento `window.preloadstart`. Chamada pelo servidor assim que a nova conexão do usuário foi adicionada com sucesso à lista de usuários ativos do servidor.

* 4.1. Envia uma solicitação `PreloadComplete` ao servidor para obter os dados iniciais de carregamento da aplicação como salas, mensagens e usuários. Após enviar os dados o servidor envia de volta uma mensagem `PreloadEnd`.

* 4.2. Adiciona um ouvinte ao evento `window.preloadend` disparado quando o servidor avisa que os dados de carregamento inicial foram todos enviados. O ounvinte:

* 4.2.1. Chama e aguarda `Renderer.Index()`, para renderizar a página inicial da aplicação.

* 4.2.2. Remove `PreloadComplete()` do evento `window.connected`.

* 4.2.3. Remove a Splash Screen do DOM HTML.

* 4.2.3. Efetua a primeira chamada de `App.Loop()`.

  

4.  `App.Loop()`:

Chamado pela primeira vez ao final de `App.PreloadComplete()` e chamado a cada segundo durante a execução da aplicação.

* 4.1. Efetua verificações periódicas de alteração de layout.

* 4.2. Checa o status da conexão com o servidor.

* 4.3. Envia um sinal ao servidor a cada 30 segundos e 16 minutos:

* 30sec: Atualiza o status online do usuário na lista de usuários

* 16min: Atualiza LastAccesTime na base de dados





## ChatServer

`ChatServer.MyProfileReceived()`:

* A

  

`ChatServer.MyDataReceived()`:

* A

  

`ChatServer.RoomDataReceived()`:

* A

  

`ChatServer.PreloadEnd()`:

* A

  

`ChatServer.UsersListUpdated()`:

* A

  

`ChatServer.RoomsListUpdated()`:

* A

  

`ChatServer.NotificationReceived()`:

* A

  

`ChatServer.MessageReceived()`:

* A

  

`ChatServer.System()`:

* A

  

`ChatServer.UserRequested()`:

* A

  

`ChatServer.Error()`:

* A

  
  

## Application Module

  

### Propriedades

  
  

### Métodos

  
  
  

# SERVIDOR






## Program


## AppModel


## App.Application Module


## Data.Logger Module


## Data.Config Module


## Data.Gladiator Module

server:

application:

model:

data:

gladiator:

sync:





## Dados

Index:

Armazenamento temporário para mensagens, usuários não cadastrados, e informações pequenas que identificam os dados trocados com frequência entre o cliente e o servidor.

Data:

Informações detalhadas sobre usuários e salas e dados a serem armazenados permanentemente

## Acácia

  
  

## Módulo de conteúdo (content.js)

  
  

## Módulo de stream (rtc.js)

  
  

## Comandos

  
  

# SERVIDOR DE SOCKET

O servidor de socket é responsável pela comunicação e troca de dados com o cliente e é executado junto com o servidor de roteamento em *server.js*.

## Cliente

Para se comunicar com o servidor, o cliente necessita enviar pelo menos um hash `Sec` obtido na criação de um perfil de usuário, o que é feito nas seguintes etapas:

1. O cliente efetua uma requisição GET à API `/u/ConnectionId/` para obter a ID de conexão que utilizará para se comunicar com o servidor.

* 2.1. O cliente efetua uma requisição GET à API `/u/GetNewUser/:name`, onde `name` é o parâmetro de requisição contendo o nome do usuário que efetuará as requisições. O retorno dessa API é um objeto JSON `UserData` contendo um perfil de usuário. O objeto `UserData` contém propriedades públicas, a saber:

* Username: nome de usuário

* Name: nome

* Description: descrição do perfil

* Thumbnail: foto do perfil

* Email: email

* Genre: sexo

* Insignia: nível

* DaysStreak: dias ativos consecutivamente

* RegisterTime: data de cadastro com login e senha

* LastAccessTime: última vez que acessou

  

* 2.2. Essas propriedades podem ser removidas caso o cliente apenas se comunique com o servidor sem uso da aplicação social. E contém propriedades privadas (que não podem ser compartilhadas com outros usuários), a saber:

* MainRoom: Sala padrão na qual ingressará sempre que acessar a aplicação

* Sec: Identificador hash do usuário

* LastToken: Último token de verificaçãoválido

* MailVerified: Se o email foi verificado e existe

* UserVerified: Se o usuário foi verificado e é maior de idade.

  

* 2.3. Essas propriedades contém informações importantes ao servidor, entre elas o hash `Sec` e os `tokens`, o hash Sec é responsável por garantir que um usuário não copie a Id de outro usuário para tentar se passar por ele, enquanto os tokens são responsáveis por liberar ou restringir acesso a recursos sensíveis do servidor. Em alguns casos uma terceira camada de segurança exige a senha do usuário, e em outros solicita a confirmação por e-mail.

3. O cliente deve adicionar a string de conexão ao objeto `UserData` obtido com o identificador `ConnectionId` para uso posterior.

4. O cliente poderá chamar funções do servidor, para tal ele deve conhecer o identificador da função e os parâmetros exigidos por ela.

5. O cliente poderá expor funções a serem chamadas pelo servidor, para tal ele deve conhecer o identificador e os parâmetros da função exposta para que o servidor chame.

6. Em alguns casos, chamadas de funções no servidor por parte do cliente podem exigir:

* O objeto `UserData`: nesse caso o servidor precisa verificar o horário da conexão, o status de verificação do e-mail ou do perfil.

* O hash Sec: Nesse caso o servidor precisa garantir que é realmente o usuário criado que está tentando modificar suas configurações.

* Token + hash Sec: O servidor está exigindo que o usuário prove quem ele é que tem autorização para alterar determinado recurso.

* Token + hash Sec + Senha: O servidor está exigindo que o usuário prove quem ele é que tem autorização para alterar determinado recurso, adicionando uma proteção contra usuários hackeados.

* Código de verificação por e-mail: Proteção máxima.

  

## Chamada de funções no servidor

Clientes podem chamar funções no servidor enviando uma mensagem que contenha uma string com um objeto JSON, no seguinte formato

```

{

Type: type,

Content: obj,

Id: id,

Token: token,

ConnectionId: connectionId,

}

```

7. Há algumas excessões onde os dados enviando não são este objeto, e outras onde objeto não precisa incluir todas as propriedades, mas basicamente a maioria das solicitações devem incluí-lo, e ele deve estar serializado, caso contrário a desserialização provocará um erro do servidor. As propriedades são:

*  `Type`: O identificador da função a ser chamada no servidor.

*  `Content`: O argumento da função a ser chamada no servidor.

*  `Id`: A Id de usuário.

*  `Token`: O último token válido.

*  `ConnectionId`: A Id de conexão

  

## Carregamento inicial

1.  `NewLocalUser()`:

Responsável por:

- Adicionar o novo cliente à lista de usuários ativos, com um identificador da conexão atual com o qual é possível ao servidor enviar mensagens ao cliente.

- Ingressar o usuário na sala de conversa definida como padrão nas propriedades do cliente.

- Efetuar as configurações necessárias efetuando verificações de segurança e de acesso.

- Armazenar as informações necessárias para o usuário acessar informações sensíveis.

  

* 1.1 Clientes possuindo um objeto `UserData` (como visto anteriormente) contendo uma string `ConnectionId` podem se adicionar à lista de usuários ativos, isso lhes dá a possibilidade de ingressar em salas de conversa, enviar e receber mensagens e interagir com outros recursos da aplicação cliente. Para tal ele deve chamar a função `NewLocalUser` no servidor, o que é feito enviando uma mensagem com o seguinte objeto em formato JSON (string):

```
{
    Type: "NewLocalUser",
    Content: UserData
}
```

* 1.2. A propriedade `Content` é onde deve enviar o objeto `UserData` completo (contendo a `ConnectionId`).

* 1.3. A desconexão completa do cliente com o servidor de socket o removerá da lista de usuários ativos, portanto, em caso de reconexão, a função `NewLocalUser()` deverá ser chamada novamente.

* 1.4. Na manipulação de conexões entre múltiplas guias ou instâncias do navegador, o usuário será sempre o mesmo, identificado por sua `UserData.Id`, entretanto, cada instância ou guia funcionará com uma `ConnectionId` exclusiva. O servidor envia a mesma mensagem para todas as Ids de conexão, pois cada uma delas representa uma conexão do mesmo usuário com o servidor de socket. O cliente só é considerado desconectado quando a última Id de conexão cai.

* 1.5. A reconexão após reiniciar a aplicação no cliente (por exemplo no navegador), restaurará os dados do usuário previamente salvos para adicioná-lo novamente à lista de usuários ativos no servidor com o mesmo objeto `UserData`, ou seja mesmo nome, Id etc. Os dados de usuário só serão perdidos caso o uma limpeza automática ou manual dos dados locais ou de cache seja feita, nesse caso, o cliente deve efetuar novamente chamadas à API para obter um novo usuário. Não é possível recuperar do servidor dados de usuários locais não cadastrados com senha e login que possam ter sido indevidamente removidos no cliente.

* 1.6. Um cliente só pode adicionar novas conexões a um usuário existente fornecendo o hash `Sec` armazenado pelo usuário no servidor durante a primeira conexão. Isso impede que clientes adicionem conexões a outros usuários que não os seus. Uma vez que um usuário se conecte pela primeira vez com seu `UserData`, o hash Sec é armazenado persistentemente no servidor por até 7 dias, se o usuário não for cadastrado, ou indefinidamente se o usuário se cadastrar. Dessa maneira, mesmo que o usuário finalize todas as conexões, só conseguirá se conectar novamente com a mesma Id e dados anteriores fornecendo seu hash Sec inicial.

  

* 1.7. A função `NewLocalUser()` após executada com sucesso envia uma mensagem `PreloadStart` para o cliente recém ingressado, avisando-o que ele foi adicionado com sucesso à lista de usuários ativos. Na aplicação cliente essa mensagem dispara chamadas ao servidor para obter os dados da aplicação como lista de salas e usuários. Toda vez que o servidor recebe essa solicitação, ele envia:

- 1.7.1. A lista atualizada de usuários ativos na sala que ele ingressou, para todos os clientes ativos na mesma sala.

- 1.7.2.

- 1.7.3.

  

* 1.8. As chamadas a essa função passam pelo módulo *Gladiator* que impede chamadas sucessivas ou em excesso vindas de um mesmo cliente bloqueando acesso temporário ou até definitivo.

  

2.

  

`Application.AddUserToIndex()`:

  

`Application.UpdateUsersList()`:

  
  

## Server

  
  

## Application

  
  

## Data

  
  

## Logger

  
  

## Gladiator

  
  

# API

API

  

# ADMIN

Os endpoints admin estão entre duas categorias, rotas protegidas que iniciam com "/p/" que exigem uma senha mestra para execução e sempre são chamadas diretamente do host local do servidor, e rotas de administrador "/admin/" que exigem uma senha de administrador e podem ser chamadas de um painel de administrador, ambas as rotas visam acessar e manipular recursos em memória da aplicação como lista de salas e usuário.

  

# DIRETRIZES DE CÓDIGO

  

## Caixa:
Geral:
PascalCase: Classes, métodos e propriedades
camelCase: Variáveis locais e parâmetros
lowercase: Eventos
Especiais:
snake_case: variáveis de configuração (Data/Config.cs --> Default)
UPPERCASE: Comandos (kaatan.js --> Commands)

  

## Considerações de eficiência e desempenho:

* Ao adicionar módulos

- Não adicionar pacotes externos se o código puder ser criado manualmente sem uma diferença muito grande de esforço de codificação.

* Ao criar variáveis

- Verificar a quantidade de dados que uma variável armazena e o tempo de vida que ela ainda possui, se uma grande quantidade for armazenada e a vida útil for longa, limpá-la assim que os dados não forem necessários.

  

* Ao criar eventos

- Remover o ouvinte de eventos ou mesmo o evento quando não for necessário para evitar comportamento inesperado, checar todas as chamadas de addEventListener()