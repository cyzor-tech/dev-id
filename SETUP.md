# DEV ID — execução local

Requer Node.js 22 ou superior. Validado inicialmente com Node 24.18.0.
Não é necessário instalar dependências.

```powershell
cd C:\Users\Modernize\Music\dev-id
npm run check
npm run dev
```

Abra http://127.0.0.1:5173. Para encerrar, use Ctrl+C no terminal.
Se a porta estiver ocupada, use `$env:PORT = '5174'` antes de iniciar.

## Estado real do pacote

- `standalone/dev-id-dashboard.html` contém o dashboard original compilado, preservado sem alterações.
- A página inicial está em português do Brasil. `src/pt-BR.json` contém os textos e
  `scripts/localize.mjs` gera `build/index.html` ao executar `npm run dev` ou `npm run build`.
  Para conferir a referência em inglês, abra `/standalone/dev-id-dashboard.html` na prévia.
- `src/App.tsx`, `src/index.css` e `dist/index.html` chegaram vazios. A indicação do README original de abrir `dist/index.html` não corresponde ao conteúdo recebido.
- O bundle incorpora React 18.3.1 e CSS Tailwind 3.4.18. Não há projeto Vite configurado nem fonte React utilizável.
- Fontes Geist e Geist Mono são carregadas do Google Fonts; sem internet a tipografia pode variar.
- Conteúdo, indicadores, recrutadores e percentuais são demonstrativos.
- A busca filtra conteúdo de demonstração. Muitas ações apenas mostram notificações.
- O endpoint `actions` dependia do ambiente original. A prévia retorna erro explícito e usa o fallback já existente no template. Tarefas podem ser marcadas localmente, mas reiniciam ao recarregar.
- Não há autenticação, banco, integrações reais ou autorização implementados.

## Preservação e Git

Os seis arquivos recebidos estão registrados em `docs/template-original.sha256.json`.
`npm run check` verifica seus hashes, gera a versão pt-BR e valida a sintaxe dos scripts inline sem executá-los.
O servidor só expõe o template e a imagem de referência, em 127.0.0.1.
Nenhum arquivo original foi substituído e o comando de execução não escreve em `dist/`.

O remote `origin` aponta para https://github.com/cyzor-tech/dev-id.git.
A preparação inicial foi realizada em `setup/developer-dashboard`; a primeira publicação
usa a branch `main`. Revise as alterações antes de cada commit.
O arquivo `.gitattributes` preserva os bytes dos arquivos originais entre plataformas.

Veja `docs/DEVELOPMENT_PLAN.md` para a próxima etapa.
