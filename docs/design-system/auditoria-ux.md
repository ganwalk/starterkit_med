# Auditoria de UX/UI — rodada 1

Auditoria medida no navegador (não por inspeção visual), em `/design-system`, `/agenda` e `/portal`, nos temas claro e escuro. O script percorre o DOM e mede contraste real, tamanhos de fonte, opacidades, espaçamentos, alvos de toque, cortes de conteúdo e hierarquia de headings.

## Resultado

| Métrica | Antes | Depois |
| --- | --- | --- |
| Falhas de contraste (WCAG AA) | 151 | 0 reais (1 falso positivo) |
| Controles abaixo de 32px | 33 | 1 (exceção documentada) |
| Elementos com conteúdo cortado | 6 | 2 (sangramento decorativo intencional) |
| Tamanhos de fonte fora da escala | 9px e 44px | nenhum |
| Opacidades sem token | 5 valores avulsos | 0 |
| Scroll horizontal em 390px | presente | **em aberto** |

## Achados e o que foi feito

### 1. Contraste reprovado em massa (crítico)

O problema mais grave, e ele era sistêmico, não pontual: os dois níveis de texto de apoio reprovavam em WCAG AA.

| Token | Valor antigo | Contraste medido | Correção |
| --- | --- | --- | --- |
| `--text-muted` | `neutral-500` `#7b8494` | **3.55:1** | escala remapeada para `neutral-600` |
| `--text-faint` | `neutral-400` `#a3abb9` | **2.18:1** | escala remapeada para `neutral-500`, escurecido para `#667082` |
| `--green-600` e irmãos | — | 4.04 a 4.47:1 | todos os tons 600 escurecidos |

O caso mais sério não era decorativo: a segunda linha do cartão de agendamento (`08:30 · Primeira consulta · Unimed`) media 3.77:1. É informação operacional que a recepção lê o dia inteiro.

**Regra que saiu daí:** a hierarquia de texto se apoia em tamanho e peso, não em texto apagado. Os quatro níveis passam em AA. Se está na tela, tem que dar para ler.

### 2. O tema escuro regrediu com a primeira correção

Escurecer os neutros para consertar o tema claro **piorou** o escuro (agenda foi de 18 para 23 falhas), porque lá o mesmo token é texto claro sobre fundo preto e precisava andar na direção oposta.

**Regra que saiu daí:** no escuro, os níveis de texto sobem na escala de neutros, não descem. Toda mudança em neutro precisa ser medida nos dois temas.

### 3. Encaixe de 15 minutos cortava o nome do paciente

Com 22px por slot, o cartão de um encaixe tinha 20px úteis para 25px de texto. O nome ficava cortado — **bug funcional**, não estético: encaixe é justamente o agendamento que a recepção cria com pressa.

Corrigido subindo o slot para 26px, altura mínima para uma linha de 11px caber sem corte.

### 4. Texto de 9px

O selo "Pix" no cartão e as iniciais do avatar `xs` usavam 9px, abaixo do mínimo legível da escala (11px). Corrigidos.

### 5. Alvos de toque

17 controles abaixo de 32px, os menores em 22–24px (switch, navegação segmentada pequena, seletor de clínica). Tokenizados em `--target-min: 32px` e `--target-comfortable: 36px` e aplicados.

### 6. Opacidades ad-hoc

Cinco valores espalhados sem nome (0.2, 0.4, 0.45, 0.55, 0.7). Cada um virou token com um dono único.

### 7. Numeral grande cortado verticalmente

O `truncate` no exemplo da escala tipográfica cortava o numeral de 56px (69px de conteúdo em caixa de 62px), porque `truncate` aplica `overflow: hidden` e o `line-height` apertado não comporta ascendentes e descendentes. Removido.

## Falso positivo registrado

`"Olá, Ana Beatriz"` acusa contraste de **1.06:1**. É erro do medidor, não da tela: o texto branco está sobre o gradiente de marca, aplicado via `background-image`, e o script só lê `background-color`, então ele sobe na árvore até achar o branco da página. Verificado visualmente: o contraste real é adequado.

Fica registrado para a próxima rodada não "corrigir" o que está certo.

## Exceção aceita

O cartão de agendamento de 15 minutos tem 26px de altura, abaixo do `--target-min` de 32px. A altura do cartão **codifica a duração** da consulta — forçar 32px quebraria a proporção da grade. 26px passa no mínimo da WCAG 2.5.8 (24×24px); o nosso 32px é uma régua mais rígida que a norma. Exceção consciente, não descuido.

## Em aberto para a rodada 2

**Scroll horizontal em 390px e 768px, em todas as páginas.** O conteúdo mede 594px numa viewport de 390px. A causa é o cabeçalho, que não encolhe: marca, navegação e seletor de clínica ficam lado a lado sem quebra.

Isso é falha funcional — o escopo pede uso no celular explicitamente (§11.1, item 1). Será corrigido na reconstrução do shell, que precisa virar navegação de aplicação de verdade (lateral no desktop, gaveta no celular).

## Como repetir a auditoria

O script vive em `scripts/audit-ux.mjs`. Com o `npm run dev` no ar:

```bash
node scripts/audit-ux.mjs
```
