# To-do 263

Um simples sistema de tarefas no modelo Todo List para você organizar a sua vida.

## Como foi construido ?

Ele foi construido com NextJS e fazendo uso de libs como **Nextauth** e o **Tailwindcss**. Outros recursos também disponibilizados foram.

- NextAuth: Para autenticação usando provedores como Google, GitHub entre outros.
- tailwindcss: Para estilização, um framework css que vem com várias classes prontas para uso.
- framer-motion: Usado para criar lindas animações
- lodash: lib com funções usadas para interagir com estruturas de dados como Arrays e Objetos
- @fontsource: Usado para baixar fontes do Google Fonts
- @prisma: Conexão com os mais variados tipos de banco de dados
- clsx: Cria classNames de forma condicional
- date-fns: Formatação de data e hora
- is-hotkey: Usado para criar atalhos a teclas e/ou combinação de teclas
- next-themes: Facilitador para alteração entre os temas Dark e Light
- react-icons: Lib com vários tipos de icones para serem utilizados
- react-use: Lib com vários tipos de hooks pré-definidos para uso
-

### Como instalar ?

Para realizar a instalação deste sistema faça um clone do projeto e crie um arquivo na raiz chamado .env. Para usar um já com os exemplos das variaveis utilizadas basta renomear o arquivo .env_example para .env e preencher as variáveis ali contidas.

Depois você pode executar os comandos abaixo

Para subir um ambiente de desenvolvimento

```
yarn install && yarn dev
```

Para executar em produção

```
yarn install && yarn build && yarn start
```

Caso deseje também pode optar por executar em Docker, basta criar a imagem e depois criar e executar o container

Criando a imagem

```
docker build . -t todo263:latest
```

Executando o container

```
docker run -d --name todo263 -p 4000:3000 todo263:latest
```

#### Desenvolvedores

Este projeto foi desenvolvido por Marcos Felipe da Silva Jardim @plimo263
