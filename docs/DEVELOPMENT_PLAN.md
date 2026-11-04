# DEV ID — plano inicial do Developer Dashboard

Data da inspeção: 03/11/2026, horário de São Paulo.

## Objetivo

Evoluir o dashboard escolhido para uma aplicação de identidade profissional e recrutamento,
preservando o design: fundo #F8F5F1, cards brancos com raio de 28px, sombras suaves,
sidebar flutuante, pills pretas, tipografia Geist e pilares Identity / Evidence / Opportunity.
O HTML standalone é a referência executável; a imagem recebida complementa a comparação.

## Inventário e limites

O pacote tem seis arquivos originais, três vazios, sem package.json, lockfile ou Git.
O HTML de 335.909 bytes contém React 18.3.1, React DOM, CSS Tailwind 3.4.18 e ícones SVG.
Há estilos responsivos, busca e tarefas com estado em memória. Não houve confirmação
de backend, autenticação, integração GitHub/LinkedIn, envio de mensagens ou cálculo de matching.
O uso de POST em `actions` pertence ao ambiente de origem, não a uma API disponível neste projeto.
O repositório remoto foi consultado: público, sem branches na data da inspeção.

## Etapas propostas e critérios de conclusão

1. **Baseline visual e revisão do pacote.** Executar a prévia, revisar desktop e mobile,
   conferir busca, tarefas e notificações. Registrar capturas. Buscar o export original
   dos fontes; se indisponível, reconstruir em uma pasta nova sem substituir o template.
   Concluído quando houver uma referência visual aprovada para comparação.
2. **Base React + TypeScript + Vite.** Criar a aplicação separada, com build em `build/`,
   preservando `dist/` e `standalone/`. Reaproveitar os estilos compilados apenas como
   referência; configurar Tailwind em versão escolhida e fixada durante a implementação.
   Extrair AppShell, Sidebar, Header, IdentityCard, TechnicalDNA, CareerTimeline,
   PortfolioHighlights, Opportunities, RecruiterActivity e EvidenceTasks.
   Concluído quando os mesmos dados demonstrativos reproduzirem a referência em desktop/mobile,
   com build e checagem de tipos aprovados, sem erros inesperados no navegador.
3. **Perfil e dados tipados.** Separar dados demonstrativos dos componentes e definir
   DeveloperProfile, SkillEvidence, CareerEntry, PortfolioProject, Opportunity e EvidenceTask.
   Implementar edição de perfil com validação e estados vazio/carregando/erro/sucesso.
   Identificar dados simulados e não apresentar métricas de verificação como reais.
4. **Autenticação e persistência.** Escolher provedor e modelo de dados após definir
   requisitos de conta. Implementar sessão, rotas protegidas e autorização por proprietário
   no servidor. Testar isolamento entre dois usuários e persistência após recarregar.
   Tokens de provedores devem ficar no servidor. Não conectar contas pelo bundle compilado.
5. **Integrações e evidências.** GitHub OAuth/importação de projetos primeiro; LinkedIn
   após verificar os recursos permitidos pelo provedor. Distinguir autodeclaração de
   evidência importada e revisão. Definir critérios antes de publicar matching percentual.
6. **Expansão.** Perfil público com regras de privacidade, depois Talent Workspace e Admin.
   Busca de talentos e contato com recrutadores dependem de consentimento e acesso por papel.

## Próxima entrega sugerida

Primeiro dashboard React editável com navegação acessível e edição local do perfil,
mantendo a composição existente. Sem prometer OAuth, recrutadores reais ou matching nesta etapa.
Revisar contraste, rótulos dos ícones, teclado e responsividade durante a migração.

## Decisões pendentes

- Recuperar o fonte React original ou reconstruir fielmente a partir do HTML.
- Idioma inicial definido: português do Brasil. O template original em inglês foi preservado;
  a versão pt-BR é gerada separadamente a partir de `src/pt-BR.json`.
- Escolher hospedagem, autenticação e banco ao iniciar persistência.
- Confirmar direitos de uso do template e das imagens antes de publicação comercial.

## Validação desta preparação

- `npm run check`: seis arquivos originais intactos e dois scripts executáveis com sintaxe válida.
- Prévia HTTP: HTML servido byte a byte; imagem e HEAD respondem corretamente.
- Arquivos privados e caminhos não permitidos retornam 404; POST fora de actions retorna 405.
- Endpoint legado retorna 501 com mensagem explícita, permitindo o fallback original.
- Navegador: dashboard renderizado em viewport padrão 1280×720; busca sem resultados removeu
  cards filtráveis e o botão de limpar restaurou o conteúdo.
- Não foram testados todos os botões, teclado, tamanhos móveis, OAuth ou serviços externos.
  A marcação de tarefas foi identificada no código, sem validação interativa nesta etapa.

## Localização pt-BR

- 122 textos traduzidos em `src/pt-BR.json`, incluindo tarefas, menus, busca e notificações.
- Datas demonstrativas mantidas como demonstração, com rótulos e horários em português.
- Números de experiência usam separador decimal brasileiro; nomes de tecnologias e projetos são mantidos.
- `npm run build` gera a versão localizada em `build/`, sem modificar a referência original.
- Cabeçalho adaptado para acomodar os textos em português no celular.
- Conferidos os tamanhos 320, 768, 1024 e 1440 px, a busca por “sênior” e a notificação “Editar • Em breve”.
- O percentual mostrado ao clicar em uma oportunidade agora usa o valor da própria oportunidade.
