# **CRM white label premium para médicos**

**Relatório de mercado, decisões e plano de ação para a Level, versão 5**  
Foco inicial: Goiânia, com arquitetura escalável. Atualizado em 20/09/2026.

**O que muda nesta versão:** explica o que é cada fase do projeto. Entram o roadmap resumido logo após o resumo executivo, o plano de ação detalhado por fase (seção 13, com a fase 0 dividida em frentes de trabalho, entregas e critério de go/no-go), a ligação entre as decisões pendentes e as fases, um glossário e a correção do cronograma, que agora é sequencial (na v4 as fases 0 e 1 se sobrepunham). O restante do conteúdo segue a v4: decisões registradas (seção 15), modelo de cobrança (seção 10\) e pilares do produto (seção 11). A seção 16 lista as limitações da pesquisa.

## **Resumo executivo**

---

O mercado de sistemas para clínicas é grande e maduro, e as reclamações recorrentes são de suporte, implantação, integrações frágeis e contratos rígidos. Esses pontos casam com o que a Level já vende: design, engenharia, direito e gestão num time só, com processo do diagnóstico ao lançamento.  
**Tese atualizada:** a Level vende uma plataforma moderna e bonita, com a marca de cada clínica, construída sobre quatro pilares:

> 1. **Agenda própria de alta qualidade**, como núcleo do produto, em vez de depender da agenda de terceiros.  
> 2. **Migração total de dados** a partir do sistema que o médico já usa, com relatório de conciliação verificável.  
> 3. **Atendimento 24 horas**, com SLA por severidade, contra os horários comerciais e as respostas de mais de 15 dias dos concorrentes.  
> 4. **Contrato transparente**: preço fixo por clínica em faixas, sem permanência mínima abusiva, trava de reajuste e exportação de dados garantida.

Os achados de mercado que sustentam isso:

> * **Existe um concorrente local com 33 anos de mercado.** A PES, de Goiânia, vende o Doctor's Office desde 1993 e já oferece IA, bot de agendamento 24h, área do paciente, dashboards e TISS. Competir em quantidade de funções seria um erro.  
> * **Migração existe como serviço, então o diferencial está na profundidade.** O iClinic oferece migração gratuita e a PES oferece conversão de dados. A Level precisa se diferenciar por escopo, garantia, prazo e prova de fidelidade.  
> * **A camada de IA no WhatsApp está lotada**, com preços a partir de R$ 547 por agenda. Preço por clínica, go-live rápido e IA de agendamento já são requisito.  
> * **Não começar por prontuário certificado.** Começar pela agenda, pelo relacionamento e pela receita, com site e automação como porta de entrada.

**Sobre as fontes:** boa parte dos comparativos e preços vem de fornecedores concorrentes, e o Reclame AQUI tende ao negativo. Trate os números como referência e confirme nos sites oficiais. Itens marcados como hipótese precisam de validação em campo. As faixas de preço da seção 10 são hipóteses de trabalho a serem testadas na fase 0\.

## **Roadmap em resumo: as quatro fases**

---

Este documento cita as fases 0, 1, 2 e 3 em várias seções. Esta tabela mostra o que cada uma é. O detalhamento, com atividades, entregas e critérios para avançar, está na seção 13\.

| Fase | Nome | Objetivo em uma frase | Principal entrega | Como saímos dela |
| :---- | :---- | :---- | :---- | :---- |
| 0 | Validação | Confirmar, antes de construir, que o problema, o preço, a viabilidade técnica e o enquadramento jurídico se sustentam | Entrevistas, testes de concorrentes, protótipo, parecer jurídico, preço validado e 5 clínicas parceiras | Decisão de go/no-go |
| 1 | Porta de entrada e MVP | Colocar a primeira versão em uso real em 2 clínicas e começar a gerar receita | Agenda própria, WhatsApp oficial, área do paciente básica, importadores, suporte 24h em piloto | 2 clínicas migradas e usando por 30 dias |
| 2 | Pilotos | Provar valor com números em 3 a 5 clínicas e completar o produto | Produto completo do MVP ampliado, playbook de implantação e primeiro caso publicável | Melhora medida de no-show e retenção dos pilotos |
| 3 | Escala | Crescer com segurança, integrações e decisões estruturais | Teste de invasão, integrações com parceiros, decisão sobre prontuário, expansão | Retenção e margem que sustentem o suporte 24h |

### **O que é a fase 0, em resumo**

A fase 0 é o primeiro mês do projeto, dedicado a validar antes de construir. Não é só pesquisa: produz decisões (preço, escopo da migração, prontuário, especialidade inicial), um parecer jurídico, um protótipo testado e uma lista de clínicas comprometidas com o piloto. Ela termina com um go/no-go, isto é, a decisão explícita de seguir para a construção, ajustar o plano ou parar. As vendas de site e automação da Level podem continuar em paralelo, porque geram receita e relacionamento com clínicas.  
**Por que não pular direto para a construção:**

> * O preço, o suporte 24h e a migração total são promessas caras. Se o preço não cobrir o custo do plantão, o modelo não fecha.  
> * Migrar dados depende de os sistemas de origem permitirem exportação, o que só um teste real confirma.  
> * Há decisões pendentes (prontuário, parecer jurídico, divisão de lucros) que mudam o escopo do MVP.

## **1\. Ponto de partida: o que a Level tem e o que falta**

---

O site da Level descreve quatro frentes (design de produto, engenharia de software, direito e compliance, gestão e escala) e seis serviços. O processo tem cinco etapas: diagnóstico, design, engenharia, compliance, lançamento e escala. Projetos são orçados sob consulta.

| Necessidade do CRM | Quem na Level | Lacuna a cobrir |
| :---- | :---- | :---- |
| Design system white label, portal do paciente, usabilidade para a recepção | Armando (Design Engineer) | Nenhuma relevante |
| Arquitetura multi-tenant, agenda, importadores de dados, WhatsApp oficial, segurança | Vitor (Engenharia de Software) | Segurança e infraestrutura dedicadas, teste de invasão por terceiro |
| LGPD, contratos, propriedade intelectual, publicidade médica | João Pedro (Direito & Compliance) | Parecer de especialista em direito médico, CFM e SBIS |
| Modelo de negócio, implantação, escala | Diogo (Gestão & Escala) | Suporte 24h e customer success: não existem na equipe |
| Conhecimento clínico e vendas para médicos | Ninguém | Médico assessor ou parceiro, e alguém para vender |

> * O site da Level é genérico ("empresas que não têm tempo a perder") e não mostra casos nem experiência em saúde. O primeiro piloto precisa virar caso publicável. A marca do produto será separada da Level (seção 15), então o site da Level pode ser a vitrine de serviços e o produto ter identidade própria.  
> * O site está em um endereço github.io, enquanto o e-mail usa levelagencia.com.br. Para lidar com dado de saúde, vale ter o domínio próprio no ar, tanto para a Level quanto para a marca do produto.

## **2\. Mercado**

### ---

**Categorias e preços**

