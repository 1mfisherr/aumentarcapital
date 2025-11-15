# Guia: Sistema de Artigos Seguintes

Este sistema gera automaticamente links para "Próximo Artigo" baseado no tipo de artigo, trilhas (trails) e similaridade de tópicos.

## Campos de Metadados

Adiciona estes campos opcionais ao frontmatter dos teus artigos:

### `type` (opcional)
- **`foundation`**: Artigos que fazem parte de uma trilha sequencial
- **`supporting`**: Artigos independentes que podem ser lidos em qualquer ordem

### `trail` (opcional)
Array de slugs que define a ordem sequencial dos artigos foundation.

**Exemplo:**
```yaml
type: foundation
trail:
  - fundacao-literacia-financeira-como-entender-o-dinheiro
  - como-criar-orcamento
  - fundo-de-emergencia
  - como-sair-de-dividas
  - como-comecar-a-investir
```

### `intent` (opcional)
Tags que indicam a intenção do artigo. Usado quando uma trilha se divide (ex: poupar vs investir).

**Valores possíveis:**
- `saving` - Foco em poupança
- `investing` - Foco em investimentos
- `debt` - Foco em dívidas
- `budgeting` - Foco em orçamento
- `emergency` - Foco em fundo de emergência
- `income` - Foco em aumentar rendimentos

**Exemplo:**
```yaml
intent: saving
# ou múltiplos:
intent:
  - saving
  - budgeting
```

## Como Funciona

### Artigos Foundation
1. Se o artigo tem `type: foundation` e `trail` definido
2. O sistema encontra o próximo artigo na trilha
3. Se a trilha se divide, usa `intent` para escolher o caminho correto
4. Mostra 1 link: "Próximo Artigo"

### Artigos Supporting
1. Se o artigo tem `type: supporting` (ou não tem tipo definido)
2. O sistema encontra artigos relevantes baseado em:
   - Categoria (peso alto)
   - Tags em comum (peso médio)
   - Intent tags (peso alto)
   - Preferência por artigos foundation
3. Mostra 1-2 links: "Artigos Recomendados"

## Exemplos Práticos

### Exemplo 1: Artigo Foundation com Trilha Simples

```yaml
---
title: "Fundação da Literacia Financeira"
slug: "fundacao-literacia-financeira-como-entender-o-dinheiro"
type: foundation
trail:
  - fundacao-literacia-financeira-como-entender-o-dinheiro
  - como-criar-orcamento
  - fundo-de-emergencia
---
```

**Resultado:** Link para "Como Criar Orçamento"

### Exemplo 2: Artigo Foundation com Trilha que se Divide

```yaml
---
title: "Fundo de Emergência"
slug: "fundo-de-emergencia"
type: foundation
trail:
  - fundacao-literacia-financeira-como-entender-o-dinheiro
  - como-criar-orcamento
  - fundo-de-emergencia
  - como-poupar-sustentavel  # intent: saving
  - como-comecar-a-investir  # intent: investing
intent: saving
---
```

**Resultado:** Link para "Como Poupar de Forma Sustentável" (porque o intent é `saving`)

### Exemplo 3: Artigo Supporting

```yaml
---
title: "5 Métodos de Orçamento"
slug: "5-metodos-de-orcamento"
type: supporting
tags: ["orçamento", "poupança", "finanças pessoais"]
intent: budgeting
---
```

**Resultado:** 1-2 links para artigos relacionados com orçamento, poupança ou finanças pessoais

## Regras Importantes

1. **Artigos Foundation** sempre seguem a trilha sequencialmente
2. **Artigos Supporting** usam similaridade de tópicos (tags, categorias, intent)
3. **Links descritivos**: O sistema usa o título e descrição do artigo, não "clique aqui"
4. **Não sobrecarregar**: Máximo de 2 links para artigos supporting
5. **Independência**: Artigos foundation devem ser legíveis independentemente (explicar conceitos básicos)

## Dicas

- Define `trail` para criar um percurso de aprendizagem estruturado
- Usa `intent` quando quiseres que diferentes leitores sigam caminhos diferentes
- Artigos `supporting` são ótimos para aprofundar tópicos específicos
- Mantém as trilhas atualizadas quando adicionares novos artigos

