/* Opcional: URL do Apps Script (veja apps-script.gs) para guardar os pedidos na nuvem */
const API_URL="";
function saveOrder(s,v){const n=new Date(),p=x=>String(x).padStart(2,"0"),o={id:Date.now(),d:n.getFullYear()+"-"+p(n.getMonth()+1)+"-"+p(n.getDate()),v:Math.round(v*100)/100,s};
 try{const a=JSON.parse(localStorage.getItem("pjt_vendas"))||[];a.push(o);localStorage.setItem("pjt_vendas",JSON.stringify(a))}catch(e){}
 if(API_URL)try{fetch(API_URL,{method:"POST",mode:"no-cors",body:JSON.stringify(o)}).catch(()=>{})}catch(e){}}
let KG=19;
const P=[["Pão Francês","unidade",0,"w"],["Pão de Queijo","unidade",3.5],["Pão Doce","unidade",3],["Baguete","unidade",6]];
const F=[["Presunto",5],["Mussarela",6],["Mortadela",3.5],["Salame",9],["Peito de Peru",8],["Queijo Prato",6.5]];
const S=[["Coxinha","unidade",7],["Pastel Assado","unidade",7.5],["Enroladinho","unidade",6],["Esfiha","unidade",6]];
const D=[["Sonho de Creme","unidade",6],["Bolo de Cenoura (fatia)","fatia",7],["Bolo de Fubá (fatia)","fatia",6],["Rocambole (fatia)","fatia",8]];
const B=[["Café","copo",4],["Suco Natural","copo",8],["Refrigerante Lata","lata",6],["Água","garrafa",3]];
const cats=[["Pães","Atenção: o pão francês é vendido por peso (1 kg = R$ 19,00). Escolha quantos pães quer; o valor final é calculado pelo peso na retirada.",P,"u"],["Frios","Mínimo de 100 g, de 50 em 50 g, até 1 kg. Preço por 100 g.",F,"g"],["Salgados","",S,"u"],["Doces e bolos","",D,"u"],["Bebidas","",B,"u"]];
const st={};const R=v=>"R$ "+v.toFixed(2).replace(".",",");
const gr=g=>g>=1000?(g/1000).toString().replace(".",",")+" kg":g+" g";
function line(id,name,price,type,desc){const q=st[id]||0;
 return `<div class="item"><div class="n">${name}<span>${desc}</span></div><div class="q"><button data-id="${id}" data-d="-1" aria-label="Diminuir ${name}">${type=="g"?"−50g":"−"}</button><b>${q?(type=="g"?gr(q):q):"—"}</b><button data-id="${id}" data-d="1" aria-label="Aumentar ${name}">${type=="g"?"+50g":"+"}</button></div><div class="sub2">${q?(type=="w"?"pelo peso":R(cost(id,q))):""}</div></div>`}
const meta={};
function cost(id,q){const m=meta[id];return m.t=="g"?q/100*m.p:q*m.p}
function render(){let h="",tot=0;
 cats.forEach((c,ci)=>{h+=`<div class="cat"><h3>${c[0]}</h3><small>${c[1]}</small>`;
  c[2].forEach((it,i)=>{const id=ci+"-"+i,t=it[3]||c[3];
   if(t=="g"){const p=it[1];meta[id]={t,p,mx:1000,n:it[0]};h+=line(id,it[0],p,t,R(p)+" a cada 100 g")}
   else{meta[id]={t,p:it[2],n:it[0]};h+=line(id,it[0],it[2],t,t=="w"?"Vendido por peso: "+R(KG)+" o kg":R(it[2])+" / "+it[1])}
   tot+=st[id]?cost(id,st[id]):0});h+="</div>"});
 document.getElementById("menu").innerHTML=h;document.getElementById("tot").textContent=R(tot);document.getElementById("wn").style.display=st["0-0"]>0?"inline":"none";return tot}
