# MicroLoja Artesanal

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.x-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**Plataforma de e-commerce para artesãos locais**

[Características](#-características) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Uso](#-uso) • [API](#-documentação-da-api) • [Contribuir](#-contribuindo)

</div>

---

## Sobre o Projeto

**MicroLoja Artesanal** é uma plataforma de e-commerce desenvolvida para conectar artesãos locais com clientes que valorizam produtos feitos à mão. O projeto combina um backend robusto em Laravel com um frontend moderno em Next.js, oferecendo uma experiência de compra fluida e intuitiva.

### Objetivo

Facilitar a venda de produtos artesanais através de uma interface moderna, responsiva e fácil de usar, promovendo o comércio local e a economia criativa.

---

## Características

### 🛒 Funcionalidades do E-commerce

- **Catálogo de Produtos**
  - ✅ Listagem completa com imagens, descrições e preços
  - ✅ Filtro por categorias (Cerâmica, Tecidos, Velas, Bijuterias, etc.)
  - ✅ Busca em tempo real por nome ou descrição
  - ✅ Visualização detalhada de produtos individuais

- **Sistema de Carrinho**
  - ✅ Adição e remoção de produtos
  - ✅ Controle de quantidade
  - ✅ Persistência local (localStorage)
  - ✅ Cálculo automático do total

- **Autenticação de Usuários**
  - ✅ Registro de novos usuários
  - ✅ Sistema de login
  - ✅ Gerenciamento de perfil
  - ✅ Controle de sessão

- **Checkout e Pedidos**
  - ✅ Formulário de endereço de entrega
  - ✅ Seleção de método de pagamento
  - ✅ Geração de código de pedido
  - ✅ Histórico de compras

### Interface do Usuário

- **Design Moderno**
  -  Interface limpa e intuitiva
  -  Paleta de cores orgânica e natural
  -  Animações suaves e transições elegantes
  -  Componentes reutilizáveis

- **Responsividade Total**
  -  Otimizado para desktop, tablet e mobile
  -  Menu hamburguer para dispositivos móveis
  -  Layout adaptativo
  -  Imagens responsivas

- **UX Aprimorada**
  -  Banner rotativo automático
  -  Barra de navegação fixa
  -  Feedback visual em ações
  -  Estados de carregamento

---

## Tecnologias

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **PHP** | 8.3 | Linguagem de programação |
| **Laravel** | 11.x | Framework PHP moderno |
| **MySQL** | 8.0 | Banco de dados relacional |
| **Composer** | 2.x | Gerenciador de dependências PHP |
| **Docker** | Latest | Containerização |

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 20.x | Runtime JavaScript |
| **Next.js** | 15.x | Framework React |
| **TypeScript** | 5.x | Superset tipado de JavaScript |
| **React** | 19.x | Biblioteca UI |
| **TailwindCSS** | 3.x | Framework CSS utility-first |

### Infraestrutura

-  **Docker Compose** - Orquestração de containers
-  **Nginx** - Servidor web
-  **PHP-FPM** - FastCGI Process Manager

---

##  Estrutura do Projeto
```
micro-loja-artesanal/
├── backend/                    # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/   # Controladores da API
│   │   └── Models/            # Models Eloquent
│   ├── database/
│   │   ├── migrations/        # Migrações do banco
│   │   └── seeders/           # Seeders com dados iniciais
│   ├── routes/
│   │   └── api.php           # Rotas da API
│   └── .env.example          # Configurações de ambiente
│
├── frontend/                   # Aplicação Next.js
│   ├── app/                   # App Router (Next.js 13+)
│   │   ├── cart/             # Página do carrinho
│   │   ├── checkout/         # Finalização de pedido
│   │   ├── login/            # Autenticação
│   │   ├── product/[id]/     # Detalhes do produto
│   │   └── profile/          # Perfil do usuário
│   ├── components/           # Componentes reutilizáveis
│   ├── context/              # Context API (carrinho, busca)
│   ├── lib/                  # Funções utilitárias e API
│   └── public/               # Arquivos estáticos
│
└── docker/                    # Configurações Docker
    ├── app/                  # Dockerfile PHP
    └── nginx/                # Configuração Nginx
```

---

##  Instalação

### Pré-requisitos

- ✅ **Docker** e **Docker Compose** instalados
- ✅ **Git** para clonar o repositório
- ✅ **Node.js 20+** (para desenvolvimento frontend local)

### Passo a Passo

#### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/seu-usuario/micro-loja-artesanal.git
cd micro-loja-artesanal
```

#### 2️⃣ Configure o Backend
```bash
cd backend

# Copie o arquivo de ambiente
cp .env.example .env

# Suba os containers Docker
docker-compose up -d

# Instale as dependências PHP
docker-compose exec app composer install

# Gere a chave da aplicação
docker-compose exec app php artisan key:generate

# Execute as migrações
docker-compose exec app php artisan migrate

# Popule o banco com dados de exemplo
docker-compose exec app php artisan db:seed
```

#### 3️⃣ Configure o Frontend
```bash
cd ../frontend

# Instale as dependências
npm install

# Configure a URL da API (crie o arquivo .env.local)
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

### Verificação

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8080/api/products

---

### Fluxo de Compra

1.  **Navegar** pelos produtos na página inicial
2.  **Filtrar** por categoria na barra superior
3.  **Buscar** produtos específicos
4.  **Visualizar** detalhes clicando no produto
5.  **Adicionar** ao carrinho (requer login)
6.  **Revisar** itens no carrinho
7.  **Finalizar** pedido com endereço de entrega
8.  **Confirmar** e receber código do pedido

---

## 📡 Documentação da API

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### 🏷️ Produtos

<details>
<summary><b>GET</b> /products</summary>

Lista todos os produtos ou filtra por categoria.

**Query Parameters:**
- `category` (opcional): Nome da categoria

**Exemplo:**
```bash
GET /api/products
GET /api/products?category=Cerâmica
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Vaso de Cerâmica Rústico",
    "description": "Feito à mão com argila natural",
    "price": 120.00,
    "stock": 8,
    "image_url": "https://example.com/vaso.jpg",
    "category_id": 1,
    "category": {
      "id": 1,
      "name": "Cerâmica"
    }
  }
]
```
</details>

<details>
<summary><b>GET</b> /products/{id}</summary>

Busca um produto específico por ID.

**Exemplo:**
```bash
GET /api/products/1
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Vaso de Cerâmica Rústico",
  "description": "Feito à mão com argila natural",
  "price": 120.00,
  "stock": 8,
  "image_url": "https://example.com/vaso.jpg",
  "category": {
    "id": 1,
    "name": "Cerâmica"
  }
}
```
</details>

<details>
<summary><b>POST</b> /products</summary>

Cria um novo produto.

**Body:**
```json
{
  "name": "Novo Produto",
  "description": "Descrição detalhada",
  "price": 99.90,
  "stock": 10,
  "image_url": "https://example.com/image.jpg",
  "category_id": 1
}
```

**Resposta (201 Created):**
```json
{
  "id": 17,
  "name": "Novo Produto",
  "description": "Descrição detalhada",
  "price": 99.90,
  "stock": 10,
  "category": { "id": 1, "name": "Cerâmica" }
}
```
</details>

<details>
<summary><b>PUT</b> /products/{id}</summary>

Atualiza um produto existente.

**Body (campos opcionais):**
```json
{
  "name": "Nome Atualizado",
  "price": 149.90,
  "stock": 5
}
```
</details>

<details>
<summary><b>DELETE</b> /products/{id}</summary>

Remove um produto.

**Resposta (200 OK):**
```json
{
  "message": "Produto removido com sucesso."
}
```
</details>

#### Categorias

<details>
<summary><b>GET</b> /categories</summary>

Lista todas as categorias disponíveis.

**Resposta (200 OK):**
```json
[
  { "id": 1, "name": "Cerâmica" },
  { "id": 2, "name": "Tecidos" },
  { "id": 3, "name": "Velas" },
  { "id": 4, "name": "Bijuterias" },
  { "id": 5, "name": "Decoração" },
  { "id": 6, "name": "Pintura" },
  { "id": 7, "name": "Madeira" },
  { "id": 8, "name": "Bordados" }
]
```
</details>

---

## 🗄️ Modelo de Dados

### Categorias Disponíveis

-  **Cerâmica** - Vasos, pratos e peças decorativas
-  **Tecidos** - Bolsas, almofadas e patchwork
-  **Velas** - Velas aromáticas e decorativas
-  **Bijuterias** - Colares, pulseiras e acessórios
-  **Decoração** - Quadros, esculturas e objetos decorativos
-  **Pintura** - Telas pintadas à mão
-  **Madeira** - Caixas, porta-retratos e utensílios
-  **Bordados** - Panos de prato, toalhas e peças bordadas

### Diagrama de Relacionamento
```
┌─────────────┐         ┌──────────────┐
│ CATEGORIES  │         │  PRODUCTS    │
├─────────────┤         ├──────────────┤
│ id          │◄────┐   │ id           │
│ name        │     └───│ category_id  │
│ created_at  │         │ name         │
│ updated_at  │         │ description  │
└─────────────┘         │ price        │
                        │ stock        │
                        │ image_url    │
                        │ created_at   │
                        │ updated_at   │
                        └──────────────┘
```

---

## Scripts Úteis

### Backend (Laravel)
```bash
# Acessar container PHP
docker-compose exec app bash

# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Recriar banco de dados
php artisan migrate:fresh --seed

# Rodar testes
php artisan test
```

### Frontend (Next.js)
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build
npm run start

# Lint
npm run lint
```

---

## Roadmap

### Fase 1 (Concluída)
- [x] Setup inicial do projeto
- [x] CRUD completo de produtos
- [x] Sistema de categorias
- [x] Frontend responsivo
- [x] Carrinho de compras
- [x] Autenticação básica
- [x] Sistema de checkout
- [x] Busca e filtros

---

### Padrões de Código

- **Backend**: PSR-12 (Laravel Pint configurado)
- **Frontend**: ESLint + Prettier
- **Commits**: Conventional Commits
- **Branches**: `feature/`, `bugfix/`, `hotfix/`

### Reportando Bugs

Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/micro-loja-artesanal/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)

---

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Autor

Wendel Muniz dos Santos


