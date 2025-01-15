const { parentPort } = require('worker_threads');

parentPort.on('message', (msg) => {
    console.log('worker.js:', msg);
    const result = `Processed: ${msg}`;
    parentPort.postMessage(result);
});
