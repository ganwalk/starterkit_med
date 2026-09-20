# CRM white label para clínicas — design system e protótipo

Design system white label e protótipo de alta fidelidade da agenda e do portal do paciente.
Entrega da **Frente F da Fase 0** do plano de ação (ver `docs/`).

> **Aurora é um codinome de trabalho.** O nome definitivo do produto é a decisão 5 e ainda está
> aberta — trocar o nome hoje significa mudar `src/tenant/tenants.ts` e nada mais.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicação

Cada push publica em **https://ganwalk.github.io/starterkit_med/** pelo workflow
`.github/workflows/deploy.yml`.

> **Passo manual, uma única vez:** habilitar em
> **Settings → Pages → Build and deployment → Source: GitHub Actions**.
>
> Enquanto isso não for feito, o workflow falha em `configure-pages` com
> `Not Found`. Não dá para automatizar: criar o site do Pages exige permissão de
> administração do repositório, e o `GITHUB_TOKEN` do workflow não a recebe
> (`Resource not accessible by integration`). Depois de habilitado, todo push
> publica sozinho.

## O que há aqui

**App da recepção** (navegação lateral):

| Rota | Iniciativa do escopo |
| --- | --- |
| `/#/agenda` | Agenda multiprofissional — núcleo do produto (§11.1) |
| `/#/recepcao` | Check-in por QR Code e fila de espera (§4) |
| `/#/pacientes` | Cadastro único e reativação (§13) |
| `/#/conversas` | WhatsApp oficial, caixa compartilhada e bot (§13, §8) |
| `/#/funil` | Jornada do lead ao comparecimento (§13) |
| `/#/indicadores` | Os três painéis do MVP mais reativação (§4) |
| `/#/financeiro` | Pix, link de pagamento e sinal (§4) |
| `/#/migracao` | Migração total com relatório de conciliação (§11.2) |
| `/#/marca` | Motor de marca white label (§9) |
| `/#/suporte` | SLA por severidade e escala de plantão (§11.3) |
| `/#/seguranca` | Perfis de acesso e log de auditoria (§8) |

**Fora do app:**

| Rota | O que é |
| --- | --- |
| `/#/portal` | Portal do paciente, com a marca da clínica |
| `/#/design-system` | Tokens, escala e componentes |

Use o seletor de clínica no topo para trocar a marca, e o botão de tema para claro/escuro.
Nenhum componente muda de forma ao trocar: só o acento muda de dono.

## Arquitetura de tokens

Três camadas, e só a última varia por clínica:

```
src/styles/tokens.css   camada 1: primitivas (neutros, escala, raio, sombra)
                        camada 2: semântica  (surface-*, text-*, status-*)
src/styles/themes.css   camada 3: marca por clínica ([data-tenant])
```

Trocar de clínica reescreve um atributo no `<html>`. Nenhum componente conhece clínica nenhuma
— é o "customização vira parâmetro, nunca fork" da §9 do documento de escopo.

## Estrutura

```
src/ds/          componentes do design system
src/pages/       as três telas
src/tenant/      catálogo de clínicas e troca de marca em runtime
src/data/        dados de exemplo da agenda
docs/            direção visual, planos e registro de decisões
```

## Documentação

Índice completo em [`docs/design-system/`](docs/design-system/README.md).

- [`direcao-visual.md`](docs/design-system/direcao-visual.md) — de onde vem cada decisão visual
- [`fundamentos.md`](docs/design-system/fundamentos.md) — todos os tokens
- [`componentes.md`](docs/design-system/componentes.md) — anatomia e quando usar cada componente
- [`padroes.md`](docs/design-system/padroes.md) — padrões de tela e densidade
- [`acessibilidade.md`](docs/design-system/acessibilidade.md) — regras vindas da auditoria
- [`cobertura.md`](docs/design-system/cobertura.md) — cada iniciativa do escopo e a tela que a implementa
- [`auditoria-ux.md`](docs/design-system/auditoria-ux.md) — resultado da auditoria medida
- [`docs/decisoes/`](docs/decisoes/) — registro de decisões

## Verificar acessibilidade

Com o dev server no ar:

```bash
node scripts/audit-ux.mjs
```

Mede contraste real, tamanhos de fonte, opacidades, alvos de toque, cortes de conteúdo e hierarquia de headings, em dois temas.
