// Simulate network request
function createReq(time) {
  return () =>
    new Promise((resolve, reject) => {
      const isError = Math.random() < 0.5
      if (isError) {
        setTimeout(() => {
          reject(new Error('sorry'))
        }, time)
      } else {
        setTimeout(() => {
          resolve(time)
        }, time)
      }
    })
}

module.exports = { createReq }
