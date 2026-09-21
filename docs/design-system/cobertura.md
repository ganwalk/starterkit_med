# Cobertura das iniciativas

Mapa de cada iniciativa do documento de escopo para a tela que a implementa. Serve para responder "isso já existe?" sem abrir o protótipo, e para impedir que entre tela sem lastro no plano.

## Matriz de paridade (§4) — os 11 itens "Construir"

| Iniciativa | Fase | Tela | Estado |
| --- | --- | --- | --- |
| Agenda na web e acesso remoto | 1 | `/agenda` | Construído |
| Área do paciente: agendamentos, confirmar/cancelar/alterar, pré-cadastro, pré-consulta, satisfação | 1–2 | `/portal` | Construído |
| Check-in por QR Code e fila da recepção | 2 | `/recepcao` | Construído |
| Confirmação por WhatsApp com status na agenda | 1 | `/agenda` + `/conversas` | Construído |
| Envio avulso de WhatsApp | 1 | `/conversas` | Construído |
| Envio de SMS e e-mail | 2 | — | Fora do protótipo (canal de reserva) |
| Bot 24h restrito a agendamento e logística | 2 | `/conversas` | Construído |
| Dashboards: agendamentos e faltas, atendimentos, faturamento | 1 | `/indicadores` | Construído |
| Financeiro básico: Pix, link, sinal | 1 | `/financeiro` | Construído |
| Treinamento, implantação e migração total | 1 | `/migracao` | Construído |
| Vídeos de ajuda por módulo | 2 | — | Fora do protótipo (conteúdo, não interface) |

## MVP (§13) — "o que entra"

| Item do MVP | Tela |
| --- | --- |
| Agenda própria completa, web e celular | `/agenda` |
| Cadastro único e funil da jornada com follow-up | `/pacientes` e `/funil` |
| Importadores e relatório de conciliação | `/migracao` |
| WhatsApp oficial, caixa compartilhada, transferência para humano | `/conversas` |
| Área do paciente com identidade da clínica | `/portal` |
| Pix, link de pagamento e sinal | `/financeiro` |
| Atribuição de origem do lead | `/funil` e `/indicadores` |
| Perfis de acesso, log de auditoria, exportação | `/seguranca` |
| Motor de marca: tema, domínio, templates, onboarding | `/marca` |
| Três dashboards + reativação de pacientes | `/indicadores` |
| Canal de suporte com triagem e plantão | `/suporte` |

**Cobertura: 11 de 11 itens do MVP têm tela funcional.**

## Pilares do produto (§11)

| Pilar | Onde aparece |
| --- | --- |
| **11.1 Agenda própria de alta qualidade** | `/agenda` — visões de dia, semana e mês; multiprofissional e multissala; status, encaixe, linha do horário atual, histórico de alterações, confirmação gravando na agenda |
| **11.2 Migração total com prova de fidelidade** | `/migracao` — contagem antes e depois por conjunto, itens não migrados com motivo, garantia de exportação na saída |
| **11.3 Atendimento 24 horas** | `/suporte` — SLA por severidade com barra de risco, escala de plantão, carga por sócio, gatilho de contratação |
| **Contrato transparente** | `/seguranca` — exportação sempre disponível; sem armadilha de saída |

## Regulatório (§8)

| Exigência | Onde é tratada |
| --- | --- |
| LGPD: consentimento separado para marketing, auditável | `/seguranca` e `/portal` |
| LGPD: clínica controladora, plataforma operadora | `/seguranca` |
| Migração de dado sensível: contrato antes do arquivo | `/migracao` |
| CFM 2.454/2026: IA restrita a logística, sem conduta clínica | `/conversas` |
| CFM 2.336/2023: travas de publicidade | `/seguranca` |
| Prontuário NGS2 | Marcado como fora do MVP em `/seguranca` |

## Fora do escopo do protótipo, de propósito

Seguem a decisão do documento, não um esquecimento:

- **Prontuário clínico certificado, TISS, estoque, laudos, módulo hospitalar** — §13 "MVP: o que fica de fora".
- **IA que sugere diagnóstico ou analisa exames** — §4 "Evitar por enquanto", pendente de parecer jurídico (decisão 8).
- **Painel de chamada em TV, financeiro completo, assinatura digital** — §4 "Adiar" ou "Integrar", fase 3.
- **SMS e e-mail, vídeos de ajuda** — fase 2; são canal e conteúdo, não decisão de interface.

## Fluxos completos

Além das telas, três fluxos ponta a ponta:

| Fluxo | Onde | O que faz |
| --- | --- | --- |
| **Novo agendamento** | `/agenda` | Busca ou cadastra paciente, escolhe profissional e tipo, oferece **horários livres calculados da agenda real**, pede sinal por Pix e confirmação por WhatsApp. O agendamento criado entra na grade |
| **Implantação de clínica** | `/marca` → aba Implantação | As cinco etapas do playbook (§13.2) com itens bloqueantes de go-live explicitados |
| **Pesquisa de satisfação** | `/portal` → agregado em `/indicadores` | Nota geral, notas por aspecto e comentário, com autorização de publicação **separada e desligada por padrão** |

## O que ainda falta

| Lacuna | Observação |
| --- | --- |
| Auditoria de teclado e leitor de tela | Registrado em `acessibilidade.md` |
| Visão de semana com múltiplos profissionais | Decisão consciente: ver `padroes.md` |
