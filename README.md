# Padaria Joia do Trigo

Site estático (HTML, CSS e JavaScript puros, sem dependências) com cardápio interativo e envio de pedido para o WhatsApp.

## Estrutura
- `index.html`: página
- `css/style.css`: estilos (cores extraídas da logo, no início do arquivo)
- `js/main.js`: cardápio, total e mensagem do WhatsApp
- `css/intro.css` e `js/intro.js`: animação de abertura de 15 s (forno, café, logo). Para remover, apague a div `#intro` do `index.html` e as linhas que carregam esses dois arquivos
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
