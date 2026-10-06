document.querySelectorAll(".s").forEach(s=>s.querySelector(".bg").src=s.querySelector(".fg").src);
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
   else{meta[id]={t,p:it[2],n:it[0]};h+=line(id,it[0],it[2],t,t=="w"?"Vendido por peso: R$ 19,00 o kg":R(it[2])+" / "+it[1])}
   tot+=st[id]?cost(id,st[id]):0});h+="</div>"});
 document.getElementById("menu").innerHTML=h;document.getElementById("tot").textContent=R(tot);document.getElementById("wn").style.display=st["0-0"]>0?"inline":"none";return tot}
document.getElementById("menu").addEventListener("click",e=>{const b=e.target.closest("button[data-id]");if(!b)return;
 const id=b.dataset.id,d=+b.dataset.d,m=meta[id],q=st[id]||0;let n;
 if(m.t=="g"){n=d>0?(q==0?100:Math.min(m.mx,q+50)):(q<=100?0:q-50)}else n=Math.max(0,q+d);
 st[id]=n;const y=scrollY;render();scrollTo(0,y);const nb=document.querySelector(`button[data-id="${id}"][data-d="${d}"]`);nb&&nb.focus({preventScroll:true})});
document.getElementById("send").onclick=()=>{
 const nome=document.getElementById("nome").value.trim(),hora=document.getElementById("hora").value,pag=document.getElementById("pag").value,err=document.getElementById("err");
 const itens=Object.keys(st).filter(k=>st[k]>0);let msg="";
 if(!itens.length)msg="Adicione ao menos um item ao pedido.";else if(!nome)msg="Informe seu nome.";else if(!hora)msg="Informe o horário de retirada.";
 else if(hora<"05:30"||hora>"20:00")msg="O horário de retirada deve ser entre 5h30 e 20h.";else if(!pag)msg="Escolha a forma de pagamento.";
 err.textContent=msg;if(msg)return;
 let tot=0;const ls=itens.map(id=>{const m=meta[id],q=st[id],c=cost(id,q);tot+=c;return m.t=="g"?`- ${q}g de ${m.n} - ${R(c)}`:m.t=="w"?`- ${q}x ${m.n} - valor pelo peso (R$ 19,00/kg)`:`- ${q}x ${m.n} - ${R(c)}`});
 const t=`Olá, Padaria Joia do Trigo! Quero fazer uma encomenda para RETIRADA:\n*Nome:* ${nome}\n*Retirada:* ${hora.replace(":","h")}\n*Pedido:*\n${ls.join("\n")}\n*Total: ${R(tot)}*${st["0-0"]>0?" (sem o pão francês, cobrado pelo peso)":""}\n*Pagamento na retirada: ${pag}*`;
 window.open("https://wa.me/5511921410537?text="+encodeURIComponent(t),"_blank")};
render();
const sl=document.getElementById("slides"),n=sl.children.length,dots=document.getElementById("dots");let cur=0,tm;
for(let i=0;i<n;i++){const d=document.createElement("i");d.onclick=()=>go(i);dots.appendChild(d)}
function go(i){cur=(i+n)%n;sl.style.transform=`translateX(-${cur*100}%)`;[...dots.children].forEach((d,k)=>d.classList.toggle("on",k==cur));clearInterval(tm);tm=setInterval(()=>go(cur+1),4500)}
document.querySelector(".prev").onclick=()=>go(cur-1);document.querySelector(".next").onclick=()=>go(cur+1);go(0);
