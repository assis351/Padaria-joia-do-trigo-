// Guarda os pedidos numa planilha do Google. Veja o README para publicar.
function sh(){var ss=SpreadsheetApp.getActiveSpreadsheet(),s=ss.getSheetByName('Vendas');if(!s){s=ss.insertSheet('Vendas');s.appendRow(['id','data','valor','obs'])}return s}
function doPost(e){var o=JSON.parse(e.postData.contents);sh().appendRow([o.id,String(o.d),o.v,o.s]);return ContentService.createTextOutput('ok')}
function doGet(){var r=sh().getDataRange().getValues().slice(1).map(function(x){var d=x[1] instanceof Date?Utilities.formatDate(x[1],'America/Sao_Paulo','yyyy-MM-dd'):String(x[1]);return{id:x[0],d:d,v:x[2],s:x[3]}});return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON)}
