# Fundamentos

Os tokens. Tudo na interface sai daqui — se um valor não está nesta página, ele não deveria estar na tela.

Arquivos: `src/styles/tokens.css` (primitivas e semântica) e `src/styles/themes.css` (marca por clínica).

---

## Cor

### Camada 1 — Neutros

Temperatura fria, doze passos. Nenhum componente consome estes valores direto.

| Token | Valor | Uso |
| --- | --- | --- |
| `--neutral-0` | `#ffffff` | Superfície de card no tema claro |
| `--neutral-25` | `#fcfcfd` | — |
| `--neutral-50` | `#f7f8fa` | Fundo de página no tema claro |
| `--neutral-100` | `#eff1f5` | Superfície rebaixada, trilhos |
| `--neutral-150` | `#e8ebf0` | Borda sutil |
| `--neutral-200` | `#e0e4ea` | Borda padrão |
| `--neutral-300` | `#cbd1da` | Borda de reforço; texto secundário no escuro |
| `--neutral-400` | `#a3abb9` | Texto apagado no escuro |
| `--neutral-500` | `#667082` | Texto apagado no claro |
| `--neutral-600` | `#5a6373` | Texto mudo no claro |
| `--neutral-700` | `#424a58` | Texto secundário no claro |
| `--neutral-900` | `#171b22` | Texto principal; card no escuro |
| `--neutral-950` | `#0c0e13` | Estado ativo; fundo de página no escuro |

> `--neutral-500` foi escurecido de `#7b8494` para `#667082` na auditoria. O valor antigo media 3.55:1 e reprovava WCAG AA.

### Camada 1 — Cores de estado

Cada família tem três papéis distintos, e confundi-los é o erro mais comum:

| Sufixo | Papel | Regra de contraste |
| --- | --- | --- |
| `50` / `100` | Fundo de pílula, de alerta | — |
| `500` | **Preenchimento**: bolinha, barra de gráfico | Não se aplica (não é texto) |
| `600` | **Texto** sobre o fundo `50`/`100` | Precisa de 4.5:1 |

Famílias: `green`, `amber`, `red`, `blue`, `violet`.

> Todos os tons `600` foram escurecidos na auditoria. Mediam entre 4.04 e 4.47:1 e reprovavam.

### Camada 2 — Semântica

É o que os componentes usam.

**Superfícies**

| Token | Claro | Escuro |
| --- | --- | --- |
| `--surface-page` | `neutral-50` | `neutral-950` |
| `--surface-card` | `neutral-0` | `neutral-900` |
| `--surface-sunken` | `neutral-100` | `#0a0c10` |
| `--surface-hover` | `neutral-50` | `neutral-800` |

**Texto** — quatro níveis, todos aprovados em AA nos dois temas.

| Token | Claro | Escuro | Para quê |
| --- | --- | --- | --- |
| `--text-primary` | `neutral-900` | `neutral-50` | Conteúdo, títulos, valores |
| `--text-secondary` | `neutral-700` | `neutral-300` | Descrição, texto de apoio |
| `--text-muted` | `neutral-600` | `neutral-400` | Rótulo, metadado, legenda |
| `--text-faint` | `neutral-500` | `#8a93a2` | Referência técnica, nota de rodapé |

> **A hierarquia se apoia em tamanho e peso, não em texto apagado.** Antes da auditoria, `muted` e `faint` eram o recurso preguiçoso para "dar menos importância" — e reprovavam em contraste. Se está na tela, tem que dar para ler.

> **No tema escuro, os níveis sobem na escala de neutros.** Corrigir o claro escurecendo um neutro *reprova* o escuro. Toda mudança precisa ser medida nos dois.

**Estado ativo** — `--active-bg` / `--active-fg`. Preto no claro, branco no escuro. Nunca usa a cor da marca (ver `direcao-visual.md`, princípio 4).

**Status do paciente** — os seis estados de §11.1: `agendado`, `confirmado`, `chegou`, `atendimento`, `faltou`, `cancelado`. Cada um com par `-fg` e `-bg`. Os dois neutros (`agendado`, `cancelado`) têm override no tema escuro.

### Camada 3 — Marca da clínica

O único grupo que varia por tenant, em `themes.css`:

```
--accent            ação principal, seleção de marca
--accent-hover      estado pressionado
--accent-soft       fundo de destaque leve
--accent-muted      fundo de destaque médio
--accent-contrast   texto sobre o acento
--accent-text       o acento usado COMO TEXTO
```

Um tenant redefine só `--brand-50/100/500/600/contrast`. A ponte para `--accent` é automática.

**`--accent` e `--accent-text` não são a mesma coisa no escuro.** Como fundo de botão, o acento continua saturado — lá quem carrega o contraste é o texto branco por cima. Como texto, ele obedece à mesma regra dos neutros e sobe na escala: `#2f5fe0` sobre o próprio tom suave dá 3,15:1, e era assim que o bloco de data do portal e o link "Como chegar" reprovavam no tema escuro. Por isso `text-accent-text`, e não `text-accent`.

### Cor personalizada da clínica

Um tenant do catálogo traz as cinco variáveis escritas à mão. A clínica que cola o hexadecimal dela tem uma só, e `rampaDeMarca()` deriva o resto: `50` e `100` misturando com branco, `600` escurecendo. A rampa é escrita como estilo inline no `<html>`, e por isso ganha da regra `[data-tenant=...]` por especificidade — é o que faz a escolha valer no produto inteiro, e não só num retângulo de prévia.