> * **Gestão com prontuário (Feegow, iClinic, Amplimed, Clinicorp, Shosp, ProDoctor, PES/Doctor's Office):** planos de R$ 89/mês por profissional (plano de entrada da Amplimed) a R$ 499/mês fixos (Clínica nas Nuvens Essencial), segundo comparativo de um concorrente. O iClinic tem plano Premium de R$ 299 por profissional/mês com teleconsulta ilimitada. Um guia do setor cita faixas de R$ 50 a 130 (básico), R$ 130 a 280 (intermediário) e R$ 280 a 600 por usuário (completo), com custo realista de R$ 200 a 500/mês mais R$ 2.000 a 8.000 de entrada para consultório solo.  
> * **Preço fixo por clínica já existe:** a ByDoctor cobra R$ 147/mês, com profissionais ilimitados, WhatsApp nativo e teste de 30 dias sem fidelidade.  
> * **Marketplace com software (Doctoralia):** visibilidade online e avaliações de pacientes, integrado ao Feegow.  
> * **CRMs genéricos (Kommo, RD Station CRM, Agendor, Ploomes):** exigem adaptação manual do funil e das réguas à jornada do paciente e não têm integração nativa com agenda ou prontuário.  
> * **CRMs verticais (GeraCare, GestãoDS):** rastreiam o lead até o comparecimento e identificam pacientes que deixaram de retornar.  
> * **Camada de IA e WhatsApp sobre a agenda existente:** categoria nova e disputada, detalhada na seção 3.3.  
> * **White label já existe:** a Amplimed oferece app com logo, layout e cores da clínica na loja de apps. Plataformas de telemedicina white label, como a Medmark, prometem implantação em 7 a 15 dias. A Medora afirma implantar em 1 a 5 dias.

## **3\. Concorrentes analisados em detalhe**

### ---

**3.1 PES, Doctor's Office (pes.com.br): o concorrente local**

**Quem é:** a Programas & Soluções atua desde 1992 e lançou o Doctor's Office em 1993, apresentado como o primeiro programa comercial para a área médica em ambiente Windows no Brasil. A sede é em Goiânia (central 62 3286-5300, atendimento de segunda a sábado em horário comercial). Declara milhares de usuários no Brasil e no exterior.  
**Produtos:** três frentes. O Doctor's Office for Windows (licença instalada), o Doctor's Office versão Assinatura (novo) e o Doctor's Office Web, o MeuDoctors, para acesso remoto aos dados. Atende consultórios, clínicas e hospitais. A página inicial anuncia uma nova versão publicada em 17/09/2026.  
**Preço visível:** a página de compra mostra licença de R$ 1.301 para 1 computador, ou R$ 1.188 mais R$ 849 por computador adicional, e instalação remota opcional de R$ 145 por computador. Esse formato é de licença perpétua e a página pode estar defasada em relação à versão por assinatura, cujo preço não aparece.  
**Recursos da versão Assinatura** (texto da página e print completo, com telas de demonstração de cada módulo):

| Recurso | O que o site descreve |
| :---- | :---- |
| IA no atendimento | Acompanha a conversa médico e paciente, organiza dados no histórico, sugere hipóteses diagnósticas e exames, gera pedido com códigos TUSS, analisa exames em PDF ou escaneados e monta receita por ditado. |
| Área do paciente | Consulta agendamentos, receitas, pedidos e laudos. Confirma, cancela ou altera agendamento. Check-in por QR Code, pré-cadastro, pré-consulta e pesquisa de satisfação. A clínica escolhe o que aparece. |
| Check-in e fila | Cinco formas de check-in, lista de espera da recepção e painel de chamada em TV. |
| Dashboards | Três painéis iniciais (agendamentos, atendimentos, faturamento) e criação de painéis com indicadores ilimitados. |
| WhatsApp | Confirmação automática com status na agenda. O pagamento dos envios é feito direto com a Meta, o que reduz o custo. |
| Bot / secretária virtual 24h | Atende mensagens, informa médicos, convênios e horários livres, confirma, cancela e reagenda, com suporte a áreas de atuação do médico. |
| Administrativo e clínico | Financeiro com conciliação bancária, estoque, faturamento, guias TISS, laudos (ultrassom, endoscopia, raios-X), receitas com certificado digital, teleconferência com até 3 participantes. |
| Serviços | Treinamentos, instalação, demonstração online, conversão de dados e programa de revendas (página não verificada). |

**Forças:** 33 anos de mercado, presença local em Goiânia, cobertura funcional ampla (inclusive hospital e TISS), IA e bot já entregues, conversão de dados oferecida, vídeos de demonstração de cada módulo.  
**Leituras e lacunas (hipóteses a validar):**

> * O produto nasceu como software instalado, e a versão por assinatura e a web parecem uma transição. Isso pode significar diferenças de experiência entre versões.  
> * Os recursos novos ficam disponíveis só para assinantes, então parte da base instalada pode não ter acesso a eles.  
> * Nas telas de demonstração, a área do paciente e o check-in aparecem com interface padrão do produto, sem sinal de identidade visual própria por clínica. O site também não mostra preço da assinatura nem casos com números de resultado.  
> * O suporte é anunciado em horário comercial de segunda a sábado. O atendimento 24h da Level contrasta diretamente com isso.  
> * Recursos de IA que sugerem hipóteses diagnósticas e exames caem na área sensível da Resolução CFM 2.454/2026 (uso de IA como apoio registrado no prontuário, sem delegar comunicação de condutas). Vale observar como isso é tratado, tanto neles quanto no nosso produto.  
> * Não pesquisei reclamações da PES no Reclame AQUI. Fazer isso é passo da fase 0\.

**Implicação para a Level:** a PES é concorrente (decisão dos sócios). Sua base instalada com software antigo é um alvo natural para clínicas que querem uma experiência moderna com marca própria, e a migração total de dados a partir do Doctor's Office deve ser um dos importadores prioritários. Ir de frente contra a amplitude de funções não faz sentido.

### **3.2 Doctor IA (mydoctoria.com.br)**

O site é carregado em navegador e não expõe o conteúdo para leitura automática, e o domínio canônico (mydoctoria.ai) bloqueia acesso automatizado. O que foi possível confirmar é a descrição pública: um sistema de crescimento, gestão e relacionamento com pacientes usando IA aplicada à realidade de clínicas, consultórios e serviços de saúde, com foco em agendamento automático e atendimento 24h.  
Não foi possível verificar preços, recursos, integrações nem clientes. **Recomendação:** abrir o site manualmente, solicitar demonstração e registrar planos, prazos de implantação, forma de contrato, integrações com agendas e política de dados (tarefa da frente B da fase 0). Enquanto isso, tratar como integrante da categoria de IA para WhatsApp descrita abaixo.

### **3.3 Outros fornecedores de IA e WhatsApp para clínicas**

| Fornecedor | Como se posiciona | Ponto de atenção para a Level |
| :---- | :---- | :---- |
| Clinia | Plataforma de comunicação e IA para clínicas e hospitais, com API oficial do WhatsApp. Não substitui o sistema de gestão, conecta-se aos principais ERPs. | Mostra que o modelo "camada por cima do sistema atual" é aceito. Depende de integrações. |
| App Health (IA) | IA de atendimento no WhatsApp e transcrição por voz, integrada ao próprio prontuário. Alega redução de no-shows. | Alegações de resultado de fornecedor, precisam de prova independente. |
| DocAssist | IA que atende 24h, faz follow-up, mostra a origem do paciente e afirma conformidade com o CFM. Entrega a IA treinada em até 24h. | Já combina atribuição de origem e follow-up, itens do nosso MVP. |
| Sou Vitória | IA no WhatsApp a R$ 547/mês por agenda, sem fidelidade. | Âncora de preço da categoria de IA pura. |
| Secretária IA | Configurada por clínica. Integra de graça com o Google Agenda e sob contratação com sistemas que tenham API aberta. | Ilustra o gargalo: sem API aberta, a integração vira serviço caro. A agenda própria da Level evita essa dependência. |
| Docta IA, Atendente.ai | IA para agendar no WhatsApp e Instagram, com teste grátis. | Produto de prateleira, sem marca da clínica. |

**Leitura:** quase todos vendem IA de atendimento. Poucos oferecem marca própria por clínica, portal do paciente com identidade da clínica e serviço de implantação com acompanhamento. Esse espaço é onde a Level pode entrar.

## **4\. Matriz de paridade com o Doctor's Office da PES**

---

Objetivo: ter no nosso produto o que a PES oferece onde isso importa para o paciente e para a recepção, sem clonar 33 anos de produto clínico e administrativo. Onde a PES é forte e a Level não quer competir, a decisão é integrar com quem já faz. Onde o risco regulatório é alto, a decisão é evitar até haver parecer jurídico. A coluna "Quando" indica a fase do roadmap.

| Recurso da PES | Decisão | Quando | Observação |
| :---- | :---- | :---- | :---- |
| Agenda na web e acesso remoto (MeuDoctors) | Construir (núcleo do produto) | Fase 1 | A agenda própria de alta qualidade é pilar do produto, com detalhes na seção 11\. |
| Área do paciente: agendamentos, confirmar/cancelar/alterar, pré-cadastro, pré-consulta, pesquisa de satisfação, a clínica escolhe o que mostrar | Construir | Fases 1 e 2 | É onde a marca da clínica aparece. Nas demonstrações da PES a interface é padrão do produto. |
| Área do paciente: receitas, pedidos de exame e laudos | Integrar | Fase 3 | Depende de quem gera o documento (prontuário ou parceiro). |
| Check-in por QR Code, tablet ou CPF, fila da recepção | Construir | Fase 2 | Começar por QR Code e recepção. Totem exige hardware. |
| Painel de chamada em TV | Adiar | Fase 3 | Baixo valor no início. |
| Confirmação por WhatsApp com confirmar, cancelar e remarcar, e status na agenda | Construir | Fase 1 | Obrigatório. Custo do WhatsApp repassado direto, como a PES faz. |
| Envio avulso de WhatsApp pela agenda ou ficha | Construir | Fase 1 | Com opt-in registrado. |
| Envio de SMS e e-mail | Construir | Fase 2 | Canal de reserva. |
| Bot 24h (horários livres, médicos, convênios, reagendar, áreas de atuação) | Construir, restrito a agendamento e logística | Fase 2 | Dentro do que a Resolução CFM 2.454/2026 permite. Também serve de primeira linha do suporte 24h. |
| Dashboards (agendamentos e faltas, atendimentos, faturamento) | Construir os 3 básicos | Fase 1 | Construtor de painéis livres na fase 3\. |
| Financeiro básico (Pix, link de pagamento, sinal) | Construir | Fase 1 | Ajuda a reduzir faltas. |
| Financeiro completo e conciliação bancária | Integrar ou adiar | Fase 3 | Fora do coração de um CRM. |
| Teleconsulta (até 3 pessoas, gravação) | Integrar com plataforma de telemedicina | Fases 2 e 3 | Gravação de vídeo exige cuidado de LGPD. |
| Treinamento, instalação, demonstração online, conversão de dados | Construir como serviço, com migração total como diferencial | Fase 1 | Seção 11 detalha o escopo e a garantia da migração. |
| Vídeos de ajuda por módulo | Construir | Fase 2 | Reduz chamados de suporte. |
| Assinatura com certificado digital, impressos e receita | Integrar com parceiro | Fase 3 | Exige ICP-Brasil, e receita digital tem regra própria. |
| Prontuário personalizável e histórico | Adiar ou parceiro | Fase 3 | Decisão do Vitor pendente (fase 0). Enquanto isso, histórico clínico migrado fica como arquivo somente leitura (seção 11). |
| Guias TISS e faturamento de convênio | Adiar | Fase 3 | Produto agnóstico, com campo de convênio previsto na agenda desde o início. |
| Estoque | Adiar | Fase 3 | Só se um cliente pedir. |
| Laudos de ultrassom, endoscopia e raios-X | Fora do escopo por ora | Depois | Só faz sentido se mirarmos clínicas de imagem. |
| IA que transcreve a consulta e preenche o histórico | Parceiro | Fase 3 | Consentimento de gravação e registro de uso de IA no prontuário. |
| IA que sugere hipóteses diagnósticas, exames e pedido com TUSS | Evitar por enquanto | Só com parecer jurídico | Zona sensível na Resolução CFM 2.454/2026. |
| IA que analisa exames enviados em PDF ou escaneados | Evitar por enquanto | Só com parecer jurídico | Mesmo motivo. |
| Módulo hospitalar | Fora do escopo | Nunca | Nosso alvo são consultórios e clínicas. |

### **Resumo da matriz (24 itens)**

> * **Construir:** 11 itens.  
> * **Integrar com parceiro:** 5 itens.  
> * **Adiar:** 4 itens.  
> * **Evitar por risco regulatório:** 2 itens.  
> * **Fora do escopo:** 2 itens.

### **Onde superar a PES nos mesmos recursos**

> * **Marca da clínica** na área do paciente, no bot e nas mensagens, em vez de uma interface padrão do produto.  
> * **Atendimento 24h**, contra o horário comercial de segunda a sábado que a PES anuncia.  
> * **Migração total com prova de fidelidade** e portabilidade de dados garantida.  
> * **Recursos disponíveis a todos os clientes**, já que a PES limita os recursos novos aos assinantes.

## **5\. Pontos fortes que já são o mínimo esperado**

> * ---

>   iClinic: prontuário personalizável, acesso em nuvem, assistente que indica risco de falta, resume prontuários e registra a consulta, migração gratuita.  
> * Shosp: faturamento de convênio, guias SP/SADT e controle de glosas.  
> * Feegow: plano gratuito até 100 pacientes.  
> * WhatsApp: 83% das clínicas usam para confirmar ou lembrar consultas. É requisito de entrada.  
> * IA de agendamento e transcrição: vários já entregam (PES, App Health, iClinic).

## **6\. Principais reclamações e o que significam para a Level**

### ---

**Suporte e implantação (ponto mais forte)**

| Sistema | Reclamações resolvidas | Tempo médio de resposta | Período |
| :---- | :---- | :---- | :---- |
| Feegow | 80,8% | 15 dias e 19 horas | maio a outubro de 2025 |
| iClinic | 74,4% | 19 dias e 19 horas | janeiro a junho de 2026 |
| Amplimed | 69,6% | 16 dias e 19 horas | agosto de 2025 a julho de 2026 |

> * Cliente do iClinic relata só encontrar IA no atendimento.  
> * Cliente da Amplimed relata ter parado de atender três vezes em um mês porque não há suporte depois das 18h.  
> * Cliente da Feegow diz que os treinamentos ao vivo são insuficientes e que não havia previsão para o de faturamento.

### **Estabilidade**

No iClinic, uma queda em 04/02/2026 causou atrasos de consultas, desistência de pacientes e prejuízo financeiro.

### **Integrações que quebram**

> 1. Horários livres no Feegow não aparecem no Doctoralia, e a clínica perde agendamentos mesmo pagando o serviço de mídia.  
> 2. Na Amplimed, a integração com a Memed apresenta erros, inclusive na assinatura digital.  
> 3. Uma reclamação diz que o pedido de acesso às APIs virou uma proposta para o próprio fornecedor desenvolver a integração. É risco direto ao plano de integrar com sistemas existentes, e também à migração automatizada.  
> 4. Lembrete que não grava de volta na agenda cria duas fontes de verdade em poucas semanas. Ter a agenda própria elimina esse problema na origem.

### **Comercial**

> * Doctoralia: relato de permanência mínima de 6 meses e cobrança durante a negociação do cancelamento, e de um único paciente vindo da plataforma em 3 meses no plano VIP.  
> * IA, TISS, assinatura digital e marketing costumam ficar fora do plano de entrada.  
> * Preço por profissional: quanto maior a equipe, mais cara a mensalidade.

### **Sinais internacionais (discussões de médicos e clínicas)**

Não foi possível abrir threads do Reddit. Estes pontos vêm de artigos que dizem resumir Reddit, Capterra e KLAS, um deles publicado por um fornecedor de prontuário. São sinais do mercado americano, não evidência direta.

> * Suporte pós-venda ruim é universal, inclusive suporte só por chatbot.  
> * Aumento de preço sem valor novo irrita. O plano de entrada do SimplePractice subiu 69%, enquanto o reajuste de cerca de 15 a 17% do TherapyNotes foi comunicado com antecedência e tolerado.  
> * Descontinuação de produto com aviso curto e exportação incompleta destrói confiança (caso Luminello, encerrado com cerca de dois meses de aviso).  
> * Renovação automática difícil de cancelar e custos escondidos aparecem em reclamações.  
> * Nicho e treino curto vencem: a Elation é elogiada por focar em atenção primária independente e treinar equipe nova em menos de duas horas.  
> * Um dono de consultório avisou no Reddit que trocar de sistema só vale se reduzir atrito, não apenas custo. A migração total sem esforço para o cliente ataca exatamente esse atrito.

## **7\. Goiânia**

> * ---

>   Goiânia tem 12.801 médicos, 60% do estado, com densidade de 8,67 por mil habitantes (Demografia Médica 2024). Outra fonte aponta 13.299 registrados. Trabalhe com a faixa de 12,8 a 13,3 mil.  
> * 55,8% dos médicos de Goiás são especialistas, e o estado tem 17 escolas médicas com 2.338 vagas anuais. Isso sugere fluxo constante de novos médicos abrindo consultório (leitura nossa).  
> * No-show: a média de absenteísmo é citada entre 20% e 30% em blogs de fornecedores. Um estudo brasileiro em consultas agendadas encontrou 19,2%. Medir nas clínicas entrevistadas.  
> * **Concorrente local mapeado:** PES/Doctor's Office (seções 3.1 e 4). Outros fornecedores locais ainda precisam de levantamento em campo.

## **8\. Regulatório: o que o produto precisa respeitar**

---

| Tema | O que vale | Implicação no produto |
| :---- | :---- | :---- |
| LGPD | Dado de saúde é sensível. A ANPD planeja ao menos dez ações de fiscalização até o fim de 2026 sobre dados de saúde, biometria e financeiros. Comunicação de incidente em até três dias úteis. | Consentimento separado para marketing, registrado de forma auditável. Plano de resposta a incidentes. Contrato de operação (clínica como controladora, Level como operadora). |
| Migração de dados de saúde | A migração total move dado pessoal sensível de um sistema para outro. Envolve o contrato com o fornecedor de origem, a guarda de documentos clínicos e a eliminação dos dados na origem. | Contrato de operação assinado antes de receber qualquer arquivo. Transferência criptografada, acesso restrito e registro de quem acessou. Política de eliminação dos arquivos de migração. Parecer sobre migração de histórico clínico e prazos de guarda (hipótese de tratamento como arquivo somente leitura, a validar com o jurídico). |
| Publicidade médica (CFM 2.336/2023) | Permite divulgar preço de consulta. Publicidade para ampliar clientela nas redes próprias. Depoimentos sóbrios, sem promessa de resultado. | Travas por padrão nas campanhas do CRM e nos sites das clínicas. |
| IA (CFM 2.454/2026) | Em vigor desde 26/08/2026. IA como apoio, registro do uso no prontuário, vedado delegar à IA a comunicação de diagnósticos ou condutas sem mediação humana. | Agente no WhatsApp restrito a agendamento e logística, com log de uso. Não oferecer sugestão diagnóstica sem parecer jurídico. |
| Prontuário | Eliminar o papel exige nível NGS2 com assinatura digital ICP-Brasil (Lei 13.787/2018 e normas do CFM). As fontes divergem sobre o selo SBIS ser obrigatório. | Fora do MVP. Pedir parecer de especialista antes de decidir. |
| WhatsApp | Desde 15/01/2026 a Meta proíbe IA de propósito geral na API. Chatbots de negócio (atendimento, agendamento) seguem permitidos. Bots de terceiros pagam por mensagem processada desde março (valor vem de blog, confirmar com a Meta). Há disputa em curso no CADE. | Usar API oficial, repassar o custo por mensagem, agente com propósito definido. |

## **9\. Modelo de negócio: agência versus produto**

---

A Level vende projetos sob consulta. O CRM é produto com receita recorrente. Se cada clínica virar um projeto customizado, a manutenção se multiplica por N clientes e a margem some.  
**Três camadas:**

> * **Implantação (receita de agência):** diagnóstico, marca aplicada, migração total de dados, treinamento e guia de uso. Cobrada como taxa única (seção 10).  
> * **Plataforma (receita recorrente):** licença por clínica em uma base única e multi-tenant. Customização vira parâmetro (logo, paleta, tipografia, domínio, textos, fluxos). Pedido fora do parâmetro vira módulo pago, nunca fork.  
> * **Serviço contínuo:** suporte 24h com SLA, otimização e consultoria de crescimento (frente Gestão & Escala). É o que sustenta o posicionamento premium.

### **Construir ou usar uma base white label existente**

CRMs white label como o HighLevel são revendidos por agências com logo, cores e domínio próprios. Como a agenda própria e os importadores de dados são pilares do produto, uma base genérica dificilmente entrega isso. Ainda assim, comparar na fase 0 o custo, os limites e a conformidade com LGPD e dados de saúde de uma base existente para as camadas de comunicação (onde ficam os dados, custo por mensagem, dependência do fornecedor). Não foi verificado se atendem esses requisitos.

### **Métricas de operação**

Discussões de revendedores white label destacam CAC, LTV, churn, tempo de implantação, volume de chamados por cliente e receita de expansão. Medir tudo desde o primeiro piloto, junto com tempo de migração e chamados fora do horário comercial.  
**Ponto jurídico central:** definir titularidade do código e da marca, formato de licença de uso e papéis na LGPD. Revisar cláusulas de propriedade intelectual e exclusividade dos vínculos atuais dos sócios antes de construir.

## **10\. Modelo de cobrança**

---

Faixas de trabalho, baseadas nas âncoras da pesquisa. São hipóteses a serem testadas com clínicas na fase 0, não preços validados.

### **Estrutura escolhida**

> * **Taxa única de implantação**, incluindo marca aplicada, migração total de dados, treinamento e guia de uso.  
> * **Mensalidade fixa por clínica, em faixas por número de profissionais**, com todos os recursos do plano incluídos e atendimento 24h em todas as faixas.  
> * **WhatsApp cobrado ao custo**, em linha separada na fatura ou pago direto à Meta pela clínica, sem margem nos primeiros contratos.  
> * **Sem permanência mínima abusiva.** Desconto para pagamento anual no lugar de fidelidade, trava de reajuste por 12 meses e exportação de dados garantida em qualquer cancelamento.

### **Faixas propostas**

| Plano | Profissionais | Mensalidade | Implantação (única) | Inclui |
| :---- | :---- | :---- | :---- | :---- |
| Solo | 1 | R$ 397 | R$ 2.500 | Agenda, área do paciente, WhatsApp, dashboards, marca própria, suporte 24h |
| Clínica | até 5 | R$ 897 | R$ 4.500 | Tudo do Solo, mais multiagenda e multissala, perfis de acesso da equipe e check-in |
| Clínica+ | até 12 | R$ 1.797 | R$ 8.000 | Tudo do Clínica, mais relatórios avançados, prioridade no suporte e gerente de conta |
| Rede | acima de 12 | Sob consulta | Sob consulta | Várias unidades, múltiplas marcas e integrações sob medida |

> * **Migração fora do padrão:** anos de histórico volumoso, papel digitalizado ou sistemas sem exportação organizada são orçados à parte, depois de um diagnóstico dos dados.  
> * **Desconto anual sugerido:** cerca de 15% (equivalente a dois meses), no lugar de fidelidade.  
> * **Por que faixas fixas por clínica:** respondem à reclamação de preço por cabeça sem virar preço único que não escala.

### **Como essa faixa se compara (mensalidade, ilustrativo)**

| Profissionais | Proposta Level | iClinic Premium (R$ 299 por profissional) | ByDoctor (R$ 147 fixos) |
| :---- | :---- | :---- | :---- |
| 1 | R$ 397 | R$ 299 | R$ 147 |
| 3 | R$ 897 | R$ 897 | R$ 147 |
| 5 | R$ 897 | R$ 1.495 | R$ 147 |
| 12 | R$ 1.797 | R$ 3.588 | R$ 147 |

**Leitura:** a Level fica premium para o profissional solo (cerca de 33% acima do iClinic Premium, justificado por marca própria, migração total e 24h), empata com o iClinic em 3 profissionais e fica bem abaixo em clínicas maiores. O ByDoctor é uma referência de preço de entrada com escopo muito menor, e os preços dos concorrentes variam entre fontes, então confirme antes de usar comparação em material comercial.

### **Como validar na fase 0**

> * Nas entrevistas, perguntar de que valor o produto começa a ficar caro demais e de que valor começa a parecer bom demais para ser verdade (método simples de sensibilidade de preço).  
> * Calcular o custo real de suporte 24h por clínica e a margem por faixa. Se a faixa Solo não sustentar o suporte, aumentar o preço ou limitar o suporte 24h a incidentes críticos nessa faixa.  
> * Testar se a taxa de implantação afasta clientes menores e, se sim, oferecer parcelamento.

## **11\. Pilares do produto**

### ---

**11.1 Agenda própria de alta qualidade**

A agenda é o núcleo que a recepção usa o dia todo. Ter a própria agenda elimina a dependência de APIs de terceiros e a duplicidade de fontes de verdade que aparece nas reclamações. O médico que já tem sistema próprio deixa de precisar de sincronização, porque migra a agenda para a Level, e o produto continua agnóstico a atendimento particular ou convênio, com campo de convênio previsto desde o início.  
**Requisitos da agenda (a detalhar com a recepção nas entrevistas da fase 0):**

> 1. Multiprofissional e multissala, visões de dia, semana e mês, e uso no celular.  
> 2. Tipos de consulta com duração própria, encaixes, bloqueios, lista de espera e retornos.  
> 3. Status do paciente (agendado, confirmado, chegou, em atendimento, faltou) e confirmação por WhatsApp gravando direto na agenda.  
> 4. Sinal e pagamento por Pix ou link, vinculados ao horário.  
> 5. Regras por profissional (horários, intervalos, antecedência mínima e máxima de agendamento).  
> 6. Agendamento online com a marca da clínica.  
> 7. Exportação e sincronização com calendários pessoais dos profissionais (por exemplo, Google Agenda).  
> 8. Histórico de alterações de cada agendamento (quem alterou, quando).

### **11.2 Migração total de dados como diferencial**

Migração já existe como serviço no iClinic (gratuita) e na PES (conversão de dados). Para ser diferencial, a Level precisa ser mais profunda e mais confiável, e provar isso.

| Elemento | O que oferecer |
| :---- | :---- |
| Escopo | Cadastro de pacientes, contatos, agenda passada e futura, financeiro, tags e anexos. Histórico clínico como arquivo consultável somente leitura, enquanto o prontuário próprio ou o parceiro não existir e depois do parecer jurídico. |
| Origens prioritárias | Feegow, iClinic, Amplimed, PES (Doctor's Office) e planilhas. A ordem final deve seguir o que as clínicas entrevistadas usam. |
| Prova de fidelidade | Relatório de conciliação entregue ao cliente, comparando contagens de pacientes, agendamentos e lançamentos financeiros antes e depois, com lista de itens que não puderam ser migrados e o motivo. |
| Sem parar a clínica | Período de operação em paralelo e virada em horário combinado, com plano de retorno se algo falhar. |
| Prazo | Compromisso de prazo por tamanho de base, definido depois de medir tempo real nos pilotos. |
| Saída sem armadilha | Exportação completa dos dados a qualquer momento e ao cancelar, no mesmo formato de entrada. |
| Segurança | Contrato de operação antes de receber arquivos, criptografia, acesso restrito e eliminação dos arquivos de migração ao final. |

**Riscos técnicos:** sistemas de origem podem não oferecer exportação organizada ou API (há reclamação de pedido de API respondido com proposta de desenvolvimento). A fase 0 deve incluir protótipos de importadores para as principais origens e um teste real com dados de uma clínica parceira. A decisão do Vitor sobre prontuário influencia o destino do histórico clínico.

### **11.3 Atendimento 24 horas**

Decisão dos sócios: oferecer atendimento 24h. É um forte contraste com os concorrentes (horário comercial, respostas de mais de 15 dias). Para ser sustentável, propõe-se:

| Severidade | Exemplos | Resposta proposta (hipótese) |
| :---- | :---- | :---- |
| Crítica | Agenda fora do ar, perda ou corrupção de dados, falha total do WhatsApp | Resposta humana em até 15 minutos, a qualquer hora |
| Alta | Recurso importante com defeito, mas com contorno possível | Resposta humana em até 1 hora |
| Normal | Dúvidas de uso, ajustes de configuração | Bot e base de ajuda imediatos. Resposta humana em até 4 horas em horário estendido, ou no próximo turno fora dele |

> * **Primeira linha:** chat com triagem automática (o mesmo bot restrito a logística e suporte) e base de ajuda com vídeos por módulo.  
> * **Plantão humano:** escala rotativa entre Armando, Diogo e João Pedro (reserva), com registro de ocorrências e revisão semanal.  
> * **Gatilho de contratação:** revisar a carga a cada 5 clínicas novas. Se a dedicação dos sócios for parcial, o plantão 24h sozinho não se sustenta por muito tempo, e o primeiro suporte dedicado ou terceirizado deve entrar antes da fase 3\.  
> * **Prevenção:** monitoramento, página de status e alertas para reduzir chamados críticos.  
> * **Custo:** o preço das faixas precisa financiar o suporte. Fechar a conta na fase 0\.

## **12\. Janelas de oportunidade (revisadas)**

---

| Janela | Evidência | Quem executa |
| :---- | :---- | :---- |
| Atendimento 24h e suporte humano como produto | Resolução de 70% a 81% e respostas em mais de 15 dias nos grandes. PES anuncia suporte em horário comercial. | Diogo, com rodízio de plantão |
| Migração total com prova de fidelidade | Migração existe como serviço (iClinic, PES), mas sem garantia de conciliação divulgada. O atrito da troca é o principal freio. | Vitor (importadores) e Diogo (implantação) |
| Agenda própria sem dependência de APIs | Reclamações de agenda divergente e APIs fechadas. | Vitor e Armando |
| Marca profunda por clínica (portal, mensagens, jornada) | O white label existente se resume a logo, layout e cores. A área do paciente da PES aparece com interface padrão. | Armando |
| Contrato transparente e portabilidade de dados | Reclamações de permanência mínima, cobrança pós-cancelamento e casos de descontinuação. | João Pedro |
| Compliance embutido (consentimento, travas de publicidade, log de IA) | CFM 2.454/2026 em vigor e fiscalização da ANPD. | João Pedro e Vitor |
| Porta de entrada por site e automação | Já são serviços da Level. | Toda a equipe |
| Clínicas com base instalada em software antigo (hipótese) | PES nasceu como software instalado e está em transição para assinatura e web. | Diogo (go-to-market) |
| Goiânia como praça inicial (hipótese) | 60% dos médicos do estado na capital. | Diogo |

**Rebaixados de diferencial para requisito:** preço fixo por clínica (ByDoctor), go-live em poucos dias (Medora, Medmark), IA de agendamento (PES, App Health e outros).

### **Riscos**

> * Concorrência local com marca consolidada e base instalada (PES).  
> * A Amplimed já tem app com marca própria, e o iClinic pertence à Afya e pode copiar.  
> * Categoria de IA no WhatsApp saturada e com preço baixo.  
> * O usuário diário é a recepção, não o médico.  
> * Suporte 24h com três pessoas dividindo suporte, vendas e produto: risco de esgotamento e de promessa não cumprida. Precisa de escala, SLA por severidade e gatilho de contratação.  
> * Migração total depende de o sistema de origem permitir exportação organizada, e envolve dado sensível.  
> * Aceitar customização além dos parâmetros destrói a margem do modelo white label.  
> * Preço premium sem prova de valor pode travar as primeiras vendas. Os pilotos precisam gerar casos com números.

## **13\. Plano de ação detalhado por fase**

---

Estratégia de entrada: vender **redesign de site com agendamento e WhatsApp** (serviços 1 e 4 do site da Level) a clínicas de Goiânia. Isso gera receita desde o início, ensina os limites das APIs e dos sistemas de origem e cria a base de clientes para o CRM. Essa linha de serviço roda em paralelo às fases do produto. O escopo funcional de cada fase segue a matriz de paridade da seção 4\.

### **Linha do tempo (sequencial)**

| Fase | Período | Duração |
| :---- | :---- | :---- |
| 0\. Validação | Mês 1 | 4 semanas |
| 1\. Porta de entrada e MVP | Meses 2 a 4 | 3 meses |
| 2\. Pilotos | Meses 5 a 7 | 3 meses |
| 3\. Escala | Meses 8 a 12 | 5 meses |

As durações são estimativas de trabalho. Dependem da dedicação real de cada sócio, que deve ser confirmada na semana 1 da fase 0\.

### **13.1 Fase 0: Validação (mês 1\)**

**O que é:** o mês de validação antes de construir. O objetivo é responder, com evidência, se vale construir o produto do jeito que está planejado, e sob quais condições (preço, escopo, especialidade, enquadramento jurídico).  
**Perguntas que a fase 0 precisa responder:**

> * As dores de suporte, migração e agenda são fortes o bastante para uma clínica trocar de sistema?  
> * As faixas de preço da seção 10 são aceitas e cobrem o custo do suporte 24h?  
> * É tecnicamente viável migrar dados dos sistemas mais usados, com fidelidade verificável?  
> * O escopo do MVP (incluindo migração de histórico clínico) é juridicamente seguro?  
> * Quais especialidades e perfis de clínica entram primeiro?  
> * Há clínicas dispostas a ser as primeiras parceiras?

### **Frentes de trabalho da fase 0**

| Frente | O que fazer | Responsável | Semanas | Entrega |
| :---- | :---- | :---- | :---- | :---- |
| A. Pesquisa com clientes | 15 a 20 entrevistas com médicos e recepção/gestão em 3 especialidades. Roteiro: sistema atual e custo, rotina da recepção, agenda, confirmação, faltas no último mês (número real), uso do WhatsApp, o que os fez trocar ou não trocar de sistema, medo de migração, suporte, disposição de pagar (teste de preço), interesse em portal com marca própria, proporção de particular e convênio. Gravar apenas com consentimento. | Armando e Diogo | 1 a 3 | Relatório de entrevistas com dores priorizadas, sistemas usados, baseline de no-show e resultado do teste de preço |
| B. Concorrência na prática | Testar demonstrações e trials de Feegow, iClinic, Amplimed, PES, Doctor IA e um fornecedor de IA para WhatsApp. Medir tempo até o primeiro agendamento, qualidade da agenda, como funciona a migração e o tempo de resposta a um chamado aberto fora do horário comercial. Levantar reclamações da PES no Reclame AQUI e verificar a página de revendas. | Diogo e Vitor | 1 a 2 | Matriz comparativa testada, atualizando as seções 3 e 4 |
| C. Viabilidade técnica | Protótipos de importadores para pelo menos duas origens, com dados reais ou realistas (anonimizados) de uma clínica parceira. Medir a proporção migrada sem perda. Testar a API oficial do WhatsApp por meio de um provedor oficial (custo por mensagem, aprovação de templates, limites). Prova de conceito de tema por clínica em arquitetura multi-tenant com duas marcas de teste. Comparar construir versus base white label para a comunicação. Decidir sobre prontuário (decisão 2). Estimar o esforço do MVP. | Vitor | 1 a 4 | Relatório técnico, prova de conceito, decisão sobre prontuário e estimativa do MVP |
| D. Jurídico e compliance | Parecer de especialista em direito médico sobre migração de histórico clínico e guarda, recursos de IA evitados, publicidade médica e papéis de controlador e operador. Minutas do contrato de operação (LGPD), dos termos de uso e do contrato de assinatura com as cláusulas da seção 10\. Verificar disponibilidade de nome, domínio e registro da marca do produto. Iniciar o acordo entre sócios (divisão de lucros e vesting). | João Pedro, com especialista externo | 1 a 4 | Parecer jurídico, minutas contratuais e checagem de marca |
| E. Modelo financeiro e preço | Unit economics por faixa (receita, custo do suporte 24h, custo de WhatsApp, infraestrutura). Ponto de equilíbrio em número de clínicas e gatilho de contratação de suporte. Ajustar as faixas com base no teste de preço. | Diogo | 3 a 4 | Planilha de unit economics e faixas ajustadas |
| F. Design e marca do produto | Nome e identidade do produto (separado da Level). Protótipo de alta fidelidade da agenda e do portal do paciente. Teste de usabilidade com cerca de 5 pessoas de recepção. Tokens de tema para o modelo white label. | Armando | 2 a 4 | Marca do produto, protótipo testado e base do design system |
| G. Clínicas parceiras | Convidar pelo menos 5 clínicas para o piloto, apresentar proposta e faixas, definir condições especiais de piloto e coletar cartas de intenção. | Diogo | 3 a 4 | Lista de 5 ou mais clínicas com carta de intenção |

### **Entregas consolidadas da fase 0**

> * Relatório de entrevistas e baseline de no-show.  
> * Matriz de concorrentes testada.  
> * Relatório técnico com prova de conceito de importadores e de tema por clínica.  
> * Parecer jurídico e minutas contratuais.  
> * Unit economics e faixas de preço validadas.  
> * Marca do produto e protótipo testado.  
> * Lista de clínicas parceiras.  
> * Roadmap e escopo do MVP ajustados.

### **Decisões que devem estar resolvidas ao final da fase 0**

| Decisão (seção 15\) | Como a fase 0 a resolve |
| :---- | :---- |
| 2\. Prontuário e integrações | Frente C entrega a base técnica para o Vitor decidir |
| 4\. Especialidade inicial | Frente A mostra onde a dor e a disposição de pagar são maiores |
| 8\. Recursos de IA evitados | Frente D entrega o parecer |
| 9\. Divisão de lucros e vesting | Frente D inicia o acordo, que deve ser assinado antes do primeiro cliente pagante |
| 10\. Cobertura do 24h | Frente E fecha a conta e o gatilho de contratação |
| 11\. Escopo da migração total | Frentes C e D definem o que entra e o que fica de fora |

### **Critério de go/no-go (sugestão)**

Seguir para a fase 1 se a maioria destes critérios for atendida, com decisão explícita dos sócios:

> 1. Pelo menos 5 clínicas com carta de intenção de piloto.  
> 2. A maioria dos entrevistados (por exemplo, dois terços) confirma que suporte, migração ou agenda são dores relevantes.  
> 3. Pelo menos um importador funcionando com dados reais ou realistas, com perda dentro de uma tolerância definida.  
> 4. Parecer jurídico sem impedimento para o escopo do MVP.  
> 5. Unit economics positivo em pelo menos duas faixas, com o suporte 24h incluído.  
> 6. Faixas de preço compatíveis com a disposição de pagar relatada.  
> 7. Decisões 2, 4, 9 e 11 tomadas.

**Se os critérios não forem atingidos:** ajustar preço ou escopo, limitar o 24h a incidentes críticos em faixas menores, concentrar em serviços de site e automação enquanto o produto amadurece, ou pausar o produto. É por isso que a fase existe: descobrir isso em um mês de esforço, e não depois de meses de construção.

### **13.2 Fase 1: Porta de entrada e MVP (meses 2 a 4\)**

**Objetivo:** colocar a primeira versão em uso real em 2 clínicas, com migração concluída, e começar a gerar receita.

> * Vender redesign de site e automação a 2 ou 3 clínicas (linha de serviço).  
> * Construir o núcleo: agenda própria completa, cadastro, funil da jornada, WhatsApp oficial (confirmação com confirmar, cancelar e remarcar, e envio avulso), área do paciente básica, dashboards básicos, Pix e sinal, motor de marca, trilha de consentimento e auditoria.  
> * Primeiros importadores e relatório de conciliação.  
> * Serviço de implantação, treinamento e guia.  
> * Piloto do plantão 24h com SLA por severidade.  
> * Assinar o acordo entre sócios e os contratos de operação e de assinatura, com as cláusulas da seção 10\.

**Responsáveis:** Armando, Vitor e João Pedro. **Critério para avançar:** 2 clínicas usando a agenda por 30 dias, com migração concluída e conciliação aprovada pelo cliente, e nenhum incidente crítico sem resposta dentro do SLA.

### **13.3 Fase 2: Pilotos (meses 5 a 7\)**

**Objetivo:** provar valor com números em 3 a 5 clínicas e completar o produto.

> * Marca própria em cada clínica.  
> * Área do paciente completa (pré-cadastro, pré-consulta, pesquisa de satisfação), check-in por QR Code e fila da recepção.  
> * Bot de agendamento 24h restrito a agendamento e logística, SMS e e-mail, vídeos de ajuda por módulo, integração de teleconsulta.  
> * Novos importadores, conforme as origens mais frequentes.  
> * Playbook de implantação baseado nas 5 etapas da Level.  
> * Primeira contratação ou terceirização de suporte, se o gatilho for atingido.  
> * Primeiro caso publicável, com números.  
> * Medir chamados por clínica, chamados fora do horário comercial, tempo de migração e horas de implantação.

**Responsável:** Diogo lidera, com o time. **Critério para avançar:** no-show e retorno melhores que o baseline medido nas entrevistas, retenção de todos os pilotos, migração e go-live em poucos dias, SLA cumprido e margem por clínica positiva.

### **13.4 Fase 3: Escala (meses 8 a 12\)**

**Objetivo:** crescer com segurança, integrações e decisões estruturais.

> * Teste de invasão externo e revisão de segurança.  
> * Integrações com sistemas de prontuário, assinatura digital, financeiro completo e IA de transcrição por parceiros.  
> * Decisão sobre prontuário próprio (NGS2) ou parceiro, TISS e estoque conforme o público.  
> * Construtor de painéis.  
> * Página vertical de saúde no site e campanhas para clínicas com base instalada em software antigo.  
> * Expansão para outras cidades.

**Responsáveis:** todos. **Critério de sucesso:** retenção e margem por clínica que sustentem o suporte 24h e a contratação.

### **MVP: o que entra**

> * Agenda própria completa, com acesso pela web e uso no celular.  
> * Cadastro único e funil da jornada com tarefas de follow-up.  
> * Importadores de dados das principais origens e relatório de conciliação.  
> * WhatsApp oficial com confirmação 48h e 2h antes (confirmar, cancelar, remarcar), status na agenda, envio avulso, caixa compartilhada e transferência para humano.  
> * Área do paciente básica com identidade da clínica.  
> * Pix, link de pagamento e sinal para reduzir faltas.  
> * Atribuição de origem do lead.  
> * Perfis de acesso, log de auditoria, criptografia, backup e exportação de dados.  
> * Motor de marca: tema, domínio, templates e assistente de onboarding.  
> * Três dashboards básicos: agendamentos e faltas, atendimentos, faturamento, mais reativação de pacientes.  
> * Canal de suporte com triagem e plantão para incidentes críticos.

### **MVP: o que fica de fora**

Prontuário clínico certificado, TISS, faturamento de convênio, estoque, laudos, módulo hospitalar e recursos de IA que sugerem diagnóstico ou analisam exames. O produto é agnóstico a particular ou convênio, com campo de convênio previsto na agenda para uma integração futura.

### **Métricas**

Taxa de no-show, tempo até o go-live, tempo e taxa de sucesso das migrações, primeira resposta do suporte por severidade, chamados por clínica, chamados fora do horário comercial, retenção de pacientes, receita recorrente por clínica, receita de expansão, horas gastas por implantação e conversão de clientes de site para clientes do CRM.

## **14\. Divisão de lucros entre os sócios**

---

Roteiro de decisão, não recomendação jurídica ou financeira. Validar com advogado externo e contador. Decisão ainda pendente, com início na frente D da fase 0\.

### **Princípio: pague o trabalho antes de dividir o lucro**

> * **Remuneração pelo trabalho:** cada sócio recebe por hora, por projeto entregue ou por pró-labore, conforme a dedicação. Com o plantão 24h, considerar remuneração específica pelas horas de sobreaviso.  
> * **Lucro distribuído pela participação societária:** o que sobra depois de custos, impostos e reserva é dividido pelo percentual de cada um.

### **Separe serviço de produto**

> * **Projetos (sites, redesign, automação, implantações):** o lucro depende de quem entregou. Faz sentido bônus por contribuição e por origem do cliente.  
> * **Plataforma do CRM (receita recorrente):** é um ativo que se valoriza. A divisão costuma seguir a participação societária, com vesting, e a titularidade do código e da marca precisa estar bem definida.

### **Modelos comuns**

| Modelo | Vantagem | Risco |
| :---- | :---- | :---- |
| Igual (25% cada) | Simples, evita disputa de mérito | Injusto se as dedicações forem muito diferentes |
| Por função e dedicação | Reflete o esforço real | Difícil de medir, exige revisão periódica |
| Por pontos (horas, vendas, propriedade intelectual) | Transparente e ajustável | Mais burocrático |
| Híbrido (remuneração por trabalho mais lucro por participação) | Equilibra esforço e propriedade | Precisa de contrato claro |

### **Cláusulas que evitam problemas**

> * **Vesting com cliff:** a participação é conquistada ao longo de 3 a 4 anos, com um período mínimo inicial.  
> * **Saída (good leaver e bad leaver):** define o que acontece com a participação de quem sai, por acordo ou por descumprimento.  
> * **Reserva e reinvestimento:** percentual do lucro retido para caixa, suporte 24h e contratação.  
> * **Reserva para novos sócios ou colaboradores:** pool para atrair quem cuide de vendas e suporte.  
> * **Decisões:** quais exigem unanimidade, maioria ou voto do responsável pela área.  
> * **Dedicação e conflitos:** prazos mínimos, exclusividade e vínculos com empregadores que restrinjam atividades paralelas.  
> * **Revisão:** reavaliar a divisão a cada 6 a 12 meses, com critérios definidos de antemão.

### **Pontos de atenção**

> * As regras tributárias de distribuição de lucros mudaram recentemente. Confirmar com contador antes de fechar a estrutura.  
> * Como um dos sócios é advogado da equipe, contratar um advogado externo para redigir o acordo, para que ninguém sinta que o texto favorece uma das partes.

## **15\. Decisões e status**

---

| \# | Decisão | Status | O que foi decidido ou falta | Responsável | Fase para fechar |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Particular ou convênio como foco inicial | Decidido em parte | Começar pelo particular. Produto agnóstico, pois um médico pode atender particular e ter seu próprio sistema. Manter a integração com convênio em mente, com campo previsto na agenda. | Sócios | Fase 0 (confirmar nas entrevistas) |
| 2 | Prontuário e integrações | Pendente | Decisão do Vitor. A agenda própria e a migração reduzem a dependência de APIs. O destino do histórico clínico migrado (arquivo somente leitura ou prontuário) depende desta decisão e do parecer jurídico. | Vitor | Fase 0 |
| 3 | Modelo de cobrança | Proposta definida | Taxa única de implantação, mensalidade fixa por clínica em faixas (Solo R$ 397, Clínica R$ 897, Clínica+ R$ 1.797), WhatsApp ao custo, sem permanência mínima abusiva. Validar as faixas. | Diogo, com apoio de todos | Fase 0 |
| 4 | Proposta de valor e especialidade inicial | Decidido em parte | Plataforma moderna e bonita (Armando), suporte 24h, instalação e guia, agenda própria e migração total. A escolha da especialidade inicial continua em aberto. | Armando e Diogo | Fase 0 |
| 5 | Marca do produto | Decidido | Separada da Level, porque o branding ainda não está totalmente definido. A identidade é definida na frente F da fase 0\. | Armando | Fase 0 |
| 6 | Quem fará suporte e vendas | Decidido | Armando, Diogo e João Pedro (reserva). Definir escala de plantão e gatilho de contratação. | Sócios | Fases 0 e 1 |
| 7 | Relação com a PES | Decidido | Concorrente. | Sócios | Concluído |
| 8 | Recursos de IA evitados | Pendente | Falta o parecer jurídico. | João Pedro | Fase 0 |
| 9 | Divisão de lucros e vesting | Pendente | Definir antes do primeiro cliente pagante. | Sócios, com advogado externo | Fase 0 (assinar antes da fase 1\) |
| 10 | Cobertura do atendimento 24h | Decidido, falta detalhar | Oferecer 24h. Falta fechar escala de plantão, SLA por severidade e gatilho de contratação. | Diogo | Fase 0 |
| 11 | Escopo da migração total | Novo, a definir | Definir o que entra (cadastro, agenda, financeiro, anexos, histórico clínico somente leitura), as origens prioritárias e a garantia de conciliação. | Vitor e João Pedro | Fase 0 |

## **16\. Limitações desta pesquisa**

> * ---

>   Não foi possível acessar threads reais do Reddit. Os sinais internacionais vêm de artigos secundários, um deles de fornecedor.  
> * O conteúdo do site da Doctor IA não pôde ser lido. Só a descrição pública foi confirmada.  
> * Na PES, a análise se baseia no texto e no print da página da versão Assinatura. A página de revendas e a de clientes não foram abertas, o preço da assinatura não aparece e a página de compra pode estar defasada. Reclamações no Reclame AQUI não foram pesquisadas. A matriz de paridade reflete o que o site declara, não o que foi testado no produto.  
> * As faixas de preço da seção 10 são hipóteses baseadas em âncoras de fornecedores, sem teste com clientes. Os preços dos concorrentes variam entre fontes.  
> * Os SLAs do suporte 24h, o gatilho de contratação, as durações das fases e os critérios de go/no-go são propostas de trabalho, sem cálculo de custo nem confirmação da disponibilidade dos sócios.  
> * Sobre a migração, não foi verificado quais sistemas permitem exportação completa nem as regras de guarda de documentos clínicos.  
> * Fornecedores locais de Goiânia além da PES ainda não foram mapeados.

## **Glossário**

---

| Termo | Significado neste documento |
| :---- | :---- |
| MVP | Primeira versão do produto, com o mínimo necessário para uso real por clínicas. |
| Piloto | Uso do produto por uma clínica parceira, em condições especiais, para gerar aprendizado e resultados medidos. |
| Go/no-go | Decisão explícita ao fim de uma fase: seguir, ajustar o plano ou parar. |
| White label | Produto único, personalizado com a marca de cada cliente por meio de parâmetros (logo, cores, textos, domínio). |
| Multi-tenant | Arquitetura em que várias clínicas usam a mesma base de código, com dados isolados entre si. |
| Importador | Ferramenta que lê os dados exportados de um sistema de origem e os grava no nosso produto. |
| Conciliação | Comparação de contagens e valores antes e depois da migração para provar que nada se perdeu. |
| SLA | Prazo de resposta ou resolução prometido por severidade do problema. |
| No-show | Falta do paciente a uma consulta agendada. |
| Unit economics | Conta de receita e custo por clínica, para saber se cada cliente dá lucro. |
| Contrato de operação | Contrato em que a Level trata dados a mando da clínica (LGPD). A clínica é a controladora e a Level, a operadora. |
| NGS2 | Nível de segurança de prontuário eletrônico exigido para eliminar o papel, com assinatura digital ICP-Brasil. |
| TISS | Padrão de troca de informações para faturamento com planos de saúde. |
| BSP (provedor oficial do WhatsApp) | Empresa autorizada pela Meta a oferecer acesso à API oficial do WhatsApp. |

## **Fontes consultadas**

> * ---

>   Escopo da Level: https://ganwalk.github.io/agency/pt/  
> * PES, Doctor's Office: pes.com.br (página inicial, versão Assinatura com print completo, compra e sobre)  
> * Doctor IA: mydoctoria.com.br (descrição pública)  
> * Fornecedores de IA para clínicas: clinia.io, apphealth.com.br/inteligencia-artificial, docassist.com.br, souvitoria.com.br, usesecretariaia.com, iadocta.com.br, atendente.ai  
> * Comparativos de sistemas e CRMs: gestaods.com.br, medway.com.br, portalsoftware.com.br, clinicasyspro.com.br (concorrente, usar com cautela), bydoctor.com.br, medora.com.br, domusdoctor.com, sistemacolmeia.com.br  
> * Reclamações: reclameaqui.com.br (páginas de Feegow, iClinic, Amplimed e Doctoralia)  
> * White label: amplimed.com.br, medmark.com.br, multitele.com.br, gohighlevel.com  
> * Publicidade médica e IA: portal.cfm.org.br (Resoluções CFM 2.336/2023 e 2.454/2026)  
> * Prontuário eletrônico: Lei 13.787/2018, sbis.org.br, prodoctor.net  
> * WhatsApp e IA: techcrunch.com, stormcore.com.br, gptmaker.ai  
> * LGPD na saúde: medicinasa.com.br, hdpo.com.br, lexlegal.com.br, migalhas.com.br  
> * Médicos em Goiás: cremego.org.br, ohoje.com, tribunadoplanalto.com.br  
> * No-show: bydoctor.com.br, followcare.com.br, feegowclinic.com.br, souvitoria.com.br  
> * Sinais internacionais: omnimd.com (guia de fornecedor), cer.bo, callin.io  
> * 

