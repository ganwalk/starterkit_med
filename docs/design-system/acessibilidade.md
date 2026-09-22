# Acessibilidade

Regras derivadas da auditoria medida, não de boa intenção. Cada uma existe porque um defeito real foi encontrado.

## As seis regras

### 1. Contraste mínimo de 4.5:1 em todo texto

Os quatro níveis de `--text-*` passam em AA nos dois temas. Os tons `600` das cores de estado passam sobre os fundos `50`/`100`.

**Nunca** crie hierarquia clareando o texto. Use tamanho e peso.

> Encontrado: 151 falhas. O caso mais grave não era decorativo — a segunda linha do cartão de agendamento, que a recepção lê o dia todo, media 3.77:1.

### 2. Toda mudança em neutro é medida nos dois temas

No tema claro os níveis de texto **descem** na escala; no escuro eles **sobem**. Um mesmo token serve aos dois com valores opostos.

> Encontrado: escurecer `neutral-500` corrigiu o claro e **piorou** o escuro, de 18 para 23 falhas na agenda.

### 3. Alvo de toque de 32px

`--target-min: 32px` para qualquer controle, `--target-comfortable: 36px` para navegação. Mais rígido que a WCAG 2.5.8 (24×24), porque a recepção usa o sistema o dia inteiro.

Quando o visual precisa ser menor (trilho do switch tem 24px), a **área clicável** cresce sem mudar o desenho.

> Encontrado: 17 controles abaixo de 32px, os menores em 22px.

### 4. Nada abaixo de 11px

`--text-2xs` é o piso. Abaixo disso não é "discreto", é ilegível.

> Encontrado: 9px em selos e iniciais de avatar.

### 5. Ícone nunca aparece sem rótulo acessível

`IconButton` exige `label`, que vira `aria-label` e `title`. Ícone decorativo leva `aria-hidden`.

### 6. Um `<h1>` por tela, sem pular nível

Verificado nas 13 rotas: todas com exatamente um `h1` e sem salto de hierarquia.

---

## Responsividade

**Nenhuma página pode ter scroll horizontal.** Verificado em 390px, 768px e 1440px.

Quando o conteúdo é largo por natureza (tabela, quadro de funil, grade da agenda), **o próprio componente rola** com `overflow-x-auto` e `min-width` — a página nunca rola.

> Encontrado: as três páginas originais tinham 594px de conteúdo numa viewport de 390px, por causa do cabeçalho que não encolhia. O escopo pede uso no celular explicitamente (§11.1).

---

## Exceção registrada

O cartão de agendamento de 15 minutos tem **26px**, abaixo do `--target-min`. A altura do cartão **codifica a duração** da consulta: forçar 32px quebraria a proporção da grade, que é informação.

26px passa na WCAG 2.5.8. Nossa régua de 32px é mais rígida que a norma. Exceção consciente, revisada a cada rodada.

O cartão também carrega `aria-label` com nome, horário, tipo e status: no cartão de 15 minutos o status é só a barra colorida de 3px, e sem o rótulo o leitor de tela recebia apenas o nome do paciente.

## Dois pisos de alvo, por contexto

| Contexto | Piso | Por quê |
| --- | --- | --- |
| Produto interno | 32px (`--target-min`) | Mouse e teclado numa jornada de 8h, com a densidade da agenda a pagar |
| Portal do paciente | 44px (`--target-toque`) | Polegar, celular, uma pessoa que entra uma vez a cada seis meses e não tem onde treinar |

O portal redefine `--target-min` no próprio `<main>`. Todo componente que lê o token sobe junto — não há exceção escrita controle a controle, e um componente novo entra certo por padrão.

---

## Falso positivo conhecido

O título do portal (`"Olá, Ana Beatriz"`) acusa **1.06:1**. É limitação do medidor: o texto branco está sobre o gradiente de marca, aplicado por `background-image`, e o script só lê `background-color`, subindo na árvore até achar o branco da página.

Verificado visualmente: o contraste real é adequado. **Não corrija isso.**

---

## Como verificar

Com o dev server no ar:

```bash
node scripts/audit-ux.mjs
```

O script percorre o DOM em três rotas e dois temas, e reporta contraste real, tamanhos de fonte, opacidades, espaçamentos, alvos de toque, cortes de conteúdo e hierarquia de headings.

Rode antes de abrir PR. Um número que sobe é regressão.

---

# Auditoria de teclado e leitor de tela — rodada 2

Script próprio (`scripts/audit-a11y.mjs`), nas 13 rotas. Mede nome acessível, ordem de foco, armadilha e devolução de foco em diálogo, marcos de página e anúncio de mudança.

## Resultado

| Métrica | Antes | Depois |
| --- | --- | --- |
| Foco entra no diálogo ao abrir | **não** | sim |
| Foco escapa do diálogo | **22 de 25 tabs** | 0 de 25 |
| Foco devolvido ao gatilho ao fechar | **não** | sim |
| Abas sem `aria-controls` | 17 | 0 |
| Rotas sem `<main>` | 2 | 0 |
| Link de pular para o conteúdo | não existia | existe |
| Elementos sem nome acessível | 0 | 0 |

## O achado grave

**O painel lateral era intransponível por teclado.** Quem abria o formulário de novo agendamento e apertava Tab ia parar na agenda atrás, sem caminho de volta — em 22 das 25 tentativas. É falha funcional, não detalhe de conformidade: o formulário simplesmente não era preenchível sem mouse.

Corrigido com gestão de foco no `Sheet`: guarda quem abriu, leva o foco para o primeiro campo útil (pulando o botão de fechar), circula o Tab dentro do painel e devolve o foco ao fechar.

## O `Segmented` não era um conjunto de abas

Ele usava `role="tab"` sem `tabpanel` correspondente, então o leitor de tela anunciava "aba" sem ter o que abrir. Virou `role="group"` com `aria-pressed`, que descreve o que ele é de verdade: botões de alternância.

O `Tabs` (sublinhado), esse sim tem painéis, e agora cada aba aponta para o seu com `aria-controls`, com as setas percorrendo as abas.

## Regressão causada pelas animações

A entrada da página usava `animation-fill-mode: both`, que **mantém o transform do último quadro para sempre**. Um transform vivo cria containing block, e todo `position: fixed` descendente passa a ancorar nele: o painel lateral abria 122px abaixo do topo e vazava 1051px de altura no celular.

Dois consertos, os dois mantidos:
1. `Sheet` renderiza em portal no `body` — imune a containing block de qualquer ancestral.
2. `fill-mode: backwards` em vez de `both` — aplica o estado inicial durante o atraso e não deixa transform residual.

**Regra:** `both` e `forwards` em animação com `transform` quebram `position: fixed` descendente. Use `backwards`.

## Salto de foco aceito

A agenda e o funil acusam 4 "saltos" na ordem de foco. É esperado: são grades em coluna, e o foco desce a primeira coluna antes de subir para o topo da segunda. A ordem é por coluna, e é isso que a leitura da grade pede.

## O que ainda não foi verificado

- Leitor de tela real (NVDA, VoiceOver) — a auditoria mede a estrutura ARIA, não como ela soa
- Zoom de 200% e texto redimensionado
- Daltonismo — o status depende de cor **e** de rótulo, o que ajuda, mas não foi testado

## Movimento

`prefers-reduced-motion: reduce` desliga todas as animações e transições. Movimento pode provocar enjoo e desorientação em quem tem sensibilidade vestibular, e num sistema usado 8 horas por dia isso não é detalhe.
