# Design System

Sistema de interface white label para o CRM de clínicas. Uma base de código, N clínicas.

| Documento | O que contém |
| --- | --- |
| [`direcao-visual.md`](./direcao-visual.md) | De onde veio cada decisão visual, e o que foi rejeitado |
| [`fundamentos.md`](./fundamentos.md) | Tokens: cor, tipografia, espaço, raio, elevação, opacidade, movimento |
| [`componentes.md`](./componentes.md) | Todos os componentes: anatomia, variantes, quando usar e quando não |
| [`padroes.md`](./padroes.md) | Padrões de tela: layout, densidade, estados, navegação, formulário |
| [`acessibilidade.md`](./acessibilidade.md) | Regras vindas da auditoria e como verificá-las |
| [`cobertura.md`](./cobertura.md) | Mapa de cada iniciativa do escopo para a tela que a implementa |
| [`auditoria-ux.md`](./auditoria-ux.md) | Resultado da auditoria medida no navegador |
| [`referencias/`](./referencias/) | As referências visuais que originaram a direção |

## A regra que sustenta tudo

O sistema tem **três camadas, e só uma varia por clínica**:

| Camada | Varia? | Onde vive |
| --- | --- | --- |
| Primitivas — escala de neutros, tipografia, espaço, raio, sombra | Não | `src/styles/tokens.css` |
| Semântica — `surface-*`, `text-*`, `border-*`, `status-*` | Só por tema (claro/escuro) | `src/styles/tokens.css` |
| Marca — `--accent` e derivados, logo, domínio | **Sim, por clínica** | `src/styles/themes.css` |

Trocar de clínica reescreve **um atributo** no `<html>`. Nenhum componente conhece clínica nenhuma. É o "customização vira parâmetro, nunca fork" da §9 do escopo, executado literalmente.

**A descoberta que torna isso possível:** o estado ativo é **preto**, não a cor da marca. Seleção, navegação ativa e foco de item funcionam igual em qualquer clínica, então a densidade da agenda não depende de quem é o dono da marca. Se o ativo usasse o acento, cada clínica precisaria de ajuste fino de contraste.

## Onde a marca aparece grande

Apenas no **portal do paciente**. No app da recepção, a cor da clínica fica restrita à ação principal e a destaques pontuais — uma pessoa que olha a tela 8 horas por dia não deve encarar um campo de cor saturada. A decisão está registrada em `direcao-visual.md`.

## Estrutura do código

```
src/styles/tokens.css   primitivas + camada semântica + tema escuro
src/styles/themes.css   marca por clínica
src/ds/                 componentes (o design system em si)
src/app/                shell de navegação e troca de marca
src/pages/              as telas da plataforma
src/data/               dados de exemplo
```

## Como manter

1. **Nenhum valor cru na UI.** Cor, espaço, raio e opacidade vêm de token. Se você precisa de um valor que não existe, o token é que está faltando.
2. **Nenhum componente conhece clínica.** Se um componente precisa de `if (tenant === ...)`, a abstração está errada.
3. **Toda mudança em neutro é medida nos dois temas.** A auditoria mostrou que escurecer um neutro para corrigir o tema claro reprova o escuro.
4. **Rode a auditoria antes de entregar:** `node scripts/audit-ux.mjs` com o dev server no ar.
