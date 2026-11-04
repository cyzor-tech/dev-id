# Execução local

```powershell
cd C:\Users\Modernize\Music\dev-id
npm install
npm run dev
```

Acesse `http://127.0.0.1:5173`. `npm run build` gera a versão estática em `web-dist/`. `npx tsc --noEmit` verifica os tipos.

Para consultar o projeto anterior sem alterar seus arquivos, execute `npm run legacy:dev`. `npm run check:original` confere os arquivos de referência originais.

O projeto novo usa dados demonstrativos. Competências e projetos adicionados nesta prévia são salvos apenas no navegador. Integrações, publicação, candidatura, relatórios e PDF precisam de serviços reais antes de serem usados em produção.
