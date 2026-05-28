// FXSignalPro Service Worker v1
const CACHE_NAME = 'fxsignalpro-v1';

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(function(cl){
      for(var i=0;i<cl.length;i++){
        if(cl[i].url && 'focus' in cl[i]) return cl[i].focus();
      }
      if(clients.openWindow) return clients.openWindow('https://marifeuch.github.io/fxsignalpro/');
    })
  );
});

self.addEventListener('push', function(e){
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title||'FXSignalPro', {
      body: data.body||'New signal available',
      icon: data.icon||'/favicon.ico',
      tag: data.tag||'fxsignal',
      requireInteraction: true
    })
  );
});
