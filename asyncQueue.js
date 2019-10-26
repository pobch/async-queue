import { createReq } from './mock'

function createQueue(tasks, maxNumOfWorkers = 3) {
  let taskIndex = 0
  let numOfWorker = 0
  // TODO: create closure
}

// Usage
createQueue([
  createReq(2000),
  createReq(500),
  createReq(1000),
  createReq(3000),
  createReq(50),
  createReq(1300),
  createReq(800),
  createReq(2700)
]).then(results => {
  console.log(results)
})
