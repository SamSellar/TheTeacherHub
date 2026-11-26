/* Network-first shell cache. Never touches cross-origin requests (Firebase auth and Firestore) or non-GET requests. */
const V='teacher-hub-3.0.0';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(ch=>ch.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('teacher-hub.html'))))});
