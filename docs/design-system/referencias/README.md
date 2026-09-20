# Referências visuais

Lugar para juntar as referências antes de qualquer decisão de design. Enquanto este diretório estiver vazio, nenhum token (cor, tipografia, espaçamento, raio, sombra) deve ser definido — a ideia é que a direção visual venha daqui, não de um chute.

## Como entregar

Qualquer um dos três funciona:

1. **Arquivos** — jogue imagens (`.png`, `.jpg`, `.webp`) direto neste diretório. Sugestão de nome: `<origem>-<tela>.png`, ex.: `linear-dashboard.png`, `cal-com-agenda.png`.
2. **Links** — liste em `links.md` neste mesmo diretório (crie se não existir), com uma linha do que te chamou atenção em cada.
3. **Figma** — se as referências já estiverem num board, o conector do Figma precisa ser autorizado em claude.ai antes de eu conseguir ler de lá.

## O que é mais útil coletar

Ordenado por impacto na decisão:

| Prioridade | Tipo de referência | Por quê |
| --- | --- | --- |
| Alta | **Agendas / calendários** (Cal.com, Google Agenda, Fantastical, softwares clínicos) | É o núcleo do produto (§11.1) e a tela que a recepção usa o dia todo — a densidade de informação daqui define metade do design system |
| Alta | **Portais / áreas do paciente** | É onde a marca da clínica aparece, o diferencial declarado em §12 |
| Alta | Produtos com **identidade forte mas white-label-ável** | O sistema precisa aguentar trocar de marca sem quebrar (§9); referências monomarca demais enganam |
| Média | **Dashboards** com 3–4 números | Os 3 painéis básicos do MVP (§4) |
| Média | Paletas, tipografia, referências de "premium" | Alimenta o token layer direto |
| Baixa | Concorrentes (PES, iClinic, Amplimed) | Já mapeados em §3 e §4 — servem de contraponto ("não fazer assim"), não de inspiração |

Para cada referência, vale anotar **o que especificamente** te agradou (densidade? hierarquia? cor? espaçamento? movimento?) — é isso que vira token, não a tela inteira.

## Depois que as referências chegarem

1. Extrair direção visual (3–5 adjetivos + o que rejeitamos).
2. Definir tokens primitivos e semânticos → registrar em `docs/decisoes/`.
3. Só então componentes e telas.
