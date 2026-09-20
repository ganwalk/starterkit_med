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

## O que a auditoria ainda não cobre

Fica para a próxima rodada, e vale dizer que **não foi verificado**:

- Navegação completa por teclado (ordem de foco, armadilha de foco no `Sheet`)
- Leitor de tela real (NVDA, VoiceOver)
- `prefers-reduced-motion`
- Zoom de 200% e texto redimensionado
- Daltonismo — hoje o status depende de cor **e** de rótulo, o que ajuda, mas não foi testado
