# 💰 Aumentar Capital - Blog de Finanças Pessoais

Um blog moderno sobre finanças pessoais, investimentos e empreendedorismo, construído com Next.js 16 e Tailwind CSS.

## 📖 Documentação

### Para Utilizadores (Não-Programadores)
- 📚 **[COMO_USAR.md](./COMO_USAR.md)** - Guia completo para gerir o website
- 🎨 **[THEMING.md](./THEMING.md)** - Guia para mudar cores (super fácil!)
- 📝 **[TEMPLATE_ARTIGO.md](./TEMPLATE_ARTIGO.md)** - Template para novos artigos

## 🚀 Quick Start (Para Programadores)

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no teu browser.

### Build de Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
aumentarcapital/
├── app/                    # Next.js App Router
│   ├── artigos/           # Páginas de artigos
│   ├── sobre/             # Página sobre
│   ├── contacto/          # Página de contacto
│   └── ...
├── components/            # Componentes React reutilizáveis
├── lib/                   # Bibliotecas e utilitários
│   ├── site.config.ts    # ⚙️ Configuração principal do site
│   ├── posts.ts          # Funções para ler artigos
│   └── types.ts          # Tipos TypeScript
├── posts/                 # 📝 Artigos em Markdown
└── public/               # Ficheiros estáticos
    └── images/           # Imagens
```

## ✨ Funcionalidades

- ✅ Blog baseado em Markdown (fácil de editar)
- ✅ Sistema de categorias e tags
- ✅ Tempo de leitura automático
- ✅ SEO otimizado (sitemap, robots.txt, RSS feed, JSON-LD)
- ✅ Newsletter signup component
- ✅ Cookie consent (GDPR compliant)
- ✅ Google Analytics / Plausible integration
- ✅ Google AdSense ready
- ✅ Responsive design
- ✅ ISR (Incremental Static Regeneration)
- ✅ Configuração centralizada para fácil manutenção

## 📝 Como Adicionar um Artigo

1. Cria um ficheiro `.md` na pasta `posts/`
2. Usa o template em `TEMPLATE_ARTIGO.md`
3. Adiciona o frontmatter e conteúdo
4. Guarda e o artigo aparece automaticamente!

Ver [COMO_USAR.md](./COMO_USAR.md) para guia detalhado.

## ⚙️ Configuração

Toda a configuração principal está em `lib/site.config.ts`:

- Nome e descrição do site
- Cores e tema
- Menu de navegação
- Redes sociais
- Newsletter
- Anúncios
- Analytics

## 🎨 Tecnologias

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Content**: Markdown (gray-matter + remark)
- **Fonts**: Google Fonts (Inter + Poppins)
- **Analytics**: Google Analytics / Plausible
- **Ads**: Google AdSense

## 📦 Principais Dependências

- `next` - Framework React
- `react` & `react-dom` - Library React
- `tailwindcss` - CSS utility framework
- `gray-matter` - Parse frontmatter
- `remark` & `remark-html` - Markdown processing
- `reading-time` - Calculate reading time
- `@tailwindcss/typography` - Prose styling

## 🚢 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📊 SEO Features

- ✅ Sitemap automático (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ RSS Feed (`/feed.xml`)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Semantic HTML

## 🔒 Privacidade & GDPR

- Cookie consent banner incluído
- Política de privacidade template
- Analytics condicionais (só após consentimento)

## 📄 Licença

Este projeto é privado. Todos os direitos reservados.

## 🤝 Contribuir

Para contribuir, por favor:
1. Cria um fork do projeto
2. Cria uma branch para a tua feature
3. Faz commit das alterações
4. Faz push para a branch
5. Abre um Pull Request

## 📞 Suporte

Para questões ou suporte:
- Email: contacto@aumentarcapital.com
- Consulta: [COMO_USAR.md](./COMO_USAR.md)

---

**Desenvolvido com ❤️ para ajudar pessoas a melhorar as suas finanças pessoais**
