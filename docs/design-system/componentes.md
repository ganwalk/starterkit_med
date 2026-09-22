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

**Tabela no desktop, cartões no celular.** Abaixo de `sm` cada linha vira um cartão: a primeira coluna é o título, as demais viram pares de rótulo e valor. Cinco colunas não cabem em 390px, e rolar de lado larga metade da informação fora da tela.

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

`agendado` e `cancelado` são o mesmo neutro, então `cancelado` é **anel vazado** e não disco. Onde a bolinha aparece sozinha, os dois estados precisam se distinguir sem depender de cor.

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

Usa `role="group"` com `aria-pressed`, **não** `role="tab"`: aba exige um painel correspondente, e sem ele o leitor de tela anuncia "aba" sem ter o que abrir.

### Tabs

Sublinhado, com contador opcional. Para **navegar entre conteúdos diferentes** dentro de uma tela. Quebra linha quando não cabe — nunca rola de lado.

Se não couber nem quebrando, o componente está errado: um filtro da mesma lista é `Segmented`.

Exige `idBase`, que amarra cada aba ao seu `<TabPanel>` via `aria-controls`. Setas esquerda e direita percorrem as abas.

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

É `flex w-fit`, **nunca `inline-flex`**: elemento inline ignora margem vertical, então três `Switch` dentro de um `space-y-4` ficavam lado a lado na mesma linha, cada rótulo por baixo do trilho do seguinte. `w-fit` mantém o alvo do tamanho do conteúdo — em bloco de largura total, metade do clique cai num vazio à direita do rótulo.

Para uma lista de ajustes, monte a linha no chamador (título, descrição e `Switch` com `hideLabel`) em vez de empilhar rótulos visíveis: o que liga ou desliga merece uma frase dizendo a consequência.

---

## Sobreposição

### Sheet

Painel lateral (`side`) ou modal central (`center`). Fecha com Escape e com clique no fundo.

Renderiza em **portal no `body`** e faz gestão completa de foco: guarda quem abriu, leva o foco ao primeiro campo útil, circula o Tab dentro do painel e devolve o foco ao fechar. Trava o scroll do fundo enquanto está aberto. `subtitle` carrega o contexto que o título não tem.

`side` para detalhe de registro; `center` para confirmação e escolha curta.

### Stepper

Progresso de processo com várias etapas (migração, onboarding). Etapa concluída ganha ✓, a atual fica preta.

---

## Identidade

### Avatar

Mostra o retrato da pessoa quando existe um, e cai nas iniciais quando não — é o caso dos pacientes gerados da agenda, que são muitos.

Os retratos são **rostos sintéticos**, gerados por rede neural, e ficam no repositório. Num protótipo de saúde, colar o rosto de alguém identificável em "faltou · Bradesco Saúde" é dado clínico fabricado sobre uma pessoa real, e esta tela vai ser printada e compartilhada. Ficam no repositório, e não num CDN, para o portal do paciente não fazer requisição a terceiro — o mesmo motivo que levou a fonte a ser auto-hospedada.

O fallback de iniciais tem cor **estável por nome** — a mesma pessoa tem sempre a mesma cor. `size`: `xs` (28px) · `sm` (36px) · `md` (40px) · `lg` (56px). `active` aplica anel de acento.

Avatar é **conteúdo, não enfeite**: a agenda é multiprofissional e a pessoa precisa ser reconhecível de relance.

### AvatarGroup

Empilha com sobreposição e resume o excedente em `+N`.

### Marca

O selo da clínica: o logo enviado no motor de marca, ou o monograma quando não há logo.

Existe como componente porque o mesmo símbolo aparece no menu, no portal e na prévia do motor de marca. Antes eram três quadrados coloridos soltos pelo código, e o do portal — translúcido sobre o gradiente — parecia imagem que não carregou.

`tone`: `solido` sobre fundo claro · `sobreCor` dentro da zona de marca. `size`: `sm` (28px) · `md` (36px) · `lg` (64px).

É `aria-hidden` **de propósito**: o nome da clínica sempre vem escrito ao lado, e anunciar os dois faz o leitor de tela repetir a marca duas vezes seguidas.

---

## Regras que valem para todos

1. **Nenhum valor cru.** Cor, espaço, raio e opacidade vêm de token.
2. **Nenhum componente conhece clínica.** Sem `if (tenant === ...)`.
3. **Ícone sempre com rótulo acessível.**
4. **Alvo de toque mínimo de 32px**, salvo exceção documentada.
5. **Texto nunca perde contraste para criar hierarquia** — isso é papel do tamanho e do peso.
6. **`min-w-0` em filho de flex que tem texto truncável**, senão o `truncate` não funciona.
7. **Alvo de toque pelo token, nunca pela altura nominal.** `Button`, `IconButton`, `Input`, `Select`, `Switch` e `Accordion` carregam `min-h-[var(--target-min)]`. O produto interno usa 32px; o portal do paciente redefine o token para 44px no `<main>` e todo controle sobe junto, sem exceção escrita controle a controle. É a diferença entre mouse numa jornada de 8h e polegar uma vez a cada seis meses.
8. **Não sobrescreva por fora uma utilitária que o componente já declara.** O `cn` concatena, não resolve conflito do Tailwind: passar `hidden` para um componente que declara `inline-flex` deixa as duas classes na lista e quem decide é a ordem da folha de estilo. Passar `hidden` num `Badge` deixava o selo visível em 390px e cortava o nome do documento para "Receit…". Esconda pelo invólucro: `<span className="hidden sm:block">`.
