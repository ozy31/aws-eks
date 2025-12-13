// Datadog Tracer (En üstte olmalı!)
const tracer = require('dd-trace').init({
  logInjection: true,
  runtimeMetrics: true
});

const express = require('express');

const app = express();
const port = 3000;

// Simple logging function
const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`);

app.get('/', (req, res) => {
  log('Home page accessed');
  res.send('Hello from Datadog Node.js Demo! 🐶');
});

// Error simulation
app.get('/error', (req, res) => {
  log('Error endpoint called!');
  throw new Error('This is a test error! Datadog APM should catch this.');
});

// Slow request simulation
app.get('/slow', (req, res) => {
  const waitTime = Math.random() * 2000 + 500; // between 0.5 - 2.5 sec
  log(`Slow operation started, will take ${Math.floor(waitTime)}ms...`);
  
  setTimeout(() => {
    log('Slow operation completed');
    res.send(`Operation took ${Math.floor(waitTime)}ms.`);
  }, waitTime);
});

app.listen(port, () => {
  log(`App running on http://localhost:${port}`);
});

