# Registro de decisões

Todas as decisões de produto/negócio/técnicas ficam documentadas aqui, uma por arquivo, seguindo a numeração de §15 do documento de escopo (`CRM white label premium para médicos_ relatório e plano de ação (Level) v2.md`). Decisões novas que não estavam no documento original continuam a numeração (12, 13, ...).

## Formato de cada arquivo

```markdown
# NN. Título da decisão

- **Status:** pendente | decidido em parte | decidido
- **Responsável:** nome(s)
- **Fase para fechar:** 0 / 1 / 2 / 3
- **Origem:** seção do documento de escopo, se aplicável

## Contexto

## Decisão

## Alternativas consideradas

## Consequências
```

## Índice (espelha §15 do escopo)

| # | Decisão | Status | Responsável | Arquivo |
| --- | --- | --- | --- | --- |
| 1 | Particular ou convênio como foco inicial | Decidido em parte | Sócios | — (ver escopo §15) |
| 2 | Prontuário e integrações | Pendente | Vitor | — |
| 3 | Modelo de cobrança | Proposta definida | Diogo | — |
| 4 | Proposta de valor e especialidade inicial | Decidido em parte | Armando, Diogo | [`04-especialidade-inicial.md`](./04-especialidade-inicial.md) |
| 5 | Marca do produto | Decidido | Armando | [`05-marca-do-produto.md`](./05-marca-do-produto.md) |
| 6 | Quem fará suporte e vendas | Decidido | Sócios | — |
| 7 | Relação com a PES | Decidido | Sócios | — |
| 8 | Recursos de IA evitados | Pendente | João Pedro | — |
| 9 | Divisão de lucros e vesting | Pendente | Sócios + advogado externo | — |
| 10 | Cobertura do atendimento 24h | Decidido, falta detalhar | Diogo | — |
| 11 | Escopo da migração total | A definir | Vitor, João Pedro | — |
| 12 | Stack do design system e do protótipo | Decidido | Armando | [`12-stack-do-prototipo.md`](./12-stack-do-prototipo.md) |
| 13 | Direção visual | Decidido | Armando | [`../design-system/direcao-visual.md`](../design-system/direcao-visual.md) |

Decisões sem arquivo próprio ainda vivem só na tabela do documento de escopo (§15) — crie o arquivo individual quando alguém for revisá-la ou fechá-la, para não duplicar manutenção sem necessidade.
