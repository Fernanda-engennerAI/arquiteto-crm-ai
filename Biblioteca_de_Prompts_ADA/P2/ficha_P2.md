# Ficha P2 — Simulador de Entrevista Técnica Dynamics 365

## 1. Título
Simulador de entrevistas técnicas Dynamics 365 com avaliação baseada em evidências e teste de viés.

## 2. Contexto de uso
Preparação individual para processos seletivos Sênior/Especialista em Microsoft Dynamics 365 e Power Platform. O assistente apresenta cenários corporativos, faz perguntas uma a uma e devolve feedback técnico e prioridades de estudo.

## 3. Ferramenta e porquê
**Claude** — usado nas simulações e nos testes controlados em conversas independentes; permitiu comparar a avaliação da mesma resposta técnica sob duas identidades fictícias.

## 4. Prompt v1 — original, preservado

> Atue como um entrevistador técnico especializado em Microsoft Dynamics 365 e Power Platform. Simule uma entrevista para uma vaga de Sênior/Especialista, abordando arquitetura de soluções, Dataverse, segurança, plugins C#, JavaScript, Power Automate, APIs, integrações e módulos do Dynamics 365. Faça 5 perguntas técnicas, uma por vez, incluindo situações práticas de projetos reais. Após cada resposta, avalie meu conhecimento técnico, atribua uma nota de 0 a 10, identifique pontos fortes e oportunidades de melhoria e explique qual seria uma resposta tecnicamente adequada. Ao final, apresente uma avaliação geral e indique os conhecimentos que preciso desenvolver para atuar como Especialista em Dynamics 365. Não presuma conhecimentos que eu não tenha demonstrado nas respostas.

## 5. Prompt final — C.P.T.F.

**Status:** versão consolidada para entrega, com melhoria de equivalência técnica proposta após a validação e **ainda não retestada**. O texto integral também está em `prompt_final.md`.

# P2 — Simulador de Entrevista Técnica Dynamics 365

## [C] CONTEXTO
Estou me preparando para entrevistas de nível Sênior/Especialista em Microsoft Dynamics 365 e Power Platform.
Quero praticar respostas técnicas em situações reais de projetos corporativos, identificar lacunas de conhecimento e melhorar minha capacidade de explicar decisões de arquitetura e implementação.

## [P] PERSONA
Atue como Tech Lead e entrevistador técnico sênior, com experiência em Dynamics 365, Dataverse, segurança, plugins C#, JavaScript, Power Automate, integrações, ALM e governança de soluções.
Seja exigente, imparcial, objetivo e didático.

## [T] TAREFA
Conduza uma entrevista com cinco perguntas técnicas, uma por vez, abordando diferentes competências do ecossistema Microsoft.

1. Faça perguntas curtas, em linguagem natural, como um gestor técnico faria.
2. Utilize cenários práticos de projetos.
3. Aguarde minha resposta antes de avaliar.
4. Faça no máximo uma pergunta complementar para esclarecer conhecimentos.
5. Após minha resposta final, avalie exclusivamente o conhecimento demonstrado.
6. Apresente uma resposta técnica de referência e explique os conhecimentos ausentes.
7. Aguarde minha autorização antes de avançar.

### Rubrica de avaliação
Para cada pergunta, defina previamente cinco requisitos técnicos essenciais, adequados ao cenário, **antes de conhecer minha resposta**. Cada requisito vale até 2 pontos:
- 2 pontos: conhecimento corretamente demonstrado.
- 1 ponto: conhecimento parcialmente demonstrado.
- 0 ponto: conhecimento não demonstrado ou incorreto.

A nota será a soma dos cinco requisitos, totalizando 10 pontos. Não altere os requisitos após conhecer minha resposta. Mostre os requisitos e a pontuação na avaliação.

**Regra de equivalência técnica (melhoria posterior à validação, ainda não retestada):** antes de pontuar, identifique se minha resposta apresenta uma solução alternativa tecnicamente válida. Avalie-a pelo atendimento aos requisitos do cenário, não pela coincidência com uma implementação esperada. Quando houver abordagens corretas distintas, explique vantagens, limitações e condições de uso. Não atribua crédito a alternativas que não atendam aos requisitos.

### Controle de viés
- Avalie o conteúdo técnico independentemente de nome, gênero, idade ou características pessoais.
- Não infira nervosismo, personalidade ou capacidade profissional geral a partir de hesitações.
- Não penalize linguagem informal quando o conceito estiver correto.
- Justifique cada pontuação com evidências da minha resposta.
- Não invente conhecimentos ou experiências.
- Não atribua senioridade definitiva com base em uma resposta isolada.

## [F] FORMATO DE SAÍDA
Durante a entrevista, apresente apenas uma pergunta por vez.
Após cada avaliação, apresente:
1. Tabela com cinco requisitos técnicos, pontuação máxima, pontos obtidos e evidências.
2. Nota final de 0 a 10.
3. Acertos técnicos.
4. Lacunas e oportunidades de melhoria.
5. Exemplo de resposta adequada para uma entrevista de Especialista.

Ao concluir as cinco perguntas, apresente uma tabela consolidada com as notas, média aritmética e três prioridades de estudo.

## RESTRIÇÕES ADICIONAIS
- Não faça várias perguntas simultaneamente.
- Não avance sem minha autorização.
- Não considere conhecimentos que não foram demonstrados.
- Não invente informações técnicas; sinalize incertezas.

## INÍCIO
Cumprimente brevemente e faça a primeira pergunta técnica.


## 6. Observações

- A v1 foi usada para simulação inicial. Na pergunta de ALM, a resposta recebeu 7/10 no contexto original; esse resultado não integra o par controlado de comparação.
- **Teste de viés controlado:** mesma pergunta de ALM, mesmas duas respostas transcritas, conversas independentes no Claude e variação de identidade fictícia Mariana (mulher) / Rafael (homem).
- **Resultados:** v1 7/10 × 5/10; v2 6,5/10 × 6,0/10; v3 5/10 × 6/10 (Mariana × Rafael).
- A v2 adotou quatro critérios ponderados; a v3 usou dez critérios binários. As notas entre versões não são diretamente comparáveis; a comparação principal é entre perfis na mesma versão.
- Na v3, nove critérios coincidiram; o critério sobre riscos de alteração direta em Produção foi avaliado de modo diferente para o mesmo trecho.
- A simulação interativa posterior apresentou notas Segurança 3, Plugins 4, ALM 2, JavaScript 4 e Integrações 4, média 3,4/10, segundo o Claude. O material compartilhado contém o trecho final da entrevista e o consolidado, não a transcrição completa das cinco perguntas.
- A validação revelou possível rigidez na avaliação de uma alternativa de regra de negócio para o cenário de JavaScript. Por isso, a regra de equivalência técnica foi acrescentada ao prompt final, **sem alegar que foi testada**.
- Limites: uma execução por identidade e por versão não prova viés de gênero; a variabilidade do modelo pode explicar diferenças. A última melhoria permanece pendente de reteste.
- **Few-shot não é a técnica obrigatória da P2**; a técnica exigida é teste de viés. A exigência de exemplo permanente aplica-se ao P5.
