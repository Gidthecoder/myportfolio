/*
let addtocache = async (resources) => {
	const cache = await caches.open('vl');
	await cache.addAll(resources)
}
self.addEventListener('install', (event) => {
	event.waitUntil(
		addtocache([
			'/layouts',
			'/layouts/html/layout/layout.html'
		])
	)
})
const cacheFirst = async (request) => {
	try {
  	  let responsefromcache = await caches.match(request);
	  if(responsefromcache){return responsefromcache}
	  return fetch(request)
	} catch (error){
		let fallback = caches.match('/')
		if(fallback) {
			return fallback;
		}
		return new Response('Network Error', {status: 408, headers: {'Content-Type': 'text/plain'} })
	}
}

self.addEventListener('fetch', (event) => {
	event.respondWith(cacheFirst(event.request) )
	
})*/
self.addEventListener('push', (e) => {
	let data = e.data.json()
	e.waitUntil( self.registration.showNotification(data.title, {body: data.body, icon: data.icon}) )
})