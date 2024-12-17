# 🚀 Projeto Next.js com Autenticação Google

## 💻 Pré-requisitos

- Node.js versão 18+

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```


### 2. Instale as dependências

```bash
npm install
```


### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione:


```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
DATABASE_URL="file:./dev.db"
```

### 4. Configure o banco de dados

# Gerar cliente Prisma

```bash
npx prisma generate
```

# Executar migrações
```bash	
npx prisma migrate dev
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🔒 Configuração da Autenticação Google

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Configure as credenciais OAuth 2.0
4. Adicione os URIs de redirecionamento:
   - Desenvolvimento: `http://localhost:3000/api/auth/callback/google`
   - Produção: `https://your-production-url/api/auth/callback/google`
5. Copie o Client ID e Client Secret para o arquivo `.env`


