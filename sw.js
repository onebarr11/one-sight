/* Ojol Ops service worker. Naikkan V setiap rilis agar cache lama dibuang. */
const V='6.1.0',SHELL='ojol-shell-'+V,RUN='ojol-fonts-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS)));}); /* tidak skipWaiting otomatis: menunggu persetujuan pengguna */
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('ojol-shell-')&&k!==SHELL).map(k=>caches.delete(k)))));});
self.addEventListener('message',e=>{const d=e.data||{};if(d.type==='SKIP_WAITING')self.skipWaiting();if(d.type==='GET_VERSION'&&e.source)e.source.postMessage({type:'VERSION',version:V});});
const timeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
  if(u.hostname==='api.open-meteo.com')return; /* cuaca: selalu jaringan, tidak pernah di-cache */
  if(r.mode==='navigate'){e.respondWith(timeout(fetch(r),4000).then(res=>{if(res.ok){const cp=res.clone();caches.open(SHELL).then(c=>c.put('./index.html',cp));}return res;}).catch(()=>caches.match('./index.html').then(m=>m||caches.match('./'))));return;}
  if(u.origin===location.origin){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(SHELL).then(c=>c.put(r,cp));}return res;})));return;}
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.open(RUN).then(c=>c.match(r).then(m=>{const n=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res;}).catch(()=>m);return m||n;})));}
});
