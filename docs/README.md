# Documentação do projeto

Fonte da verdade de escopo: `../CRM white label premium para médicos_ relatório e plano de ação (Level) v2.md` (raiz do repo). Este diretório traduz aquele documento em planos executáveis e registra decisões conforme forem tomadas — nada aqui substitui o documento de escopo, só o desdobra em trabalho.

## Estrutura

- [`armando/de-para-escopo.md`](./armando/de-para-escopo.md) — todo trecho do escopo endereçado ao Armando, mapeado para ações.
- [`armando/plano-fase-0.md`](./armando/plano-fase-0.md) — checklist executável das Frentes A e F (Fase 0) que são responsabilidade do Armando.
- [`design-system/README.md`](./design-system/README.md) — plano do design system white label e do protótipo de alta fidelidade (entrega da Frente F).
- [`decisoes/README.md`](./decisoes/README.md) — log de decisões, espelhando §15 do escopo. Uma decisão = um arquivo, criado quando alguém for fechá-la ou revisá-la.

## Convenção daqui pra frente

- Toda decisão de produto, negócio ou técnica vai para `docs/decisoes/`, no formato descrito em `docs/decisoes/README.md`.
- Todo plano de fase/frente de trabalho vira um `.md` próprio (por dono ou por frente), referenciando a seção correspondente do documento de escopo em vez de duplicar o texto.
- Quando um plano vira código (ex.: design system implementado), o `.md` correspondente passa a apontar para o diretório de código em vez de descrever o trabalho a fazer.
