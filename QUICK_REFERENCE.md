# 📋 Referência Rápida - Aumentar Capital

## 🎯 Tarefas Comuns

### Adicionar Novo Artigo
```bash
1. Copia TEMPLATE_ARTIGO.md
2. Renomeia para posts/nome-do-artigo.md
3. Preenche o frontmatter
4. Escreve o conteúdo
5. Guarda → Artigo publicado automaticamente!
```

### Mudar Cores do Site
```bash
Ficheiro: lib/site.config.ts
Secção: colors
```

### Adicionar Link ao Menu
```bash
Ficheiro: lib/site.config.ts
Secção: nav
```

### Configurar Newsletter
```bash
Ficheiro: lib/site.config.ts
Secção: newsletter
- enabled: true/false
- formAction: "URL_DO_FORNECEDOR"
```

### Ativar Analytics
```bash
Ficheiro: lib/site.config.ts
Secção: analytics
- enabled: true
- googleAnalyticsId: "G-XXXXXXXXXX"
  OU
- plausibleDomain: "teudominio.com"
```

### Ativar Anúncios
```bash
Ficheiro: lib/site.config.ts
Secção: ads
- enabled: true
- adsenseClientId: "ca-pub-XXXXXXXXXX"
```

---

## 📁 Ficheiros Principais

| Ficheiro | Descrição | Para Editar |
|----------|-----------|-------------|
| `lib/site.config.ts` | ⚙️ **CONFIGURAÇÃO PRINCIPAL** | Cores, menu, newsletter, ads, analytics |
| `posts/*.md` | 📝 **ARTIGOS** | Adicionar/editar/remover artigos |
| `app/page.tsx` | 🏠 Página inicial | Conteúdo da home |
| `app/sobre/page.tsx` | ℹ️ Página sobre | Informação sobre o site |
| `app/contacto/page.tsx` | 📧 Página contacto | Formulário de contacto |
| `components/Header.tsx` | 🔝 Cabeçalho | Menu e logo |
| `components/Footer.tsx` | 🔻 Rodapé | Links e redes sociais |
| `COMO_USAR.md` | 📖 **GUIA COMPLETO** | Documentação detalhada |

---

## 🚀 Comandos Terminal

```bash
# Desenvolvimento (ver alterações em tempo real)
npm run dev

# Build (preparar para publicação)
npm run build

# Iniciar servidor de produção
npm start

# Verificar erros de código
npm run lint
```

---

## 📝 Categorias Disponíveis

Ao criar artigos, usa uma destas categorias:
- `"Finanças pessoais"`
- `"Investimentos"`
- `"Empreendedorismo"`
- `"Poupança"`
- `"Dívidas"`

---

## 🎨 Cores Atuais

| Nome | Código | Uso |
|------|--------|-----|
| Primary | `#1E88E5` | Cor principal (azul) |
| Primary Dark | `#1565C0` | Hover/destaques |
| Accent | `#34D399` | Categorias/destaque |
| Background | `#FFFFFF` | Fundo |
| Text | `#1A1A1A` | Texto principal |
| Muted | `#6B7280` | Texto secundário |

Para mudar: `lib/site.config.ts` → `colors`

---

## 🌐 URLs Importantes

Depois de publicado:
- **Home**: `/`
- **Artigos**: `/artigos`
- **Artigo individual**: `/artigos/slug-do-artigo`
- **Sobre**: `/sobre`
- **Contacto**: `/contacto`
- **Privacidade**: `/politica-privacidade`
- **Sitemap**: `/sitemap.xml`
- **RSS Feed**: `/feed.xml`
- **Robots**: `/robots.txt`

---

## ✅ Checklist Antes de Publicar

### Artigo Novo
- [ ] Ficheiro `.md` criado em `posts/`
- [ ] Frontmatter completo (title, date, category, tags, etc.)
- [ ] Imagem adicionada (se aplicável)
- [ ] Texto revisado
- [ ] Links verificados

### Alteração ao Site
- [ ] Testado localmente (`npm run dev`)
- [ ] Sem erros de linter (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] Alterações guardadas

### Antes do Deploy
- [ ] URLs em `site.config.ts` corretos
- [ ] Email de contacto atualizado
- [ ] Redes sociais configuradas
- [ ] Analytics configurado (opcional)
- [ ] Newsletter configurada (opcional)

---

## 🆘 Problemas Comuns

### Artigo não aparece
✓ Verifica se o ficheiro está em `posts/`
✓ Verifica se termina em `.md`
✓ Verifica o frontmatter (parte entre ---)
✓ Reinicia o servidor (`Ctrl+C` e `npm run dev`)

### Erro ao fazer build
✓ Executa `npm run lint` para ver erros
✓ Verifica se todos os campos obrigatórios estão preenchidos
✓ Verifica se as datas estão no formato correto (AAAA-MM-DD)

### Cores não mudaram
✓ Verifica se editaste `lib/site.config.ts`
✓ Reinicia o servidor
✓ Limpa cache do browser (Ctrl+Shift+R)

### Newsletter não funciona
✓ Verifica se `enabled: true` em `site.config.ts`
✓ Verifica se `formAction` tem o URL correto
✓ Verifica a configuração do fornecedor (MailerLite, etc.)

---

## 📞 Onde Pedir Ajuda

1. **Guia Completo**: `COMO_USAR.md`
2. **README**: `README.md`
3. **Template de Artigo**: `TEMPLATE_ARTIGO.md`
4. **Next.js Docs**: https://nextjs.org/docs
5. **Google/ChatGPT**: Descreve o teu problema

---

**Última atualização**: Outubro 2025