O campo aceita digitação parcial (`#0f7`), que ainda não é cor. A rampa só troca quando o hexadecimal fecha; até lá vale a anterior, senão a tela pisca a cada tecla.

---

## Tipografia

**Manrope Variable**, auto-hospedada via `@fontsource-variable/manrope` — sem requisição a terceiro, o que importa num produto que trata dado de saúde.

### Escala

| Token | Tamanho | Uso |
| --- | --- | --- |
| `--text-display` | 56px | Numeral de destaque em painel |
| `--text-h1` | 40px | Título de página; numeral de card |
| `--text-h2` | 28px | Título de seção e de tela |
| `--text-h3` | 20px | Título de painel |
| `--text-h4` | 17px | Título de card |
| `--text-body` | 15px | Corpo |
| `--text-sm` | 13px | Apoio, legenda de tabela |
| `--text-xs` | 12px | Metadado |
| `--text-2xs` | 11px | **Mínimo do sistema.** Pílula, selo, micro-rótulo |

> Nada abaixo de 11px. A auditoria encontrou 9px em uso e eles foram removidos.
> 44px foi eliminado por estar fora da escala.

### Pesos

| Peso | Nome | Uso |
| --- | --- | --- |
| 250 | `--weight-numeral` | **Só** para numeral grande. O dado é a hierarquia |
| 300 | light | Título grande de página |
| 400 | normal | Corpo |
| 500 | medium | Rótulo, botão |
| 600 | semibold | Título de card e de seção |
| 700 | bold | Título de tela, ênfase máxima |

### Numerais

`font-variant-numeric: tabular-nums` é obrigatório em agenda, tabela e painel — a classe `.tabular` e o seletor de `table` já aplicam. Sem isso, colunas de número dançam entre linhas.

---

## Espaçamento

Base de 4px. `--space-1` (4px) a `--space-16` (64px).

A auditoria confirmou 100% de aderência à grade: nenhum valor ímpar em uso.

---

## Raio

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-xs` | 6px | Anel de foco |
| `--radius-sm` | 8px | Elemento pequeno |
| `--radius-md` | 12px | Campo, cartão de agendamento, item de menu |
| `--radius-lg` | 16px | Card padrão, alerta |
| `--radius-xl` | 20px | Card de destaque |
| `--radius-2xl` | 28px | Painel lateral, modal |
| `--radius-pill` | 999px | Botão, pílula, badge |

`rounded-full` é usado em formas 1:1 (avatar, botão de ícone); `rounded-pill` em formas de estádio. Renderizam igual — a distinção é de intenção.

---

## Elevação

Sombra difusa e de baixa opacidade. **A separação vem da sombra, não de borda dura** — as referências quase não usam stroke de 1px.

| Token | Uso |
| --- | --- |
| `--shadow-xs` | Botão sólido |
| `--shadow-sm` | Card padrão |
| `--shadow-md` | Card em hover, card destacado |
| `--shadow-lg` | Card principal do portal |
| `--shadow-xl` | Painel lateral, modal |

No tema escuro as sombras ficam mais opacas, porque sombra suave desaparece sobre fundo preto.

---

## Opacidade

Cinco valores, cada um com um dono único. A auditoria encontrou esses mesmos valores espalhados sem nome.

| Token | Valor | Dono |
| --- | --- | --- |
| `--opacity-disabled` | 0.45 | Controle desabilitado |
| `--opacity-cancelled` | 0.55 | Agendamento ou lead cancelado |
| `--opacity-series` | 0.7 | Barra de micro-gráfico |
| `--opacity-hairline` | 0.4 | Linha do horário atual |
| `--opacity-decorative` | 0.2 | Elemento puramente decorativo |

Opacidade **nunca** é usada para criar hierarquia de texto — isso é papel dos níveis de `--text-*`, que passam em contraste.

---

## Alvo de toque

| Token | Valor | Uso |
| --- | --- | --- |
| `--target-min` | 32px | Mínimo para qualquer controle |
| `--target-comfortable` | 36px | Navegação e ação frequente |

Mais rígido que a WCAG 2.5.8 (24×24px), porque a recepção usa o sistema o dia inteiro e às vezes em tablet.

**Exceção registrada:** o cartão de agendamento de 15 minutos tem 26px, porque a altura codifica a duração da consulta. Passa na WCAG; não passa na nossa régua. Consciente.

---

## Movimento

| Token | Valor |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-fast` | 120ms |
| `--duration-base` | 200ms |
| `--duration-slow` | 320ms |

A classe utilitária `.transition-base` cobre a maioria dos casos.

### Animações de entrada

| Classe | Uso |
| --- | --- |
| `.animate-fade-in` | Fundo escurecido de diálogo |
| `.animate-slide-in-right` | Painel lateral |
| `.animate-slide-in-left` | Gaveta de navegação no celular |
| `.animate-scale-in` | Modal central, menu suspenso |
| `.animate-rise-in` | Conteúdo de página ao navegar |

Movimento é para dar continuidade entre estados — mostrar de onde uma coisa veio — e nunca para chamar atenção. Deslocamentos curtos: o painel entra 16px, não a tela inteira.

**Duas regras que vieram de defeitos reais:**

1. **`fill-mode` é `backwards`, nunca `both` nem `forwards`.** `both` mantém o transform do último quadro para sempre, e um transform vivo vira containing block: todo `position: fixed` descendente passa a ancorar nele. Foi assim que o painel lateral abriu 122px fora do lugar.
2. **Tudo desliga sob `prefers-reduced-motion: reduce`.**
