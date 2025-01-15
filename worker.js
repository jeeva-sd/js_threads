const { parentPort, workerData } = require('worker_threads');
// const { iterations } = workerData;

const loop = (message) => {
    let sum = 0;
    for (let i = 0; i < message.iterations; i++) {
        sum += i;
    }

    parentPort.postMessage(`Completed ${message.iterations} iterations. Sum: ${sum}`);
};

parentPort.on('message', loop);
