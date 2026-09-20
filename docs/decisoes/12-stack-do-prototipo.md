# 12. Stack do design system e do protótipo

- **Status:** decidido
- **Responsável:** Armando
- **Fase para fechar:** 0 (Frente F)
- **Origem:** decisão nova, não prevista no documento de escopo

## Contexto

A Frente F pede "protótipo de alta fidelidade" e "tokens de tema para o modelo white label" (§13.1). Duas saídas eram possíveis: prototipar em ferramenta de design (Figma) ou prototipar em código. O protótipo precisa provar a troca de marca por clínica em runtime — algo que em ferramenta de design vira cópia manual de tela por clínica.

## Decisão

Prototipar **em código**, com:

| Camada | Escolha | Motivo |
| --- | --- | --- |
| Build | Vite 7 | Build de segundos, sem configuração cerimonial |
| UI | React 19 + TypeScript | O MVP da Fase 1 será construído nisto; o protótipo vira código de produção em vez de ser descartado |
| Estilo | Tailwind v4 com `@theme inline` | `inline` faz o utilitário apontar para a CSS custom property em vez de copiar o valor, que é exatamente o que permite trocar de marca sem rebuild |
| Tokens | CSS custom properties em 3 camadas | Primitivas → semântica → marca por clínica |
| Tipografia | Manrope via `@fontsource-variable` | Auto-hospedada, ver consequência abaixo |
| Ícones | HugeIcons | Traço fino consistente com a direção visual |
| Roteamento | React Router com `HashRouter` | GitHub Pages não tem fallback de rota para SPA; com hash, atualizar a página nunca dá 404 |
| Publicação | GitHub Actions → GitHub Pages | Cada push na branch publica |

## Alternativas consideradas

- **Figma:** melhor para explorar forma, pior para provar comportamento. A troca de marca viraria N cópias de tela, e o teste de usabilidade com a recepção mediria um clickthrough, não a densidade real da agenda.
- **Storybook:** documentação de componentes boa, mas exigiria um segundo build e uma segunda URL. A própria página de design system cumpre o papel com menos peça móvel.
- **Base white label pronta (tipo HighLevel):** já descartada para o produto em §9 do escopo pelos mesmos motivos — agenda própria e importadores são pilares que uma base genérica não entrega.

## Consequências

- **A fonte é auto-hospedada, não via Google Fonts.** Além de evitar FOUT, isso impede que o dispositivo do paciente faça requisição a um terceiro a cada acesso ao portal. Num produto que trata dado de saúde sob LGPD (§8 do escopo), não vazar IP de paciente para um terceiro é o padrão certo desde o primeiro commit.
- **O `base` do Vite está fixado em `/starterkit_med/`**, que é o nome do repositório. Se o repositório for renomeado ou ganhar domínio próprio, ajustar `vite.config.ts` (a variável de ambiente `VITE_BASE` sobrescreve).
- **Existe um contorno para um bug do HugeIcons** em `vite.config.ts`: a versão 4.3.4 grava os ícones `Grid_x_` com X maiúsculo mas os importa com x minúsculo, o que passa em macOS e quebra em Linux/CI. O contorno corrige o case na resolução, em vez de editar `node_modules` (que não sobreviveria a um `npm ci`). Remover quando o upstream corrigir.
- O protótipo não é descartável: os componentes de `src/ds/` são a base do que a Fase 1 vai usar em produção.
