const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size (ex : 90000 => 90kb (chunk size))
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt')

stream.on('data', (result) => {
  console.log(result)
})
stream.on('error', (err) => console.log(err))
