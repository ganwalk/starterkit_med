# De-para: o que o escopo endereça a Armando

Fonte: `CRM white label premium para médicos_ relatório e plano de ação (Level) v2.md` (raiz do repo).
Este arquivo mapeia toda menção a você no documento de escopo para uma lista de responsabilidades e ações concretas. Atualize-o se o documento-fonte mudar de versão.

## 1. Seu papel declarado

> Seção 1 — "Ponto de partida"

| Necessidade do CRM | Quem | Lacuna a cobrir |
| --- | --- | --- |
| Design system white label, portal do paciente, usabilidade para a recepção | **Armando (Design Engineer)** | Nenhuma relevante — é a única linha da tabela sem lacuna a cobrir |

Ou seja: das quatro frentes da Level (design, engenharia, direito, gestão), a sua é a única considerada completa para o que o CRM exige. Não há contratação nem parceiro previsto para cobrir design/UX — a responsabilidade é sua de ponta a ponta.

## 2. Onde seu nome aparece no documento

| # | Seção | O que diz | O que significa para você |
| --- | --- | --- | --- |
| 1 | §1, Ponto de partida | Você cobre design system white label, portal do paciente e usabilidade para a recepção | Escopo de atuação declarado, sem lacuna |
| 2 | §11.3, Atendimento 24h | Plantão humano em escala rotativa entre você, Diogo e João Pedro (reserva) | Você também entra no rodízio de suporte crítico, não só em design |
| 3 | §12, Janelas de oportunidade | "Agenda própria sem dependência de APIs" — executores: Vitor e você | Você participa do design/UX da agenda, não só do portal do paciente |
| 4 | §12, Janelas de oportunidade | "Marca profunda por clínica (portal, mensagens, jornada)" — executor: você (sozinho) | Esta é a sua janela de oportunidade principal: branding aplicado além de logo/cor/fonte |
| 5 | §13.1, Frente A (Fase 0) | "Pesquisa com clientes" — 15 a 20 entrevistas com médicos e recepção/gestão — responsáveis: **você e Diogo**, semanas 1 a 3 | Você participa da pesquisa de campo, não só do design final |
| 6 | §13.1, Frente F (Fase 0) | "Design e marca do produto" — responsável: **você**, semanas 2 a 4 | Sua entrega própria e isolada dentro da Fase 0 (ver seção 3 abaixo) |
| 7 | §13.2, Fase 1 (MVP) | Responsáveis: **você, Vitor e João Pedro** | Você segue como um dos três donos da entrega do MVP, não só da Fase 0 |
| 8 | §15, Decisão 4 | Proposta de valor e especialidade inicial — responsáveis: **você e Diogo** | Decisão de produto que você ajuda a fechar |
| 9 | §15, Decisão 5 | Marca do produto — responsável: **você** — status "Decidido": separada da marca Level | Você é o dono formal desta decisão |

## 3. Sua entrega própria: Frente F (Fase 0, semanas 2–4)

Da tabela de frentes de trabalho (§13.1):

| Item | Detalhe |
| --- | --- |
| O que fazer | Nome e identidade do produto (separado da Level). Protótipo de alta fidelidade da agenda e do portal do paciente. Teste de usabilidade com ~5 pessoas de recepção. Tokens de tema para o modelo white label. |
| Responsável | Armando (única frente sem par) |
| Semanas | 2 a 4 (após a Frente A rodar as primeiras entrevistas) |
| Entrega | Marca do produto, protótipo testado e base do design system |

Essa é a entrega que o restante deste repositório (`docs/design-system/`) vai destrinchar em tarefas.

## 4. O que já dá para começar agora, sem esperar ninguém

Nada do que segue depende de decisão pendente de outro sócio ou de parecer jurídico:

1. **Frente A — Pesquisa com clientes** (com Diogo, semanas 1–3)
   - Montar o roteiro de entrevista (§13.1 já lista os tópicos: sistema atual, rotina da recepção, agenda, confirmação, faltas do último mês, uso de WhatsApp, motivo de troca/não troca, medo de migração, suporte, teste de preço, interesse em portal com marca própria, proporção particular/convênio).
   - Recrutar 15 a 20 entrevistados em 3 especialidades (Goiânia).
   - Definir o formato de consentimento de gravação (LGPD).
2. **Frente F — Design e marca do produto** (semanas 2–4, mas o trabalho de fundação pode começar já)
   - Naming e identidade do produto — só precisa ser **separado da marca Level** (Decisão 5 já fechada, §15).
   - Auditoria de UI dos concorrentes citados (PES/Doctor's Office, iClinic, Amplimed) para calibrar o nível de acabamento a superar — dado já levantado em §3 e §4, não exige entrevista.
   - Estrutura de tokens de tema (paleta, tipografia, espaçamento, logo, domínio) pensando em white label multi-tenant desde o dia 1 — requisito técnico já dado em §9.
   - Wireframes de baixa fidelidade da **agenda** (requisitos completos já listados em §11.1, itens 1–8) e do **portal do paciente** (escopo por fase na matriz de paridade, §4).
   - Planejar o roteiro do teste de usabilidade com ~5 pessoas de recepção (pode rodar em paralelo à Frente A, usando parte dos mesmos contatos).
3. **Escala de plantão 24h** (§11.3) — pode já alinhar com Diogo e João Pedro a divisão de horários e o registro de ocorrências, independente do resto da Fase 0.

## 5. O que depende de outros (bloqueadores para você)

| Dependência | De quem | Onde está no documento |
| --- | --- | --- |
| Decisão sobre prontuário (Decisão 2) — afeta se o portal do paciente expõe histórico clínico | Vitor | §15, Decisão 2; §13.1 Frente C |
| Parecer jurídico sobre recursos de IA e migração de histórico clínico | João Pedro | §15, Decisão 8; §13.1 Frente D |
| Especialidade inicial confirmada (Decisão 4) — muda o público do teste de usabilidade | Você + Diogo, mas depende dos resultados da Frente A | §15, Decisão 4 |
| Faixas de preço validadas — não bloqueia design, mas contextualiza o "onboarding" do motor de marca | Diogo | §15, Decisão 3 |

Nenhum desses bloqueia o início do trabalho listado na seção 4 — só limita o quanto o protótipo pode ser finalizado com 100% de confiança antes da 3ª/4ª semana.

## 6. Critério de entrega (como saber que terminou)

Da tabela de "Entregas consolidadas da Fase 0" (§13.1) e do critério de go/no-go (§13.1):

- Marca do produto definida e registrável (nome + domínio verificados — Frente D confirma disponibilidade).
- Protótipo de alta fidelidade da agenda e do portal do paciente, testado com ~5 pessoas de recepção.
- Base do design system (tokens) pronta para suportar multi-tenant/white label.
- Esses três itens entram na decisão de go/no-go da Fase 0 (§13.1, "Critério de go/no-go").

## 7. Próxima fase (preview): Fase 1

Em §13.2, você segue como um dos três responsáveis (com Vitor e João Pedro) pela entrega do MVP: motor de marca, área do paciente básica, trilha de consentimento/auditoria — ou seja, o design system criado na Fase 0 vai direto para produção, não é descartável.