document.getElementById("menu").addEventListener("click",e=>{const b=e.target.closest("button[data-id]");if(!b)return;
 const id=b.dataset.id,d=+b.dataset.d,m=meta[id],q=st[id]||0;let n;
 if(m.t=="g"){n=d>0?(q==0?100:Math.min(m.mx,q+50)):(q<=100?0:q-50)}else n=Math.max(0,q+d);
 st[id]=n;const y=scrollY;render();scrollTo(0,y);const nb=document.querySelector(`button[data-id="${id}"][data-d="${d}"]`);nb&&nb.focus({preventScroll:true})});
document.getElementById("send").onclick=()=>{
 const nome=document.getElementById("nome").value.trim(),hora=document.getElementById("hora").value,dia=document.getElementById("dia").value,pag=document.getElementById("pag").value,err=document.getElementById("err");
 const itens=Object.keys(st).filter(k=>st[k]>0);let msg="";
 if(!itens.length)msg="Adicione ao menos um item ao pedido.";else if(!nome)msg="Informe seu nome.";else if(!dia)msg="Informe o dia da retirada.";else if(!hora)msg="Informe o horário de retirada.";
 else if(dia<hoje())msg="Escolha uma data a partir de hoje.";else if(dia>maxDia())msg="As encomendas podem ser feitas com até 15 dias de antecedência.";else if(dia===hoje()&&hora<new Date().toTimeString().slice(0,5))msg="Esse horário de hoje já passou. Escolha outro horário ou outro dia.";else if(hora<"05:30"||hora>"20:00")msg="O horário de retirada deve ser entre 5h30 e 20h.";else if(!pag)msg="Escolha a forma de pagamento.";
 err.textContent=msg;if(msg)return;
 let tot=0;const ls=itens.map(id=>{const m=meta[id],q=st[id],c=cost(id,q);tot+=c;return m.t=="g"?`- ${q}g de ${m.n} - ${R(c)}`:m.t=="w"?`- ${q}x ${m.n} - valor pelo peso (${R(KG)}/kg)`:`- ${q}x ${m.n} - ${R(c)}`});
 const t=`Olá, Padaria Joia do Trigo! Quero fazer uma encomenda para RETIRADA:\n*Nome:* ${nome}\n*Retirada:* ${dia.split("-").reverse().join("/")} às ${hora.replace(":","h")}\n*Pedido:*\n${ls.join("\n")}\n*Total: ${R(tot)}*${st["0-0"]>0?" (sem o pão francês, cobrado pelo peso)":""}\n*Pagamento na retirada: ${pag}*`;
 saveOrder(nome+" · "+pag+(st["0-0"]>0?" (+ pão francês pelo peso)":""),tot);
 window.open("https://wa.me/5511921410537?text="+encodeURIComponent(t),"_blank")};
render();

/* Cardápio editável: lê cardapio.json (gerado em admin.html). Sem o arquivo, usa os valores acima. */
fetch("cardapio.json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(d=>{if(!d)return;
 if(d.kg)KG=d.kg;["paes","frios","salgados","doces","bebidas"].forEach((k,i)=>{if(Array.isArray(d[k]))cats[i][2]=d[k]});
 cats[0][1]="Atenção: o pão francês é vendido por peso (1 kg = "+R(KG)+"). Escolha quantos pães quer; o valor final é calculado pelo peso na retirada.";
 render()}).catch(()=>{});

function maxDia(){const n=new Date();n.setDate(n.getDate()+15);const p=x=>String(x).padStart(2,"0");return n.getFullYear()+"-"+p(n.getMonth()+1)+"-"+p(n.getDate())}
function hoje(){const n=new Date(),p=x=>String(x).padStart(2,"0");return n.getFullYear()+"-"+p(n.getMonth()+1)+"-"+p(n.getDate())}
{const d=document.getElementById("dia");d.min=hoje();d.max=maxDia();d.value=hoje()}

if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll(".rv").forEach(el=>{el.classList.add("pre");io.observe(el)})}
