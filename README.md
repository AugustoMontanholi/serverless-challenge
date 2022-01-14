# serverless-challenge

## Desafio

https://github.com/dornellas13/serverless-challenge

## Tecnologias utilizadas
* NodeJS
* Serverless
* AWS: Lambda, DynamoDB, S3, API Gateway

## Executando o projeto

Pré-requisitos

- [NodeJS](https://nodejs.org/en/) (v14 or superior) e NPM
- [Serverless](https://www.serverless.com/)
- [Conta na AWS configurada](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)

#### Clonar o projeto

```bash
# Clone este repositório
$ git clone https://github.com/AugustoMontanholi/serverless-challenge.git
```

#### Fazer deploy do app na AWS

```bash
# acesse o reposirório
$ cd serverlesschallenge

# Deploy na aws
$ yarn deploy
```

#### Executar localmente
Para testar o projeto localmente, após acessar a pasta do projeto e instalar as dependências, rodar em um terminal o dynamodb `yarn dynamodb:start` e em outro o serverless-offline `yarn dev`

```bash
# acesse o reposirório
$ cd serverlesschallenge

# Instalar dependências
$ yarn

# Terminal 1
$ yarn dynamodb:start

# Terminal 2
$ yarn dev
```

## Endpoint

### Listar usuários
```
GET - /dev/users
```

**Response**
```
[
    {
        "id": "String",
        "name": "String",
        "role": "String",
        "age": "String"
    }
]
```

### Adicionar usuário
```
POST - /dev/users
```

**Body**
```
{
    "name": "String",
    "role": "String",
    "age": "String"
}
```

### Consultar usuário específico
```
GET - /dev/users/{id}
```

**Response**
```
{
    "name": "String",
    "role": "String",
    "age": "String"
}
```

### Atualizar usuário
```
PUT - /dev/users/{id}
```

**Body**
```
{
    "name": "String",
    "role": "String",
    "age": "String"
}
```

### Deletar usuário
```
DELETE - /dev/users/{id}
```

## Testando a aplicação em produção

#### Listar todos os usuários

```sh
curl --request GET \
    --url https://dt1diaf1ig.execute-api.us-east-1.amazonaws.com
```

#### Criar um usuário

```sh
curl --request POST \
    --url https://dt1diaf1ig.execute-api.us-east-1.amazonaws.com \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "John Doe",
        "age": 20,
        "role": "Developer"
    }'
```

#### Consultar o usuário

```sh
curl --request GET \
    --url https://dt1diaf1ig.execute-api.us-east-1.amazonaws.com/d543bb7e-2615-4a50-a4d0-2b1db19e6f76
```

#### Atualizar o usuário

```sh
curl --request PUT \
    --url https://dt1diaf1ig.execute-api.us-east-1.amazonaws.com/d543bb7e-2615-4a50-a4d0-2b1db19e6f76 \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Jane Doe"
    }'
```

#### Deletar um usuário

```sh
curl --request DELETE \
    --url https://dt1diaf1ig.execute-api.us-east-1.amazonaws.com/d543bb7e-2615-4a50-a4d0-2b1db19e6f76
```

## Requisitos

- [x] 1. Utilizar Clean Architecture
- [x] 2. Seu desafio precisa estar versionado no Github, em um repositório público.
- [x] 3. Documentação é primordial e vamos nos guiar por ela ;)
- [x] 4. Um funcionário deve possuir como atributos : Id , Idade , Nome e Cargo
- [x] 5. Salvar as informações necessárias em um banco de dados relacional ou não relacional de sua escolha dentro de uma infraestrutura AWS
- [x] 6. Será necessário que a Lambda consiga consultar, deletar e atualizar um funcionário e que ele esteja acessível via internet
- [x] 7. Os recuros podem ser provisionados por serveless framework ou terraform.
- [ ] 8. Realizar testes unitário com JEST.
