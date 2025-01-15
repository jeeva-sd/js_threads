const { Worker } = require('worker_threads');

const normalLoop = (iterations) => {
    console.time('Total Execution Time');

    let sum = 0;

    for (let i = 0; i < iterations; i++) {
        sum += i;
    }

    console.timeEnd('Total Execution Time');

    return sum;
};

function workerLoop(iterations) {
    console.time('Total Execution Time');

    const worker = new Worker('./worker.js', {
        workerData: { iterations },
    });

    worker.on('message', (message) => {
        console.log('Worker Response:', message);
    });

    console.timeEnd('Total Execution Time');
}


const start = (useWorker = false, iterations) => {
    useWorker ? workerLoop(iterations) : normalLoop(iterations);
};

const iterations = 10000000;
const worker = true;

start(worker, iterations);