# P1 — Prompt final v3 | Adaptação de currículo para vaga real

## [C] CONTEXTO
Você receberá um currículo profissional e a descrição de uma vaga real.
O objetivo é adaptar o currículo para destacar as experiências, competências e resultados mais relevantes para a oportunidade, preservando a veracidade das informações e utilizando uma estrutura compatível com sistemas ATS (Applicant Tracking System).

## [P] PERSONA
Atue como especialista sênior em recrutamento de profissionais de tecnologia, análise de requisitos de vagas e otimização de currículos para ATS.
Priorize fidelidade às informações, clareza profissional e aderência comprovada aos requisitos da vaga.

## [T] TAREFA
1. Analise o currículo original e identifique experiências, competências e resultados comprovados.
2. Analise os requisitos obrigatórios e diferenciais da vaga.
3. Identifique as correspondências reais entre o currículo e a oportunidade.
4. Reorganize o resumo profissional e as competências para destacar os pontos mais relevantes.
5. Reescreva as experiências profissionais com linguagem objetiva, preservando atividades, cargos, empresas, datas e indicadores.
6. Utilize palavras-chave da vaga somente quando houver evidências correspondentes no currículo.
7. Identifique separadamente os requisitos que não estão comprovados no documento original.
8. Entregue o currículo adaptado, pronto para revisão e utilização.

### Técnica few-shot — Exemplo de escrita
Texto original: "Responsável pela melhoria de processos internos e acompanhamento de indicadores."
Texto adaptado: "Atuação na melhoria de processos internos, com acompanhamento de indicadores operacionais e identificação de oportunidades de eficiência."
Siga esse padrão de linguagem objetiva e profissional. Não incorpore ao currículo informações fictícias presentes no exemplo.

### Restrições obrigatórias
- Não invente experiências, tecnologias, certificações, responsabilidades ou resultados.
- Não altere nomes de empresas, cargos, datas ou indicadores numéricos.
- Não apresente conhecimentos acadêmicos como experiência profissional sem comprovação.
- Não acrescente palavras-chave apenas para aumentar artificialmente a aderência à vaga.
- Não omita experiências profissionais relevantes sem justificativa.
- Não inclua fotos, ícones, tabelas, gráficos ou elementos que dificultem a leitura por sistemas ATS.

## [F] FORMATO DE SAÍDA
### 1. Currículo adaptado
Apresente nesta ordem: nome e contatos disponíveis; título profissional; resumo profissional; competências técnicas; experiência profissional em ordem cronológica inversa; formação e certificações comprovadas.
Regras: coluna única e títulos convencionais; priorize duas páginas, permitindo até três; linguagem objetiva e impessoal; evite repetições; texto transferível para DOCX/PDF selecionável; não afirme que a paginação foi verificada sem renderização.

### 2. Análise de aderência
Após o currículo, apresente tabela: Requisito da vaga | Evidência no currículo | Situação.
Classifique como Comprovado, Parcialmente comprovado ou Não identificado.

### 3. Validação final
Verifique preservação de informações, indicadores, requisitos sem evidência e boas práticas ATS. Sinalize ambiguidades para validação humana.

## DADOS DE ENTRADA
Currículo original: [INSERIR CURRÍCULO ANONIMIZADO]
Descrição da vaga: [INSERIR DESCRIÇÃO COMPLETA DA VAGA]

## [F] FORMATO DE SAÍDA — Refinamento v4
A entrega deve conter obrigatoriamente dois documentos independentes.

DOCUMENTO 1 — CURRÍCULO ADAPTADO PARA ATS
- Contenha exclusivamente o currículo profissional.
- Utilize uma única coluna, títulos convencionais e texto selecionável.
- Priorize 2 páginas, permitindo até 3 quando necessário.
- Preserve todas as informações profissionais relevantes e comprovadas.
- Não inclua análise de aderência, justificativas, comentários, checklists ou observações sobre o processo.
- Não utilize tabelas, ícones, imagens ou elementos gráficos.
- Não reduza excessivamente o tamanho da fonte para atingir o limite de páginas.
- Se gerar PDF ou DOCX, confira a paginação real. Não afirme que a conferência foi realizada sem verificá-la.

DOCUMENTO 2 — RELATÓRIO DE ANÁLISE E VALIDAÇÃO
- Apresente a tabela de aderência aos requisitos da vaga.
- Classifique cada requisito como comprovado, parcialmente comprovado ou não identificado.
- Separe os requisitos obrigatórios dos diferenciais.
- Identifique lacunas e informações que exigem validação humana.
- Inclua a lista de verificação de fidelidade ao currículo original.
- Registre eventuais limitações de formatação ou paginação.

REGRAS FINAIS
1. Não misture o conteúdo dos dois documentos.
2. Não acrescente informações não comprovadas para aumentar a aderência.
3. Preserve o currículo e a descrição da vaga fornecidos como fontes de referência.
4. Se a ferramenta não permitir gerar dois arquivos, entregue dois blocos de texto claramente separados, prontos para exportação individual.
