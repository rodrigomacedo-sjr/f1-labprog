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
# Passo a passo
## Boilerplate
**Instalar requisitos**
nvm, node, expo-cli
``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

nvm install --lts

npm install -g expo-cli
```

**iniciar projeto**
``` bash
npx create-expo-app f1app --template blank
npm expo start
```
Aqui eu tive que trocar de npx (tutorial) para npm
Não entendi o motivo

**para poder ver as mudanças no navegador**
``` bash
npx expo install react-dom react-native-web @expo/metro-runtime
```
## Fazer a bottom tab
``` bash
npm install @react-navigation/native react-native-screens react-native-safe-area-context @expo/vector-icons

npm install @react-navigation/bottom-tabs
```

Instalar o bottom-tabs e ícones prontos pensando na estética.

react-native-screens e react-native-safe-area-context
	otimizar a performance e respeitar áreas seguras


**criar plaholders para as telas**
``` js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CorridasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corridas</Text>
      {/* adicionar lista de corridas depois */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold" },
});
```
telas semelhantes foram criadas para 'Equipes' e 'Pilotos'

**configurar o bottomtab navigator**
``` js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import PilotosScreen from '../screens/PilotosScreen';
import EquipesScreen from '../screens/EquipesScreen';
import CorridasScreen from '../screens/CorridasScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Pilotos"
        screenOptions={({ route }) => ({
          headerShown: false, 
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Pilotos') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Equipes') {
              iconName = focused ? 'car' : 'car-outline';
            } else if (route.name === 'Corridas') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 5,
            shadowOpacity: 0.1,
            height: 60,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        })}
      >
        <Tab.Screen name="Pilotos" component={PilotosScreen} />
        <Tab.Screen name="Equipes" component={EquipesScreen} />
        <Tab.Screen name="Corridas" component={CorridasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

NavigationContainer
	envolve a navegação.
createBottomTabNavigator
	cria a estrutura de abas inferiores.
screenOptions
	define configurações para todas as abas: ícones que mudam conforme o foco, cores de ativo/inativo, e outros estilos customizados
ionicons
	para os ícones

**atualizar App.js**
``` js
import React from "react";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

export default function App() {
  return <BottomTabNavigator />;
}
```
bem mais simples que o boilerplate
