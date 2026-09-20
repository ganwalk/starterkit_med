# Componentes

Todos vivem em `src/ds/` e são importados de `@/ds`. Cada um só consome tokens semânticos — nenhum conhece clínica.

---

## Ação

### Button

`variant`: `accent` · `active` · `subtle` · `ghost` · `danger` — `size`: `sm` (32px) · `md` (40px) · `lg` (48px)

| Variante | Quando |
| --- | --- |
| `accent` | A **única** ação principal da tela. Uma por vista |
| `active` | Item selecionado. Preto, independente da marca |
| `subtle` | Ação secundária, sobre fundo de página |
| `ghost` | Ação terciária: fechar, voltar, cancelar |
| `danger` | Ação destrutiva com consequência real |

**Não use** `accent` em mais de um botão na mesma área — a ação principal deixa de ser identificável.

### IconButton

Círculo fantasma, o padrão de ação secundária do sistema. `label` é **obrigatório**: vira `aria-label` e `title`. Ícone nunca aparece sem rótulo acessível.

---

## Estrutura

### Card

`padding`: `none` · `compact` (16px) · `comfortable` (24px) — `elevation`: `flat` · `sm` · `md` · `lg`

`compact` para agenda e tabela; `comfortable` para painel e portal. Use `padding="none"` quando o conteúdo for uma tabela ou lista que precisa encostar na borda.

### CardHeader

Título, ícone opcional, `caption` e uma ação circular. A `caption` **não repete o título** — carrega o que ele não diz.

### PageHeader / PageBody

Cabeçalho e container padrão de toda tela do app. Mantêm altura, largura máxima e respiro iguais em todas as páginas. `resumo` segue a mesma regra da caption.

---

## Dados

### Stat

Numeral grande em peso 250 com rótulo, dica, variação e micro-gráfico opcional. O rótulo é o título — **não é eyebrow**.

### Sparkline

Barras finas, sem eixo nem grade. `tone`: `neutral` · `success` · `danger` · `accent`. Para tendência dentro de um card, nunca como gráfico principal.

### Table

Colunas declarativas com `render` por célula. `numerico: true` alinha à direita e aplica numeral tabular.

O wrapper tem `overflow-x-auto` e a tabela um `min-width`: em tela estreita **a tabela rola sozinha** em vez de empurrar a página. Foi assim que o scroll horizontal global foi evitado.

Aceita `vazio` para o estado sem resultado.

### DataList

Pares rótulo/valor. Padrão de painel de detalhe e ficha.

### Timeline

Histórico de alterações — requisito §11.1 item 8. `tone` por evento colore a bolinha.

### Progress

Barra com `aria-valuenow`. `label` obrigatório. Use `mostrarValor` quando o número importa tanto quanto a proporção.

---

## Estado e comunicação

### StatusPill / StatusDot

Os seis estados da agenda. `compact` mostra só a bolinha, para linhas densas.

### Badge

`tone`: `neutral` · `accent` · `success` · `warning` · `danger` · `info`. Rótulo curto, nunca frase.

### Alert

Bloco de contexto com `tone`, ícone, título e ação opcional. Para informação **persistente** — não é notificação efêmera.

### EmptyState

**Diga o próximo passo, não só que está vazio.** Um estado vazio sem ação é um beco sem saída.

### Skeleton

Placeholder pulsante durante carregamento. `aria-hidden`.

---

## Navegação

### Segmented

Pílula com o item ativo em preto. Para **alternar a visão do mesmo conteúdo** (dia/semana/mês, período).

### Tabs

Sublinhado, com contador opcional. Para **navegar entre conteúdos diferentes** dentro de uma tela. Rola no eixo X quando não cabe.

> Segmented e Tabs não são intercambiáveis: um troca a lente, o outro troca o assunto.

### Toolbar

Faixa de filtros acima de uma lista. `fim` alinha controles à direita.

### Accordion

Seção colapsável. Para conteúdo secundário que a maioria não precisa ver.

---

## Formulário

### Field

Envolve qualquer controle com `label`, `hint` e `error`, gerando o `id` e amarrando o `<label>`. Use sempre — é o que garante o vínculo acessível.

`error` substitui `hint` quando presente: nunca mostre os dois.

### Input / Select

`Input` aceita `icon` à esquerda. Altura de 40px, raio `md`.

### Switch

`role="switch"` com `aria-checked`. Para ligar/desligar com **efeito imediato**. Se a mudança só vale depois de salvar, use checkbox.

A área de toque tem 32px mesmo com o trilho visual de 24px.

---

## Sobreposição

### Sheet

Painel lateral (`side`) ou modal central (`center`). Fecha com Escape e com clique no fundo. `subtitle` carrega o contexto que o título não tem.

`side` para detalhe de registro; `center` para confirmação e escolha curta.

### Stepper

Progresso de processo com várias etapas (migração, onboarding). Etapa concluída ganha ✓, a atual fica preta.

---

## Identidade

### Avatar

Iniciais com cor **estável por nome** — a mesma pessoa tem sempre a mesma cor. `size`: `xs` (28px) · `sm` (36px) · `md` (40px) · `lg` (56px). `active` aplica anel de acento.

Avatar é **conteúdo, não enfeite**: a agenda é multiprofissional e a pessoa precisa ser reconhecível de relance.

### AvatarGroup

Empilha com sobreposição e resume o excedente em `+N`.

---

## Regras que valem para todos

1. **Nenhum valor cru.** Cor, espaço, raio e opacidade vêm de token.
2. **Nenhum componente conhece clínica.** Sem `if (tenant === ...)`.
3. **Ícone sempre com rótulo acessível.**
4. **Alvo de toque mínimo de 32px**, salvo exceção documentada.
5. **Texto nunca perde contraste para criar hierarquia** — isso é papel do tamanho e do peso.
6. **`min-w-0` em filho de flex que tem texto truncável**, senão o `truncate` não funciona.
