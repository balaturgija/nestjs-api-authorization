import cluster, { Worker } from 'cluster';
import * as os from 'os';

export class Cluster {
  static register(workers: number, callback: any): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);

      //ensure workers exit cleanly
      process.on('SIGINT', function () {
        console.log('Cluster shutting down...');
        for (const id in cluster.workers) {
          cluster.workers[id].kill();
        }
        process.exit(0);
      });
      const cups: number = os.cpus().length;
      if (workers > cups) workers = cups;

      for (let i = 0; i < workers; i++) {
        cluster.fork();
      }

      cluster.on('online', function (worker) {
        console.log('Worker %s is online', worker.process.pid);
      });
      cluster.on('exit', function (worker: Worker) {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
