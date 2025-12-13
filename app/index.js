// Datadog Tracer (En üstte olmalı!)
const tracer = require('dd-trace').init({
  logInjection: true,
  runtimeMetrics: true
});

const express = require('express');

const app = express();
const port = 3000;

// Basit loglama fonksiyonu
const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`);

app.get('/', (req, res) => {
  log('Ana sayfaya istek geldi');
  res.send('Hello from Datadog Node.js Demo! 🐶');
});

// Hata simülasyonu
app.get('/error', (req, res) => {
  log('Hata endpointi çağrıldı!');
  throw new Error('Bu bir test hatasıdır! Datadog APM bunu yakalamalı.');
});

// Yavaş işlem simülasyonu
app.get('/slow', (req, res) => {
  const waitTime = Math.random() * 2000 + 500; // 0.5 - 2.5 sn arası
  log(`Yavaş işlem başlatıldı, ${Math.floor(waitTime)}ms sürecek...`);
  
  setTimeout(() => {
    log('Yavaş işlem tamamlandı');
    res.send(`İşlem ${Math.floor(waitTime)}ms sürdü.`);
  }, waitTime);
});

app.listen(port, () => {
  log(`Uygulama http://localhost:${port} üzerinde çalışıyor`);
});

