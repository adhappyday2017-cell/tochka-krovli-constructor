var e=new Intl.NumberFormat(`ru-RU`,{maximumFractionDigits:1}),t=new Intl.NumberFormat(`ru-RU`),n=e=>`${t.format(Math.round(e))} ₽`,r=e=>e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),i=(e,t,n,r)=>{let i=Math.abs(e)%10,a=Math.abs(e)%100;return Number.isInteger(e)?i===1&&a!==11?t:i>=2&&i<=4&&(a<10||a>=20)?n:r:n},a=`−`,o={лист:[`лист`,`листа`,`листов`],уп:[`упаковка`,`упаковки`,`упаковок`],рул:[`рулон`,`рулона`,`рулонов`],"м²":[`м²`,`м²`,`м²`]},s=t=>t?`${e.format(t.qty)}\u00A0${i(t.qty,...o[t.unit])}`:``;function c(t){if(t.current)return[];if(Math.abs(t.delta)<1)return[`столько же`];let r=t.delta<0?a:`+`;return[`${r}${n(Math.abs(t.delta))}`,`${r}${e.format(Math.abs(t.deltaPct))}%`]}var l=e=>c(e).join(` · `);function u(e,t,n=90,r=[]){let i=(e,t)=>{if(!e.length)return``;let n=new Map;for(let t of e){let e=`${t.blockName}|${Math.round(t.pitch)}`;n.set(e,[...n.get(e)??[],t])}return`${t}: ${[...n.values()].map(e=>{let t=e.map(e=>e.n),n=t.length>1?`скаты № ${t.slice(0,-1).join(`, `)} и ${t[t.length-1]}`:`скат № ${t[0]}`;return`${e[0].blockName?`${e[0].blockName} — `:``}${n}, ${Math.round(e[0].pitch)}°`}).join(`; `)}`};return[i(e,`Нужно от ${t}°`),i(r,`Кладут до ${n}°`)].filter(Boolean).join(`. `)}function d(e){let t=e.find(e=>e.current);return t?.kept.length?`Со своим покрытием и не меняются: ${t.kept.map(t=>{let n=e.find(e=>e.id===t.covering);return`${t.name||`объём`} — ${(n?.short??t.covering).toLowerCase()}`}).join(`, `)}.`:``}function f(e,t={}){let i=t.buttons??!0;if(!e.length)return``;let a=Math.max(...e.map(e=>e.total),1),o=e.some(e=>e.labour>0),l=d(e),f=e.some(e=>!e.swatchKept)?` Цвет ваш, где он есть, иначе первый из палитры.`:``;return`<section class="cmp" aria-label="Та же крыша в другом покрытии">${t.heading===!1?``:`<div class="cmp__top"><h3 class="cmp__h">Та же крыша в другом покрытии</h3>
    <p class="cmp__note">Пересчитали всей сметой: раскрой, доборы, крепёж${o?` и монтаж`:``} — под каждое покрытие.${f}${l?` ${r(l)}`:``}</p></div>`}${`<div class="cmp__th" aria-hidden="true"><span>Покрытие</span><span>Материалы</span><span>${o?`Монтаж`:``}</span><span>Итого и разница</span><span></span></div>`}<ol class="cmp__list">${e.map(e=>{let t=[e.swatch,s(e.cover)].filter(Boolean).join(` · `),l=e.allowed?``:u(e.low,e.minPitch,e.maxPitch,e.steep),d=e.current?``:e.allowed?e.delta<-.5?`is-less`:e.delta>.5?`is-more`:``:`is-void`,f=e.allowed?``:`<p class="cmp__warn">${r(l)}</p>`,p=!i||e.current?``:e.allowed?`<button type="button" class="btn btn--sm btn--dark cmp__pick" data-covering="${r(e.id)}" aria-label="Выбрать: ${r(e.name.toLowerCase())}">Выбрать</button>`:`<button type="button" class="btn btn--sm btn--ghost cmp__pick" disabled title="${r(`Нельзя: ${l}`)}" aria-label="${r(`${e.name}: нельзя — ${l}`)}">Выбрать</button>`,m=Math.max(2,Math.round(e.total/a*100));return`<li class="cmp__row${e.current?` is-current`:``}${e.allowed?``:` is-blocked`}" data-cmp="${r(e.id)}" style="--w:${m}%">
      <div class="cmp__name"><b>${r(e.name)}</b>${e.current?` <span class="cmp__tag">сейчас</span>`:``}${e.allowed?``:` <span class="cmp__tag cmp__tag--no">нельзя</span>`}<small>${r(t)}</small></div>
      <div class="cmp__mat"><span class="cmp__lbl">материалы </span>${n(e.materials)}</div>
      <div class="cmp__lab">${o?`<span class="cmp__lbl">монтаж </span>${n(e.labour)}`:``}</div>
      <div class="cmp__tot"><b>${n(e.total)}</b></div>
      <div class="cmp__dlt ${d}">${c(e).map(e=>`<span>${r(e)}</span>`).join(` · `)}</div>
      <div class="cmp__act">${p}</div>
      ${f}
    </li>`}).join(``)}</ol></section>`}function p(e){let t=e.some(e=>e.labour>0),r=[`Покрытие`,`Цвет`,`Материалы`,...t?[`Монтаж`]:[],`Итого`,`Разница`,`Уклон`],i=[`left`,`left`,`right`,...t?[`right`]:[],`right`,`right`,`left`],a=e.map(e=>[`${e.name}${e.current?` (сейчас)`:``}`,`${e.swatch}${e.swatchKept?``:` *`}`,n(e.materials),...t?[n(e.labour)]:[],n(e.total),e.current?`—`:l(e),e.allowed?`${e.maxPitch<90?`${e.minPitch}–${e.maxPitch}°`:`от ${e.minPitch}°`}, подходит`:`нельзя: ${u(e.low,e.minPitch,e.maxPitch,e.steep)}`]),o=d(e),s=[`Та же крыша, пересчитанная всей сметой под каждое покрытие: раскрой, доборы, крепёж${t?`, монтаж`:``}.`,...o?[o]:[],...e.some(e=>!e.swatchKept)?[`* Вашего цвета у этого покрытия нет — взяли цвет по умолчанию.`]:[],...e.some(e=>!e.allowed)?[`«Нельзя» — скаты положе или круче, чем кладут это покрытие; разница у такого покрытия — для сведения.`]:[]];return{title:`Та же крыша в другом покрытии`,head:r,body:a,align:i,current:e.findIndex(e=>e.current),blocked:e.flatMap((e,t)=>e.allowed?[]:[t]),notes:s}}var m=`
.cmp{container-type:inline-size;display:grid;gap:8px;font-size:14px}
.cmp__top{display:grid;gap:4px}
.cmp__h{margin:0;font:800 19px/1.15 var(--f-display);letter-spacing:.01em}
.cmp__note{margin:0;font-size:13px;color:var(--ink-muted)}
.cmp__list{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.cmp__th{display:none}
.cmp__row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"name tot" "name dlt" "mat act" "lab act" "warn warn";column-gap:12px;row-gap:2px;align-items:start;padding:10px 12px 12px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
.cmp__row::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:var(--w);background:var(--zinc-3);border-radius:0 2px 2px 0}
.cmp__row.is-current{background:var(--paper);box-shadow:inset 3px 0 0 var(--red),inset 0 0 0 1px var(--line)}
.cmp__row.is-current::after{background:var(--red)}
.cmp__name{grid-area:name;min-width:0}
.cmp__name b{font-weight:700}
.cmp__name small{display:block;margin-top:1px;font-size:12px;line-height:1.35;color:var(--ink-muted)}
.cmp__tag{display:inline-block;margin-left:4px;padding:0 6px;border-radius:4px;background:var(--night);color:#fff;font-size:11px;font-weight:700;line-height:18px;vertical-align:1px}
.cmp__tot{grid-area:tot;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.cmp__tot b{font:800 20px/1.1 var(--f-display)}
.cmp__dlt{grid-area:dlt;justify-self:end;text-align:right;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;color:var(--ink-muted)}
.cmp__dlt span{white-space:nowrap}
.cmp__dlt.is-less{color:var(--green)}
.cmp__dlt.is-more{color:var(--ink)}
.cmp__mat{grid-area:mat}
.cmp__lab{grid-area:lab}
.cmp__mat,.cmp__lab{font-size:12px;color:var(--ink-muted);white-space:nowrap;font-variant-numeric:tabular-nums}
.cmp__act{grid-area:act;align-self:end;justify-self:end}
.cmp__pick{min-width:96px}
.cmp__warn{grid-area:warn;margin:8px 0 0;padding:6px 10px;border-radius:8px;background:#fff4e5;color:#7a4a00;font-size:12.5px;line-height:1.4}
.cmp__row.is-blocked .cmp__name b{color:var(--ink-muted)}
.cmp__tag--no{background:#fff4e5;color:#7a4a00;box-shadow:inset 0 0 0 1px #f0c98a}
.cmp__dlt.is-void{color:var(--ink-muted);opacity:.7}
.cmp__dlt.is-void span{text-decoration:line-through;text-decoration-thickness:1px}
.cmp__pick:disabled{opacity:.55;cursor:not-allowed}
@container (min-width:600px){
  .cmp__th,.cmp__row{grid-template-columns:minmax(0,1.7fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.3fr) 104px;column-gap:12px}
  .cmp__th{display:grid;padding:0 12px;font-size:12px;font-weight:600;color:var(--ink-muted)}
  .cmp__th span:nth-child(n+2):nth-child(-n+4){text-align:right}
  .cmp__row{grid-template-areas:"name mat lab tot act" "name mat lab dlt act" "warn warn warn warn warn";align-items:center;padding:10px 12px 12px}
  .cmp__lbl{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  .cmp__mat,.cmp__lab{text-align:right;font-size:14px;color:var(--ink)}
  .cmp__tot{align-self:end}
  .cmp__dlt{align-self:start;font-size:12.5px}
  .cmp__act{align-self:center}
  .cmp__warn{margin-top:6px}
}
`;function h(e=document){if(e.getElementById(`cmp-css`))return;let t=e.createElement(`style`);t.id=`cmp-css`,t.textContent=m,e.head.append(t)}export{f as compareHTML,p as compareRowsForPdf,h as ensureCompareCss};