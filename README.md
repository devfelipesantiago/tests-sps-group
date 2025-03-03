# Tests-sps-group

# SPS REACT TEST

- Criar um CRUD de usuários

# Regras

- Criar a página de signIn para fazer a autenticação do usuário (Usar o usuário previamente cadastrado para validar)
- Pode usar qualquer tipo de storage para guardar o token
- Só será possível cadastrar e/ou visualizar os usuários se estiver autenticado
- Chamar a API que foi criada anteriormente (test-sps-server)

# Teste NODE

- Criar um CRUD (API REST) em node para cadastro de usuários
- Para a criação do teste utilizar um repositório fake dos usuários. (Pode ser em memória)

## Regras

- Deve existir um usuário admin previamente cadastrado para utilizar autenticação (não precisa criptografar a senha);
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin"
    password: "1234"
  }

- Criar rota de autenticação (Jwt token)
- As rotas da API só podem ser executadas se estiver autenticada
- Deve ser possível adicionar usuários. Campos: email, nome, type, password
- Não deve ser possível cadastrar o e-mail já cadastrado
- Deve ser possível remover usuário
- Deve ser possível alterar os dados do usuário

## Orientações

<details>

   <summary><strong>Para iniciar a aplicação </strong></summary>

1. Clone o repositório

- Use o comando: `git clone git@github.com:devfelipesantiago/tests-sps-group.git`
- Entre na pasta do repositório que você acabou de clonar:
  - `cd backend ` para acessar a pasta do backend
  - `cd frontend` para acessar a pasta do frontend
- Instale as dependências:
  - `npm install` para ambos.
- Inicie o projeto com o comando:
  - `npm run dev` para o backend
  - `npm start` para o frontend

</details>
