# Projeto CRUD de Pessoas e Cidades

Este é um projeto de CRUD (Create, Read, Update, Delete) desenvolvido em React com TypeScript, utilizando Material-UI para o design, Axios para requisições HTTP, Yup para validação de formulários, json-server para criar uma API REST fake e proporcionar dados mockados para o desenvolvimento.

O projeto permite a gestão de pessoas e cidades, com funcionalidades de adicionar, visualizar, editar e excluir registros. Possui uma interface responsiva e intuitiva para uma melhor experiência do usuário.

## Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js e npm instalados em sua máquina.

## Instalação

1. Clone este repositório:
```
git clone https://github.com/jeuchaves/react-typescript-mui
```

2. Acesse o diretório do projeto:
```
cd react-typescript-mui
```

3. Instale as dependências:
```
npm install
```

## Executando o projeto

1. Inicie o servidor da API Fake:
```
npm run mock
```

2. Inicie a aplicação React:
```
npm start
```

Agora você pode acessar a aplicação em http://localhost:3000.

## Funcionalidades

- **Tela Inicial:** Apresenta uma visão geral do sistema, com opções para navegar entre as páginas de pessoas e cidades.
- **Página de Pessoas:** Exibe uma lista de pessoas cadastradas, permitindo a visualização, edição e exclusão de registros. Também possui um botão para adicionar novas pessoas.
- **Detalhes da Pessoas:** Apresenta informações detalhadas sobre uma pessoa específica, incluindo seus dados pessoais e relacionamentos. Permite também a adição e edição de dados.
- **Página de Cidades:** Similar à página de pessoas, exibe uma lista de cidades cadastradas, com funcionalidades semelhantes de visualização, edição e exclusão.
- **Detalhes de Cidades:** Similar à página de pessoas, apresenta informações detalhadas sobre a cidade, incluindo seus dados pessoais e relacionamentos, tal como edição e adição de novos dados.
- **Responsividade e Design Atraente:** O projeto foi desenvolvido com foco na responsividade e na experiência do usuário, utilizando Material-UI para criar uma interface bonita e amigável.

## Teconologias utilizadas

- React, Typescript, Material-UI, Axios, Yup, json-server

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para relatar bugs ou sugerir novas funcionalidades. Se preferir, faça um pull request diretamente.