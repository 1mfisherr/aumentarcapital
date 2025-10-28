# 📚 Guia Completo - Como Usar e Editar o Website Aumentar Capital

Este guia foi criado para **não-programadores** e explica passo a passo como adicionar, editar e gerir o conteúdo do teu website.

---

## 🎯 Índice

1. [Como Adicionar um Novo Artigo](#como-adicionar-um-novo-artigo)
2. [Como Editar um Artigo Existente](#como-editar-um-artigo-existente)
3. [Como Remover um Artigo](#como-remover-um-artigo)
4. [Como Mudar as Cores do Website](#como-mudar-as-cores-do-website)
5. [Como Adicionar/Remover Links do Menu](#como-adicionarremover-links-do-menu)
6. [Como Configurar a Newsletter](#como-configurar-a-newsletter)
7. [Como Adicionar Anúncios (Google AdSense)](#como-adicionar-anúncios-google-adsense)
8. [Como Adicionar Analytics](#como-adicionar-analytics)
9. [Como Editar as Redes Sociais](#como-editar-as-redes-sociais)
10. [Estrutura de Ficheiros](#estrutura-de-ficheiros)

---

## 📝 Como Adicionar um Novo Artigo

### Passo 1: Criar o Ficheiro do Artigo

1. Navega até à pasta `posts/`
2. Cria um novo ficheiro com o nome: `nome-do-artigo.md`
   - **Importante**: Usa apenas letras minúsculas, números e hífens (-)
   - **Exemplo**: `como-poupar-dinheiro.md`

### Passo 2: Adicionar o Conteúdo

Abre o ficheiro que criaste e adiciona o seguinte formato:

```markdown
---
title: "Como Poupar Dinheiro em 2025"
slug: "como-poupar-dinheiro"
date: "2025-10-28"
author: "O Teu Nome"
category: "Poupança"
tags: ["finanças pessoais", "poupança", "dicas"]
description: "Descobre as melhores estratégias para poupar dinheiro em 2025."
image: "/images/posts/poupar-dinheiro.jpg"
lang: "pt-PT"
---

Aqui começa o teu artigo...

## Este é um subtítulo

Escreve o teu conteúdo aqui. Podes usar:

- **Negrito** com dois asteriscos
- *Itálico* com um asterisco
- [Links](https://exemplo.com)
- Listas como esta

### Outro subtítulo menor

Continua a escrever...
```

### Explicação dos Campos:

- **title**: O título do artigo (aparece no topo)
- **slug**: URL do artigo (deve ser igual ao nome do ficheiro sem .md)
- **date**: Data de publicação no formato AAAA-MM-DD
- **author**: O teu nome
- **category**: Escolhe uma: "Finanças pessoais", "Investimentos", "Empreendedorismo", "Poupança", ou "Dívidas"
- **tags**: Lista de palavras-chave (entre aspas, separadas por vírgulas)
- **description**: Resumo curto do artigo (aparece nas listagens)
- **image**: Caminho para a imagem (guarda as imagens em `public/images/posts/`)
- **lang**: Sempre "pt-PT"

### Passo 3: Guardar e Publicar

1. Guarda o ficheiro
2. O artigo aparecerá automaticamente na página de artigos!

---

## ✏️ Como Editar um Artigo Existente

1. Navega até à pasta `posts/`
2. Abre o ficheiro `.md` do artigo que queres editar
3. Faz as alterações necessárias
4. Guarda o ficheiro
5. As alterações aparecerão automaticamente no website

---

## 🗑️ Como Remover um Artigo

1. Navega até à pasta `posts/`
2. Apaga o ficheiro `.md` do artigo
3. O artigo desaparecerá automaticamente do website

---

## 🎨 Como Mudar as Cores do Website

1. Abre o ficheiro: `lib/site.config.ts`
2. Procura a secção `colors:`
3. Altera os códigos de cores (formato: #RRGGBB)

```typescript
colors: {
  primary: "#1E88E5",        // Cor principal (azul)
  primaryDark: "#1565C0",    // Versão escura da cor principal
  accent: "#34D399",         // Cor de destaque (verde)
  background: "#FFFFFF",     // Cor de fundo (branco)
  text: "#1A1A1A",          // Cor do texto principal
  muted: "#6B7280",         // Cor do texto secundário (cinza)
}
```

**Dica**: Usa um site como [HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp) para escolher cores.

---

## 🔗 Como Adicionar/Remover Links do Menu

1. Abre o ficheiro: `lib/site.config.ts`
2. Procura a secção `nav:`
3. Adiciona ou remove itens:

```typescript
nav: [
  { href: "/", label: "Home" },
  { href: "/artigos", label: "Artigos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contacto", label: "Contacto" },
  { href: "/recursos", label: "Recursos" },  // ← ADICIONAR NOVA PÁGINA
],
```

**Nota**: Se adicionares uma nova página, também precisas de criar o ficheiro correspondente em `app/nome-da-pagina/page.tsx`

---

## 📧 Como Configurar a Newsletter

### Passo 1: Escolher um Fornecedor

Recomendamos:
- **MailerLite** (grátis até 1000 subscritores)
- **Buttondown** (simples e focado em escritores)
- **ConvertKit** (mais profissional)

### Passo 2: Configurar

1. Cria uma conta no fornecedor escolhido
2. Obtém o URL do formulário de subscrição
3. Abre o ficheiro: `lib/site.config.ts`
4. Edita a secção `newsletter`:

```typescript
newsletter: {
  enabled: true,                    // Muda para false para esconder
  provider: "mailerlite",           // Nome do fornecedor
  formAction: "URL_DO_FORNECEDOR",  // Cole aqui o URL
  title: "Recebe as melhores dicas de finanças",
  description: "Junta-te a milhares de leitores...",
},
```

---

## 💰 Como Adicionar Anúncios (Google AdSense)

### Passo 1: Criar Conta Google AdSense

1. Vai a [google.com/adsense](https://www.google.com/adsense)
2. Cria uma conta e aguarda aprovação

### Passo 2: Obter o Código do Cliente

1. No painel do AdSense, copia o teu "Client ID" (começa com "ca-pub-")

### Passo 3: Configurar no Website

1. Abre o ficheiro: `lib/site.config.ts`
2. Edita a secção `ads`:

```typescript
ads: {
  enabled: true,                       // Muda para true
  adsenseClientId: "ca-pub-XXXXXXXX",  // Cole aqui o teu Client ID
},
```

### Passo 4: Adicionar Anúncios aos Artigos

Edita o ficheiro do artigo onde queres anúncios e usa o componente `AdSlot` (requer conhecimentos básicos de programação).

---

## 📊 Como Adicionar Analytics

### Opção 1: Google Analytics (Grátis)

1. Cria uma conta em [analytics.google.com](https://analytics.google.com)
2. Cria uma propriedade e obtém o ID (formato: G-XXXXXXXXXX)
3. Abre: `lib/site.config.ts`
4. Edita:

```typescript
analytics: {
  enabled: true,
  googleAnalyticsId: "G-XXXXXXXXXX",  // Cole aqui o teu ID
},
```

### Opção 2: Plausible (Focado em Privacidade)

1. Cria uma conta em [plausible.io](https://plausible.io)
2. Adiciona o teu domínio
3. Edita:

```typescript
analytics: {
  enabled: true,
  plausibleDomain: "aumentarcapital.com",  // O teu domínio
},
```

---

## 🌐 Como Editar as Redes Sociais

1. Abre: `lib/site.config.ts`
2. Procura a secção `social:`
3. Edita os URLs:

```typescript
social: {
  twitter: "https://twitter.com/teu_username",
  facebook: "https://facebook.com/tua_pagina",
  instagram: "https://instagram.com/teu_username",
  linkedin: "https://linkedin.com/in/teu_perfil",
},
```

---

## 📁 Estrutura de Ficheiros

```
aumentarcapital/
│
├── posts/                    ← ARTIGOS (adiciona aqui os teus .md)
│   └── exemplo-artigo.md
│
├── public/                   ← IMAGENS E FICHEIROS PÚBLICOS
│   └── images/
│       └── posts/           ← Guarda aqui as imagens dos artigos
│
├── lib/
│   └── site.config.ts       ← CONFIGURAÇÃO PRINCIPAL (edita aqui!)
│
├── app/                      ← PÁGINAS DO WEBSITE
│   ├── page.tsx             ← Página inicial
│   ├── artigos/             ← Página de artigos
│   ├── sobre/               ← Página "Sobre"
│   └── contacto/            ← Página de contacto
│
└── components/               ← COMPONENTES REUTILIZÁVEIS
    ├── Header.tsx           ← Cabeçalho
    ├── Footer.tsx           ← Rodapé
    └── NewsletterSignup.tsx ← Formulário de newsletter
```

---

## 🚀 Comandos Úteis

Para executares o website localmente (no teu computador):

```bash
# Instalar dependências (primeira vez)
npm install

# Executar em modo de desenvolvimento
npm run dev

# Criar versão de produção
npm run build

# Executar versão de produção
npm start
```

---

## ❓ Perguntas Frequentes

### Como adiciono imagens aos artigos?

1. Guarda a imagem em `public/images/posts/`
2. No artigo, usa: `![Descrição](/images/posts/nome-da-imagem.jpg)`

### O artigo não aparece no website?

Verifica:
- O ficheiro está na pasta `posts/`?
- O nome do ficheiro termina em `.md`?
- O frontmatter (parte entre ---) está correto?
- A data está no formato correto (AAAA-MM-DD)?

### Como mudo o título do website?

1. Abre: `lib/site.config.ts`
2. Edita `name: "Aumentar Capital"` para o que quiseres

### Posso adicionar vídeos aos artigos?

Sim! Usa a sintaxe:
```markdown
<iframe width="560" height="315" src="URL_DO_YOUTUBE" frameborder="0" allowfullscreen></iframe>
```

---

## 💡 Dicas de Boas Práticas

1. **Usa nomes descritivos** para os ficheiros dos artigos
2. **Adiciona sempre uma descrição** curta mas informativa
3. **Escolhe boas imagens** para os artigos (de preferência otimizadas)
4. **Usa tags relevantes** para facilitar a descoberta
5. **Escreve regularmente** para manter o website ativo
6. **Faz backups** dos teus artigos regularmente

---

## 📞 Precisa de Ajuda?

Se tiveres dúvidas ou problemas:
1. Verifica este guia novamente
2. Consulta a documentação do Next.js: [nextjs.org/docs](https://nextjs.org/docs)
3. Procura no Google ou ChatGPT com a tua dúvida específica

---

**Boa sorte com o teu blog! 🎉**

