const { Worker } = require('worker_threads');
const worker = new Worker('./worker.js');

const resolve = e => console.log('e', e);

function start() {
    worker.on('message', resolve);
    worker.postMessage('Hello from Main');
}

start();