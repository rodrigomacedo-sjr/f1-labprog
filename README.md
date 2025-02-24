# ClassRoom
Nesta atividade, você deve desenvolver uma aplicação da sua escolha. Isso mesmo! Você vai poder pensar em uma aplicação do zero, da maneira como você quiser. Contudo, a aplicação deve atender os seguintes requisitos:  
  
a) A aplicação deve utilizar componentes para entrada de texto (ex.: Input) e botão (ex.: TouchableHighlight). Os componentes não precisam ficar limitados a esses dois, mas esses dois devem ser usados na aplicação em algum momento.   
b) A aplicação deve demandar o armazenamento e a recuperação de dados no estado do componente raiz (normalmente é o App).   
c) A aplicação deve definir estilos para os seus componentes, como cor de fundo, tamanho das fontes, bordas, etc.  
d) A aplicação deve utilizar dois esquemas de navegação: Stack e Bottom Tab.   
e) A aplicação não pode ser uma simples variação do que já fizemos em atividades em sala de aula (Ex.: uma melhoria no CitiesApp).   
f) A aplicação deve utilizar pelo menos uma API que discutimos durante as aulas (exceto a API Alert).  
  
Além do cumprimento desses requisitos, serão avaliados também a organização do código e a aparência da aplicação.   
  
*Os aplicativos devem ser diferentes. Dois ou mais estudantes não podem entregar aplicativos semelhantes. Sendo assim, preencha a planilha abaixo com sua ideia para que ninguém faça a mesma coisa.  
  
Nesta atividade, você deve entregar:

- os códigos-fonte dos componentes que você desenvolveu. Não entregue o projeto todo, pois ele traz muitas dependências. 
- um vídeo que demonstre o funcionamento da aplicação (Quem não entregar o vídeo terá a nota zerada). 

Todos estes arquivos devem ser compactados em um arquivo .zip, cujo nome terá o seguinte formato: Prova2\<primeiro nome do aluno><último sobrenome do aluno>. Se eu fosse entregar a prova, por exemplo, o nome do arquivo seria "Prova2GilbertoJunior".
# To Do
## A ideia
Um aplicativo de informações da F1
	A base da ideia é a API https://ergast.com/mrd/
Uma tela de informações dos pilotos
	nome, país, número, foto, acrônimo, cor da equipe, time
	https://ergast.com/mrd/methods/drivers/
Uma tela de informações das equipes
	nome, nacionalidade, link wikipedia
	https://ergast.com/mrd/methods/constructors/
Uma tela de calendario de corridas para a season
	localizacao, datas
	https://ergast.com/mrd/methods/schedule/
Uma tela de classificação
	quantos pontos, quantas vitórias
	https://ergast.com/mrd/methods/standings/

Muito interessante conceito, daria para fazer bem mais, uma versão melhorada do próprio aplicativo da fórmula 1 (acabei de descobrir que existia)

Não sei se realmente precisa usar uma das APIs discutidas em sala
Se precisar eu usario a Location para informar ao usuário qual vai ser a corrida mais próxima dele na temporada

Conceitos importantes de funcionamento
	Bottom Tab - menu para trocar entre as diferentes telas.
-	
	Stack - ao clicar em um piloto, corrida ou equipe, entrar em uma tela de mais informações com uma seta que permite voltar ao menu anterior. Aqui seria interessante poder clicar na equipe do piloto e ver informações dele ou vice versa e adicionar ao stack
- 
	APIs utilizadas serão Location e a Ergast.
- 
	Aplicação permitirá entrada de texto para pesquisa de corredores, equipes e corridas.
	Todo piloto, equipe e corrida estarão em um botão que irá exibir mais informações ao acessar.
- 
	Os cards de piloto e equipe serão customizados com a cor da equipe, uma corrida encerrada será colorida com a cor da equipe vencedora também.
	O aplicativo como um todo será estilizado mas isso garante o requisito de estilização.	
- 
	Será possível favoritas corridas, equipes e pilotos e acessar uma aba de favoritos.
	Isso cumpre o requisito de armazenamento e recuperação de dados.
	Seria interessante uma featura para o futuro de notificar o usuário um dia antes das corridas, e quando seus pilotos/equipes favoritas conseguiseem pódios, mas fica como extra também
## A lista de coisas a fazer
Criar boilerplate do aplicativo
Fazer a Bottom Tab com as opções de telas
Conseguir carregas as listas em suas respectivas telas
	pilotos
	equipes
	corridas
Tela de mais informações
	pilotos
	equipes
	corridas
Pesquisar por nome/abreviação
	pilotos
	equipes
	corridas
Favoritar
	pilotos
	equipes
	corridas
Aba de favoritos
Destacar corrida mais próxima do usuário (geográficamente)
Estilizar melhor componentes
	navbar
	card
		piloto
		equipe
		corrida
	saiba mais
		piloto
		equipe
		corrida
	tela de carregamento
Extras
	notificações sobre os favoritos
	grid de largada para corridas que ainda não ocorreram
	resultados completos de corridas passadas
Sonho
	live stats + radio de corridas ao vivo
