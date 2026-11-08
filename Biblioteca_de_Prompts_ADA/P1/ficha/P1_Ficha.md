# P1 — Adaptação de currículo a uma vaga real

**Projeto:** Biblioteca de Prompts para a Carreira · Ada × Núclea  
**Peça:** P1 · Carreira  
**Data do experimento:** 07/11/2026 (conforme registro da conversa)  
**Estado:** testes encerrados; entrega documentada com limitações registradas.

## 1. Título
Adaptação de currículo a uma vaga real com zero-shot, few-shot e revisão de compatibilidade ATS.

## 2. Contexto de uso
Para candidaturas a vagas reais de tecnologia. O experimento utilizou uma vaga da Núclea na área de Automação e Inteligência Artificial e uma versão anonimizada do currículo. Objetivo: destacar aderências comprovadas, preservar dados profissionais e sinalizar lacunas sem inventar qualificações. O mesmo currículo e a mesma descrição de vaga foram mantidos nos testes.

## 3. Ferramenta e porquê
**Claude:** utilizado para executar os prompts e produzir documentos editáveis, posteriormente exportados para PDF. A escolha permite comparar a qualidade da escrita e a estrutura da saída. **Não houve teste comprovado em uma segunda ferramenta nesta P1.** O requisito de comparação entre ferramentas deverá ser atendido em outra peça ou em um teste adicional identificado como tal.

## 4. Prompt v1
A primeira tentativa, sem exemplo (zero-shot), foi preservada em `prompts/p1_v1_zero_shot.md`. Seu conteúdo integral está transcrito abaixo.

```text
Analise meu currículo e a descrição da vaga da Núclea.

Adapte meu currículo para destacar minhas experiências profissionais, competências técnicas e resultados mais relevantes para essa oportunidade.

Não invente experiências, certificações ou conhecimentos que não estejam comprovados no currículo original.

Apresente o currículo adaptado de forma profissional, clara e organizada.

Currículo: [INSERIR CURRÍCULO ANONIMIZADO]

Descrição da vaga: [INSERIR DESCRIÇÃO COMPLETA DA VAGA]
```

## 5. Prompt final
**v4:** composição do prompt v3 C.P.T.F. com o adendo v4 de separação de documentos. A versão integral está em `prompts/p1_prompt_final.md`. Possui Contexto, Persona, Tarefa e Formato identificados; exemplo few-shot; múltiplas restrições e dois produtos definidos (currículo e relatório). Os campos variáveis são `[INSERIR CURRÍCULO ANONIMIZADO]` e `[INSERIR DESCRIÇÃO COMPLETA DA VAGA]`.

## 6. Observações e resultados

| Versão | Técnica / ajuste | Resultado observado |
|---|---|---|
| v1 | Zero-shot, sem exemplo | Currículo adaptado em 3 páginas; boa priorização de governança e arquitetura; exigiu revisão humana. |
| v2 | Few-shot, com um exemplo de reescrita | Linguagem mais uniforme e maior preservação de detalhes; 4 páginas, última pouco aproveitada; IA menos destacada no resumo. |
| v3 | C.P.T.F., restrições, ATS e checklist | Mais rastreabilidade e relatório de aderência; saída misturou currículo e análise em 6 páginas. |
| v4 | Dois documentos independentes | Currículo e relatório separados; currículo exportado em 4 páginas, ainda acima do objetivo de até 3. |

### Comparação zero-shot × few-shot
O few-shot melhorou a consistência da redação e a manutenção de detalhes, mas **não** melhorou a paginação nem todos os aspectos de aderência. Não há evidência de ganho universal. A avaliação foi qualitativa, por inspeção dos PDFs; não foram medidos escores automatizados de ATS.

### Critérios de verificação (C1–C5)
- **C1 — Fidelidade:** nenhuma invenção evidente identificada na revisão, mas a verificação humana continua necessária; duas experiências questionadas foram confirmadas pela pessoa candidata.
- **C2 — Indicadores:** principais números preservados (500 mil leads; 105 mil convertidos; 90→30 dias; 800 processos/ano; 15→29 onboardings/dia; 606/mês; 20 soluções/mês; 19 usuários).
- **C3 — Cargos e datas:** preservados na comparação realizada; há sobreposição de datas no currículo de origem que requer validação humana.
- **C4 — Aderência:** governança, arquitetura, automação, liderança e indicadores foram priorizados; lacunas obrigatórias foram sinalizadas.
- **C5 — Pronto para uso:** **não atendido plenamente** na v4: quatro páginas, campos de contato anonimizados e validações pendentes.

### Cuidados e limitações
- Não tratar formação em Engenharia de Dados como prova de uso de Databricks.
- Não tratar experiência com Azure como comprovação de AWS/GCP ou FinOps.
- A classificação de aderência produzida pela IA não é uma avaliação objetiva de empregabilidade.
- O relatório v4 contém 13 critérios agregados (3 comprovados, 5 parciais, 5 não identificados), **classificação do Claude, não verificada independentemente em todos os itens**.
- Os documentos exportados contêm identificadores pessoais e nomes de empresas; ficam em evidências privadas, não no pacote público para GitHub.
- A v4 manteve a redação do v3 e acrescentou o adendo; **não foi um teste controlado isolando apenas a técnica few-shot**. A comparação específica da técnica é v1 versus v2.

## Arquivos e evidências
- `prompts/`: v1, v2, v3, adendo v4 e prompt final completo.
- `evidencias/README.md`: inventário das saídas originais guardadas separadamente.
- `referencias/README.md`: materiais de entrada e cuidados de privacidade.

## Situação para entrega
A P1 atende aos campos da ficha, à estrutura C.P.T.F., às restrições, ao formato de saída e à comparação zero-shot/few-shot. **A publicação no GitHub deve conter somente arquivos revisados para privacidade.**
