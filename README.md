# DEV ID

Prévia do espaço do desenvolvedor, construída com React, TypeScript, Vite e Tailwind. A aplicação reúne as dez páginas da `nova-versão-full` em uma navegação única e compartilha menu lateral, barra superior, navegação móvel e rodapé.

## Executar

Requer Node.js 22 ou superior.

```powershell
npm install
npm run dev
```

Abra [http://127.0.0.1:5173](http://127.0.0.1:5173). Para conferir a compilação, execute `npm run build`; a saída fica em `web-dist/`.

## Páginas

| Rota | Página |
| --- | --- |
| `/` | Painel |
| `/identidade` | Identidade |
| `/carreira` | Carreira |
| `/competencias` | Competências |
| `/portfolio` | Portfólio |
| `/curriculo` | Estúdio de CV |
| `/integracoes` | Integrações |
| `/oportunidades` | Oportunidades |
| `/analises` | Análises |
| `/personalizacao` | Personalização |

Cada página está em `app/pages/`. Os componentes de navegação estão em `app/components/Shell.tsx`; dados de demonstração e tipos estão em `app/model.ts`. O código fonte entregue pela outra IA permanece intacto em `nova-versão-full/` como referência.

## Estado da prévia

Os perfis, empresas, indicadores, verificações e oportunidades são exemplos. Competências e projetos adicionados são salvos somente no navegador (`localStorage`). Botões de integração, publicação, candidatura, exportação e PDF ainda não têm serviços reais por trás; alguns mostram uma notificação de demonstração. A tradução pt-BR cobre a navegação e os textos principais, mas ainda há textos de exemplo em inglês nas páginas internas.

## Versão anterior preservada

O dashboard original, sua localização pt-BR e a primeira página de identidade continuam em `standalone/`, `src/`, `scripts/` e `dist/`. O README original está arquivado em `docs/template-original/README.md`, pois este arquivo agora documenta a aplicação integrada. Para conferir a integridade dos seis arquivos originais, use `npm run check:original`. Para abrir a prévia anterior, use `npm run legacy:dev`.

Próximas etapas para transformar a prévia em produto: substituir o perfil fictício por dados do usuário, completar a tradução, conectar autenticação e armazenamento, implementar integrações e exportação real, e validar os fluxos de cada página.
