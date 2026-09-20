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

Para o primeiro deploy funcionar, é preciso habilitar uma vez em
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

## O que há aqui

| Rota | O que mostra |
| --- | --- |
| `/#/design-system` | Tokens, escala tipográfica, elevação e todos os componentes |
| `/#/agenda` | Agenda multiprofissional da recepção — o núcleo do produto (§11.1 do escopo) |
| `/#/portal` | Portal do paciente com a marca da clínica aplicada |

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

- [`docs/design-system/direcao-visual.md`](docs/design-system/direcao-visual.md) — de onde vem cada decisão visual
- [`docs/armando/de-para-escopo.md`](docs/armando/de-para-escopo.md) — o que o escopo endereça ao Armando
- [`docs/decisoes/`](docs/decisoes/) — registro de decisões
