# Direção visual

Extraída das referências em `referencias/`. Este documento é a ponte entre "o que a gente gostou" e "quais tokens existem" — nenhum token deve ser criado sem um princípio aqui que o justifique.

## Referências

| Arquivo | Produto | O que puxamos |
| --- | --- | --- |
| `sugarcrm-customer-journeys.webp` | SugarCRM — Customer Journeys | Preto como estado ativo, cards sem borda, rail de ícones circulares, avatares como elemento de primeira classe, título grande em peso leve |
| `clerio-all-client-data.webp` | Clerio — All Client Data | Numerais gigantes em peso fino, legendas pequenas em itálico, micro-gráficos de barra fina, botão circular "↗" no canto do card, zona de marca em gradiente |

## Os cinco adjetivos

**Leve · Silencioso · Preciso · Respirado · Premium sem peso.**

Se um componente novo não couber nesses cinco, ele está errado.

## Princípios derivados (o que vira token)

1. **Fundo claro e quase neutro, com temperatura fria.** Cards brancos sobre cinza-claro. Nenhuma superfície escura no app da recepção.
2. **Raio generoso.** Cards 16–24px; botões, badges e navegação em pílula (999px).
3. **Elevação por sombra difusa, nunca por borda dura.** As duas referências quase não têm stroke de 1px — a separação vem de sombra larga e de baixa opacidade. Borda fica como recurso de reforço, não como padrão.
4. **Preto é o estado ativo.** Na ref 1, o item selecionado da navegação e o nó em foco são preto sólido com texto branco. **Isto é a descoberta mais importante para o white label:** o estado ativo não precisa da cor da marca, então a densidade de UI da recepção funciona igual em qualquer clínica.
5. **Números grandes em peso fino.** O dado é a hierarquia. `72,52%` em ~56px peso 250, com algarismos tabulares.
6. **Legenda pequena e muda.** Hierarquia por tamanho e cor, não por peso. Nada de negrito para separar.
7. **Cor semântica só em dose mínima.** Bolinha de 16px, pílula pequena. Nunca um campo grande de cor — isso é o que mantém a paleta da clínica sendo a única cor forte da tela.
8. **Ação secundária é um círculo fantasma.** Ícone dentro de círculo, fundo branco ou transparente.
9. **Avatares são conteúdo, não enfeite.** A agenda é multiprofissional (§11.1); pessoas aparecem como identidade, não como iniciais genéricas.
10. **Micro-gráfico de barra fina** para tendência dentro do card, sem eixo nem grade.
11. **Sem eyebrow desnecessária.** As referências abusam do rótulo pequeno acima do título ("Aggregated Client Metrics" sobre "All Client Data", "Typical Account Metrics" sobre o número). Quase sempre é ruído: repete o que o título já diz e rouba uma linha. Só usamos eyebrow quando ela carrega informação que o título não carrega — por exemplo, o nome da clínica acima do nome do paciente. Na dúvida, corta.

## Fonte e ícones

| Escolha | Valor | Motivo |
| --- | --- | --- |
| Tipografia | **Manrope** (variável, 200–800) | Geométrica com terminações levemente arredondadas; aguenta o peso 250 dos numerais grandes sem quebrar e mantém legibilidade em 12–13px nas tabelas densas da agenda |
| Ícones | **HugeIcons** (`@hugeicons/react` + `@hugeicons/core-free-icons`) | Traço fino e consistente com o "silencioso"; conjunto grande o bastante para cobrir agenda, financeiro e portal sem misturar bibliotecas |

Regra de ícone: traço `1.5`, tamanho `18` em linha de texto e `20` em botão circular. Ícone nunca aparece sozinho sem rótulo ou `aria-label`.

## O que rejeitamos das referências

| Rejeitado | Motivo |
| --- | --- |
| Ilustração 3D glassy (ref 2) | Caro de produzir, envelhece rápido e não escala para N clínicas com marcas diferentes |
| Gradiente azul forte como padrão do app | Vira **zona de marca exclusiva do portal do paciente**, onde a marca da clínica deve aparecer grande (§12). No app da recepção, atrapalha leitura o dia todo |
| Neumorfismo / sombra interna pesada | Conflita com "silencioso" e prejudica contraste |
| A densidade baixa das duas refs | Ambas são telas de *dashboard de marketing*. A agenda é ferramenta operacional de uso contínuo — ver a ressalva abaixo |

## Ressalva de densidade (decisão de projeto, não das referências)

As duas referências são peças de apresentação: pouca informação, muito respiro. A agenda da recepção é o oposto — é a tela que alguém olha 8 horas por dia e precisa mostrar muitos agendamentos de uma vez (§11.1, e o risco registrado em §12: "o usuário diário é a recepção, não o médico").

**Regra:** adotamos a *linguagem* das referências (raio, sombra, peso de fonte, cor em dose mínima) mas **aumentamos a densidade** na agenda e nas tabelas. Respiro alto fica para portal do paciente, dashboards e telas de configuração.

## Como isso resolve o white label

A arquitetura que sai daí tem três camadas, e só uma varia por clínica:

| Camada | Varia por clínica? | Contém |
| --- | --- | --- |
| Neutros e elevação | Não | Fundo, cards, sombras, bordas, texto |
| Estado ativo (preto/branco) | Não | Seleção, navegação ativa, foco |
| **Acento de marca** | **Sim** | Cor primária da clínica, logo, domínio, zona de marca do portal |

Ou seja: trocar de clínica troca **uma variável de cor + o logo**, e nenhum componente precisa ser reescrito. É exatamente o "customização vira parâmetro, nunca fork" de §9 do escopo.
