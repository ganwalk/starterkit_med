# Design System + Protótipo de Alta Fidelidade — plano de trabalho

Destrincha a entrega da Frente F (`docs/armando/plano-fase-0.md`) em um plano técnico. Vive neste diretório enquanto o design system for só planejamento; quando o build começar, o código entra em `packages/design-system` (ou equivalente) e este README passa a apontar para lá.

## Objetivo

Um design system **white label multi-tenant** (§9 do escopo: "customização vira parâmetro — logo, paleta, tipografia, domínio, textos, fluxos — pedido fora do parâmetro vira módulo pago, nunca fork") que sustente:
1. O protótipo de alta fidelidade da **agenda** e do **portal do paciente** (Fase 0).
2. A implementação real do MVP na Fase 1 (§13.2) — o mesmo sistema, não um descartável.

## Escopo de componentes (derivado de §11.1 e §4)

| Área | Componentes previstos | Fase de uso |
| --- | --- | --- |
| Agenda | Calendário (dia/semana/mês), cartão de agendamento, seletor de profissional/sala, status do paciente, bloco de bloqueio/encaixe, modal de confirmação WhatsApp | Fase 0 (protótipo) → Fase 1 (produção) |
| Portal do paciente | Lista de agendamentos, ação confirmar/cancelar/alterar, tela de identidade da clínica (logo/cor aplicados), pré-cadastro | Fase 0 (protótipo) → Fase 1 (básico) → Fase 2 (completo: pré-consulta, pesquisa de satisfação, check-in QR) |
| Motor de marca | Tema por tenant (tokens), aplicação de domínio próprio, templates de mensagem | Fase 1 |
| Dashboards | 3 painéis básicos (agendamentos/faltas, atendimentos, faturamento) | Fase 1 |

Fora de escopo do design system por ora (§4, itens "Adiar"/"Evitar"): painel de chamada em TV, prontuário, TISS, laudos, IA diagnóstica.

## Tokens de tema (base do white label)

Definir nesta fase, mesmo antes de qualquer ferramenta escolhida:
- Cor (paleta primária/secundária/neutra, com contraste acessível por tenant)
- Tipografia (família + escala)
- Espaçamento/grid
- Logo (slots e proporções aceitas)
- Domínio (subdomínio vs. domínio próprio por clínica)
- Textos/copy customizável (templates de mensagem, nomes de fluxo)

## Decisões técnicas em aberto

- [ ] Ferramenta de prototipagem (Figma é o padrão de mercado; conector Figma listado nesta sessão ainda não está autorizado — ver nota abaixo).
- [ ] Stack de implementação do design system real (fica para o início da Fase 1, alinhado com Vitor — arquitetura multi-tenant é decisão dele em §13.1 Frente C).
- [ ] Biblioteca de ícones/ilustração — nenhuma decisão tomada ainda.

> Nota: este ambiente tem um conector do Figma listado, mas ele ainda não foi autorizado (precisa de login em claude.ai). Se o plano for trabalhar tokens/protótipo direto no Figma a partir daqui, será preciso autorizar o conector primeiro nas configurações do claude.ai.

## Teste de usabilidade (Frente F)

- Público: ~5 pessoas de recepção (não médicos — "o usuário diário é a recepção", risco citado em §12).
- Foco: fluxo de agenda (uso diário) e portal do paciente (visão do que a recepção precisa configurar/monitorar).
- Reaproveitar parte dos contatos recrutados na Frente A.

## Próximos passos

1. Fechar naming e tokens básicos (semana 2).
2. Wireframes de baixa fidelidade da agenda e portal (semana 2–3).
3. Subir para alta fidelidade (semana 3).
4. Rodar teste de usabilidade e iterar (semana 4).
5. Documentar a versão final dos tokens e componentes aqui, com decisão registrada em `docs/decisoes/`.
