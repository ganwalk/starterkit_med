# Padrões de tela

Como as peças se combinam. Se dois desenvolvedores resolverem o mesmo problema de formas diferentes, é aqui que falta regra.

---

## Densidade: a decisão mais importante do sistema

As referências visuais são peças de dashboard: pouca informação, muito respiro. A agenda é o oposto — alguém olha 8 horas por dia e precisa de muitos agendamentos de uma vez.

**Adotamos a linguagem das referências (raio, sombra, peso de fonte, cor em dose mínima) e variamos a densidade por contexto:**

| Contexto | Densidade | Padding de card | Corpo |
| --- | --- | --- | --- |
| Agenda, tabela, fila | Alta | `compact` (16px) | 13px |
| Painel, indicador, configuração | Média | `comfortable` (24px) | 15px |
| Portal do paciente | Baixa | `comfortable` + respiro extra | 15px |

O usuário diário é a recepção, não o médico — é um risco registrado em §12 do escopo, e a densidade é a resposta de interface a ele.

---

## Estrutura de tela do app

```
PageBody
  PageHeader      título + resumo + ações
    (opcional)    Stepper ou Tabs
  Toolbar         busca e filtros
  Conteúdo        Card / Table / quadro
  Sheet           detalhe do registro selecionado
```

Toda tela do app segue isso. O `PageHeader` e o `PageBody` garantem que largura máxima, respiro e altura de cabeçalho sejam iguais em todas.

### Regras do cabeçalho

- **Uma** ação `accent` por tela. Se parecem existir duas ações principais, uma delas é secundária.
- O `resumo` carrega o que o título não diz — número de registros, contexto, origem. **Nunca repete o título.**
- Ações secundárias usam `subtle`, na ordem: menos destrutiva primeiro.

---

## Listas e tabelas

- Ordene pelo que **importa para a ação**, não pelo que é fácil. A fila da recepção ordena por tempo de espera, não por horário marcado. A fila de suporte ordena por risco de SLA, não por chegada.
- Coluna numérica sempre `numerico: true` (alinhada à direita, numeral tabular).
- A tabela rola dentro do próprio container em tela estreita. A página nunca rola no eixo X.
- Linha clicável abre `Sheet` lateral. Nunca navegue para outra página por causa de um detalhe.
- Toda lista tem `EmptyState` com **próximo passo**, não só "nada aqui".

---

## Estados

Toda tela que carrega dado tem quatro estados, e os quatro são desenho:

| Estado | Componente |
| --- | --- |
| Carregando | `Skeleton` na forma do conteúdo final |
| Vazio | `EmptyState` com ação |
| Erro | `Alert` com `tone="danger"` e o que fazer |
| Preenchido | O conteúdo |

Um estado vazio sem ação é um beco sem saída.

---

## Alerta e prioridade

`Alert` é para informação **persistente e contextual** — não é notificação efêmera.

| Tom | Quando |
| --- | --- |
| `danger` | Algo quebrou ou vai quebrar agora (SLA estourando) |
| `warning` | Exige ação, mas não agora (lead parado, itens não migrados) |
| `info` | Contexto que evita erro (limites do bot pela CFM) |
| `success` | Confirmação de algo que já deu certo |

Quando o alerta pede ação, ele carrega o botão. Alerta sem saída é ruído.

---

## Formulário

- Sempre dentro de `Field` — é o que amarra `<label>` ao controle.
- `hint` explica o formato **antes** do erro acontecer.
- `error` substitui o `hint`; nunca mostre os dois.
- Agrupe em `sm:grid-cols-2`; campos longos ocupam a linha inteira.
- `Switch` só quando o efeito é imediato. Se depende de "Salvar", é checkbox.

---

## Marca da clínica

| Superfície | Quanto de marca |
| --- | --- |
| App da recepção | Só a ação principal e destaques pontuais |
| Portal do paciente | **Zona de marca grande**: gradiente, nome, logo |
| Mensagens do WhatsApp | Nome e tom da clínica |

O app é ferramenta de trabalho: campo grande de cor saturada cansa em jornada de 8 horas. O portal é a vitrine da clínica para o paciente, e é onde o diferencial contra a interface padrão dos concorrentes aparece (§4).

---

## Navegação

- Sidebar fixa no desktop, gaveta no celular. A gaveta fecha ao navegar.
- Grupos da navegação seguem o **modelo mental da clínica** (Operação, Crescimento, Plataforma), não a arquitetura do código.
- Item ativo em preto — funciona igual em qualquer marca.
- Cada item de navegação registra em `navigation.ts` a seção do escopo que o originou. **Tela sem lastro no plano não entra.**

---

## Escrita de interface

- Português claro, sem jargão de produto. "Faltou", não "no-show", na interface voltada à recepção.
- Rótulo de botão é **verbo de ação**: "Confirmar presença", não "OK".
- Sem eyebrow desnecessária. Só quando carrega o que o título não diz — o nome da clínica acima do nome do paciente é o caso legítimo.
- Número sempre com unidade ou contexto: "18,4%" sozinho não diz nada; "18,4% · baseline das entrevistas: 19,2%" diz.
