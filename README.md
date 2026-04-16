# 🍔 DevBurger Interface

> Interface moderna e responsiva para o sistema de hamburgueria DevBurger

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://devburguer-beta.vercel.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-94.3%25-yellow.svg)](https://github.com/RondneyLoiola/DevBurguer-Interface)
[![CSS](https://img.shields.io/badge/CSS-4.4%25-blue.svg)](https://github.com/RondneyLoiola/DevBurguer-Interface)

## 📋 Sobre o Projeto

DevBurger Interface é a interface do usuário de um sistema completo de hamburgueria, desenvolvida com tecnologias modernas para proporcionar uma experiência fluida e intuitiva tanto para clientes quanto para administradores.

### 🎯 Funcionalidades

- 🛒 Catálogo de produtos interativo
- 👤 Sistema de autenticação de usuários
- 📦 Carrinho de compras
- 💳 Processamento de pedidos
- 📱 Design totalmente responsivo
- ⚡ Performance otimizada

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [Vite](https://vitejs.dev/) - Build tool e dev server ultra-rápido
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de programação
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) - Estilização
- [Biome](https://biomejs.dev/) - Linter e formatter
- [Docker](https://www.docker.com/) - Containerização
- [Vercel](https://vercel.com/) - Plataforma de deploy

## 📁 Estrutura do Projeto

```
DevBurguer-Interface/
├── src/               # Código fonte da aplicação
├── public/            # Arquivos públicos estáticos
├── .env.example       # Exemplo de variáveis de ambiente
├── Dockerfile         # Configuração do container Docker
├── biome.json         # Configuração do Biome
├── vite.config.js     # Configuração do Vite
├── package.json       # Dependências e scripts
└── index.html         # HTML principal
```

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## 💻 Como Executar o Projeto

### Clonando o repositório

```bash
# Clone este repositório
git clone https://github.com/RondneyLoiola/DevBurguer-Interface.git

# Acesse a pasta do projeto
cd DevBurguer-Interface
```

### Configurando variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

### Instalando dependências

```bash
# Com Yarn
yarn install

# Ou com npm
npm install
```

### Executando em modo de desenvolvimento

```bash
# Com Yarn
yarn dev

# Ou com npm
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite)

### Build para produção

```bash
# Com Yarn
yarn build

# Ou com npm
npm run build
```

## 🐳 Docker

Para executar o projeto usando Docker:

```bash
# Construir a imagem
docker build -t devburger-interface .

# Executar o container
docker run -p 3000:3000 devburger-interface
```

## 🌐 Deploy

O projeto está configurado para deploy automático na [Vercel](https://vercel.com/). A cada push na branch `main`, uma nova versão é automaticamente publicada.

**Demo ao vivo:** [https://devburguer-beta.vercel.app](https://devburguer-beta.vercel.app)

## 📝 Scripts Disponíveis

```json
{
  "dev": "Inicia o servidor de desenvolvimento",
  "build": "Cria a versão de produção",
  "preview": "Visualiza a build de produção localmente",
  "lint": "Executa o linter do código"
}
```

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por [Rondney Loiola](https://github.com/RondneyLoiola)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

## 🔗 Links Úteis

- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Guia de JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Api](https://github.com/RondneyLoiola/devburguer-api)
- [Deploy](https://devburguer-beta.vercel.app/)
