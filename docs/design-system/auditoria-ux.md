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

## Falso positivo que virou correção do medidor

`"Olá, Ana Beatriz"` acusava contraste de **1.06:1**. Era erro do medidor, não da tela: o texto branco está sobre o gradiente de marca, aplicado via `background-image`, e o script só lia `background-color`, então subia na árvore até achar o branco da página.

Ficou registrado como falso positivo por uma rodada. Foi a decisão errada: **um falso positivo tolerado é onde uma falha real se esconde**. Quando o portal ganhou o selo da marca, o monograma branco sobre o mesmo gradiente entrou na lista com o mesmo 1.06, e já eram dois itens que a gente aprendeu a ignorar em bloco.

O script agora lê as paradas de cor de um gradiente e usa a média delas como fundo. Os dois itens sumiram da lista porque passaram a ser medidos, não porque foram anistiados.

## Exceção aceita

O cartão de agendamento de 15 minutos tem 26px de altura, abaixo do `--target-min` de 32px. A altura do cartão **codifica a duração** da consulta — forçar 32px quebraria a proporção da grade. 26px passa no mínimo da WCAG 2.5.8 (24×24px); o nosso 32px é uma régua mais rígida que a norma. Exceção consciente, não descuido.

## Em aberto para a rodada 2

**Scroll horizontal em 390px e 768px, em todas as páginas.** O conteúdo mede 594px numa viewport de 390px. A causa é o cabeçalho, que não encolhe: marca, navegação e seletor de clínica ficam lado a lado sem quebra.

Isso é falha funcional — o escopo pede uso no celular explicitamente (§11.1, item 1). Será corrigido na reconstrução do shell, que precisa virar navegação de aplicação de verdade (lateral no desktop, gaveta no celular).

## Rodada 4 — portal e motor de marca

### 1. Três interruptores na mesma linha, cada rótulo sob o trilho do seguinte

`Switch` era `inline-flex`. Elemento inline ignora margem vertical, então o `space-y-4` que os separava não fazia nada: os três nasciam lado a lado, com o rótulo de um encostando no controle do outro. Medido no DOM — os três com o mesmo `top: 1686`.

Corrigido no componente, não na tela: `flex w-fit`. Era falha de biblioteca, e a mesma armadilha estava montada em qualquer pilha de interruptores — o passo 3 do novo agendamento incluído.

### 2. Acento como texto reprovava no tema escuro

`--accent` servia para fundo de botão **e** para texto. Como texto sobre o próprio tom suave, o azul da marca dava **3,15:1** — o bloco de data do portal ("Quinta", "Setembro") e o link "Como chegar" reprovavam no escuro.

Separado em `--accent-text`, que obedece à mesma regra dos neutros: no escuro, texto sobe na escala. Como fundo de botão o acento continua saturado, porque lá quem carrega o contraste é o texto branco.

### 3. "Como chegar" com 16px de altura

Alvo de 91×16px dentro de uma linha de texto. Ganhou `min-h-[var(--target-min)]`. O hover deixou de escurecer o acento e passou a sublinhar: no tema escuro, escurecer o acento é perder justamente o contraste que ele tem.

### 4. Nome do documento cortado para "Receit…" em 390px

O selo de validade foi escondido no celular com `hidden` passado como `className` do `Badge`. Não funcionou: o `cn` concatena sem resolver conflito do Tailwind, então `hidden` e o `inline-flex` do próprio componente ficam os dois na lista e quem decide é a ordem da folha. O selo ficava, e o nome do documento cedia espaço.

Escondido pelo invólucro. Virou regra em `componentes.md`.

### 5. Área vazia grande no lugar dos documentos

O portal abria um cartão de ~300px para dizer que não havia documento nenhum. Um portal cujo paciente nunca recebeu receita é uma demonstração mais fraca do que um que recebeu — e a razão nº 1 de ligação para a recepção é pedir a receita de novo. O estado vazio continua documentado e demonstrado em `/design-system`, onde é o lugar dele.

### 6. O selo da clínica era um quadrado vazio em três lugares

Sobre o gradiente do portal, translúcido, parecia imagem que não carregou. Virou o componente `Marca`, que mostra o logo enviado ou o monograma, nos três lugares de uma vez.

### Auditoria de acessibilidade no mesmo passo

O medidor acusou "sem nome acessível" no `<input type="color">` que o selo da marca aciona. Esse controle é `aria-hidden` com `tabindex="-1"` de propósito — cobrar nome dele é cobrar o oposto do que o atributo pede. O script passou a pular o que está fora da árvore de acessibilidade.

### Resultado

| | antes | depois |
| --- | --- | --- |
| Contraste reprovando (claro + escuro) | 5 | **0** |
| Alvos abaixo de 32px | 2 | **1** (a exceção documentada) |
| Problemas de acessibilidade | 1 | **0** |
| Rolagem lateral (13 rotas × 3 larguras) | 0 | **0** |

