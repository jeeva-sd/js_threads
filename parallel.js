const { Worker } = require('worker_threads');

const createWorker = (iterations, startIndex, endIndex) =>
    new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');
        worker.postMessage({ iterations, startIndex, endIndex });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });

const parallelLoop = async (iterations, numWorkers) => {
    console.time('Parallel Execution Time');
    const chunkSize = Math.ceil(iterations / numWorkers);

    const workerPromises = Array.from({ length: numWorkers }, (_, i) => {
        const startIndex = i * chunkSize;
        const endIndex = Math.min((i + 1) * chunkSize, iterations);
        return createWorker(iterations, startIndex, endIndex);
    });


    const results = await Promise.all(workerPromises);

    const totalSum = results.reduce((sum, res) => sum + res, 0);
    console.timeEnd('Parallel Execution Time');
    console.log(`Total Sum: ${totalSum}`);
};

const iterations = 1000000000;
const numWorkers = 4;
parallelLoop(iterations, numWorkers);
