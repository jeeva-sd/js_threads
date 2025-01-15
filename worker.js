const { parentPort, workerData } = require('worker_threads');
const { iterations } = workerData;

let sum = 0;
for (let i = 0; i < iterations; i++) {
    sum += i;
}

parentPort.postMessage(`Completed ${iterations} iterations. Sum: ${sum}`);