## Rodada 5 — auditoria contra a skill `no-red-flags`

Auditoria externa, com a régua de <https://github.com/ProdutosAUVP/no-red-flags>: os padrões que fazem uma interface parecer a média estatística de todas as landing pages já geradas. Rodada em modo Detect primeiro, depois corrigida.

A skill manda tratar **três ou mais "instant tells" juntos** como P0. Havia três.

### P0

**Orb de aurora.** `PortalPage.tsx` tinha um `size-96 rounded-full` com `radial-gradient(circle, #fff …)` fora da tela, atrás do herói. Removido. O gradiente de marca e o respiro já sustentam o bloco; espaço vazio não é problema a resolver.

**Vidro fosco em duas superfícies.** O cabeçalho fixo (`bg-card/85 backdrop-blur-xl`) e o selo da marca (`bg-white/20 backdrop-blur-sm`) viraram superfícies sólidas. No cabeçalho, o conteúdo passava por baixo enquanto a recepção rola a agenda, e o hairline já separava. No selo, a textura do herói atravessava a marca da clínica.

O scrim do `Sheet` **continua** com blur: é o caso que a skill permite — overlay de verdade sobre o conteúdo, com fundo sólido por baixo.

### P1

**Banda de métricas sem líder.** Recepção tinha três tiles iguais e Indicadores, quatro. A pessoa lia todos para descobrir se havia problema. Agora "Maior espera" (o único que faz alguém levantar da cadeira) e "Faltas" (o número que este produto existe para mover, e o único com baseline) ocupam o dobro e vêm primeiro.

**Ladrilho de ícone.** O `EmptyState` punha um glifo de 22px dentro de um círculo de 48px acima do título, empurrando texto e ação para baixo. A lista de documentos do portal repetia o mesmo ícone genérico de arquivo nas três linhas, sem distinguir receita de laudo. Os dois ladrilhos saíram.

**Cadeias de ponto médio.** `14:30 · Retorno · 30 minutos`, um rodapé com quatro campos, o resumo da agenda com três. Viraram frases e linhas. Sobraram só os pares (`data · profissional`), que separam dois campos em vez de montar uma string de metadados.

**`Sparkles` para "IA".** O aviso sobre o limite regulatório do assistente usava o ícone de brilho; agora usa o de alerta, que é do que o aviso trata. Na bolha do bot, o ícone saiu — a palavra "Assistente" já estava escrita ao lado.

**Número sem fonte usado para persuadir.** "Com sinal pago, a falta é de 2,1%. Sem sinal, 18,4%." aparecia no fluxo de agendamento para empurrar uma decisão, sem dizer de onde vinha. Agora diz: medição da própria clínica, últimos 90 dias.

### P2

**Piso de toque de 44px no portal.** O produto interno fica em 32px — mouse e teclado numa jornada de 8h, com a densidade da agenda a pagar. O portal é polegar, celular, uma pessoa que entra uma vez a cada seis meses. Em vez de exceção escrita controle a controle, `Button`, `IconButton`, `Input`, `Select`, `Switch` e `Accordion` passaram a ler `--target-min` como piso, e o portal redefine o token. Medido em 390px: nenhum controle abaixo de 44px.

**Dois estados com a mesma cor.** `agendado` e `cancelado` são o mesmo neutro nos dois temas. Em vez de inventar uma sexta cor, `cancelado` virou **anel vazado** em vez de disco: distingue por forma, o que também funciona para quem não separa os dois cinzas.

**Rótulo do cartão da agenda.** Achado ao reler o cartão: no cartão de 15 minutos o status era só a barra colorida de 3px, e o leitor de tela recebia apenas o nome do paciente. Ganhou `aria-label` com nome, horário, tipo e status.

**Token morto.** `--violet-500` (`#7c3aed`, o hexadecimal que a skill lista nominalmente) não era usado por ninguém. Apagado. `--violet-600` fica: é a cor do estado "em atendimento", com palavra ao lado.

### O que a auditoria confirmou que já estava certo

Manrope com motivo declarado, preto como estado ativo em vez da cor da marca, nenhum gradiente em texto, `transition` com propriedades nomeadas (nunca `all`), uma única entrada orquestrada por página, `prefers-reduced-motion` desligando tudo, os passos 1-2-3 do portal como sequência real, e zero copy portável — "Supercharge", "Get Started", "Seamless" e afins não aparecem em lugar nenhum do produto.

### Resultado

| | antes | depois |
| --- | --- | --- |
| Instant tells da skill | 3 | **0** |
| Contraste reprovando (claro + escuro) | 0 | **0** |
| Controles abaixo de 44px no portal | 12 | **0** |
| Problemas de acessibilidade | 0 | **0** |
| Rolagem lateral (13 rotas × 3 larguras) | 0 | **0** |

## Como repetir a auditoria

O script vive em `scripts/audit-ux.mjs`. Com o `npm run dev` no ar:

```bash
node scripts/audit-ux.mjs
```
