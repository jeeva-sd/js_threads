const { Worker } = require('worker_threads');

const normalLoop = (iterations) => {
    console.time('Normal Loop Execution Time');

    let sum = 0;
    for (let i = 0; i < iterations; i++) {
        sum += i;
    }

    console.timeEnd('Normal Loop Execution Time');
    console.log(`Sum: ${sum}`);
};

const workerLoop = (iterations) => {
    console.time('Worker Loop Execution Time');

    const worker = new Worker('./worker.js');
    worker.postMessage({ iterations });

    worker.on('message', (message) => {
        console.log('Worker Response:', message);
        console.timeEnd('Worker Loop Execution Time');
        worker.terminate();
    });

    worker.on('error', (err) => {
        console.error('Worker Error:', err);
        worker.terminate();
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
};

const start = (useWorker = false, iterations = 10000000) => {
    if (useWorker) {
        workerLoop(iterations);
    } else {
        normalLoop(iterations);
    }
};

const iterations = 1000000000;
const useWorker = false;
start(useWorker, iterations);
