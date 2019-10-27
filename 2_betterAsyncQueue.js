const { createReq } = require('./mock')

function createQueue(tasks, maxNumOfWorkers = 3) {
  return new Promise(done => {
    let taskIndex = 0
    let numOfWorker = 0
    let results = Array(tasks.length).fill(null)

    function nextTask() {
      if (taskIndex < tasks.length) {
        tasks[taskIndex]()
          .then(
            (indx => result => {
              results[indx] = result
              numOfWorker--
              nextTask()
            })(taskIndex)
          )
          .catch(
            (indx => error => {
              results[indx] = error
              numOfWorker--
              nextTask()
            })(taskIndex)
          )
        numOfWorker++
        console.log(`current task index ${taskIndex}, current worker ${numOfWorker}`)
        taskIndex++
      } else if (numOfWorker === 0) {
        done(results)
      }
    }

    for (let i = 0; i < maxNumOfWorkers; i++) {
      tasks[taskIndex]()
        .then(
          (indx => result => {
            results[indx] = result
            numOfWorker--
            nextTask()
          })(taskIndex)
        )
        .catch(
          (indx => error => {
            results[indx] = error
            numOfWorker--
            nextTask()
          })(taskIndex)
        )
      numOfWorker++
      console.log(`current task index ${taskIndex}, current worker ${numOfWorker}`)
      taskIndex++
    }
  })
}

// Usage
createQueue([
  createReq(700),
  createReq(500),
  createReq(1000),
  createReq(1400),
  createReq(50),
  createReq(1300),
  createReq(6600),
  createReq(700)
]).then(results => {
  console.log(results)
})
