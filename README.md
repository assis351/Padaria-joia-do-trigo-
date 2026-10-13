# Padaria Joia do Trigo

Site estático (HTML, CSS e JavaScript puros, sem dependências) com cardápio interativo e envio de pedido para o WhatsApp.

## Estrutura
- `index.html`: página
- `css/style.css`: estilos (cores extraídas da logo, no início do arquivo)
- `js/main.js`: cardápio, total e mensagem do WhatsApp
- `images/`: logo e fotos do carrossel

## Como editar o cardápio e os preços
No topo de `js/main.js`:
- `P` pães: `["Nome","unidade",preço]`. O pão francês usa `"w"` (vendido por peso, aviso de R$ 19,00/kg)
- `F` frios: `["Nome", preço a cada 100 g]`
- `S`, `D`, `B` salgados, doces e bebidas: `["Nome","unidade",preço]`

Os preços atuais são exemplos: troque pelos reais.

## Publicar no GitHub Pages
1. Envie todos os arquivos para o repositório.
2. Em **Settings > Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. O site ficará em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Painel do administrador (`admin.html`)
Abra `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/admin.html` (o link não aparece no site). Ele pede uma senha (definida em `admin.html`, procure por `3524`).
- **Renda:** registre cada venda (removido). Mostra hoje, semana (seg a dom), mês e um gráfico dos últimos 7 dias. Os dados ficam no navegador usado: faça backup pelo botão.
- **Cardápio:** inclua e remova salgados, doces e bebidas e pães (menos o pão francês). Pão francês e frios são fixos, só o preço muda. Depois clique em "Baixar cardapio.json" e substitua o arquivo `cardapio.json` do repositório para publicar a mudança.

## Renda em todos os aparelhos (opcional, grátis)
Sem isso, cada pedido enviado fica registrado só no navegador de quem enviou. Para juntar tudo:
1. Crie uma planilha no Google Sheets > Extensões > Apps Script e cole o conteúdo de `apps-script.gs`.
2. Implantar > Nova implantação > Aplicativo da Web: executar como "Eu", acesso "Qualquer pessoa". Copie a URL.
3. Cole a URL em `const API_URL=""` no início de `js/main.js` e de `admin.html`.
