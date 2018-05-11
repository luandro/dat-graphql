const path = require('path')
const Dat = require('dat-node')
const fs = require('fs')
const mirror = require('mirror-folder')
const ram = require('random-access-memory')

const src = path.join(__dirname, '..')
const dest = path.join(__dirname, 'tmp')
fs.mkdirSync(dest)

export const getDat = (_, { datHash }) => new Promise((resolve, reject) => {
  Dat(ram, {key: datHash, sparse: true}, (err, dat) => {
    if (err) throw err
    const network = dat.joinNetwork()
    network.once('connection', () => {
      console.log('Connected')
    })
    dat.archive.metadata.update(download)

    function download () {
      const progress = mirror({fs: dat.archive, name: '/'}, dest, (err) => {
        if (err) throw err
        console.log('Done')
      })
      progress.on('put', (src) => {
        console.log('Downloading', src.name)
      })
    }
    console.log(`Downloading: ${dat.key.toString('hex')}\n`)
    resolve(dat.key.toString('hex'))
  })
})

export const shareDat = (_, { file }) => new Promise((resolve, reject) => {
  Dat(src, {temp: true}, (err, dat) => {
    if (err) throw err
  
    const network = dat.joinNetwork()
    network.once('connection', () => {
      console.log('Connected')
    })
    const progress = dat.importFiles(src, {
      ignore: ['**/dat-node/node_modules/**']
    }, (err) => {
      if (err) throw err
      console.log('Done importing')
      console.log('Archive size:', dat.archive.content.byteLength)
    })
    progress.on('put', (src, dest) => {
      console.log('Added', dest.name)
    })
  
    console.log(`Sharing: ${dat.key.toString('hex')}\n`)
  })
})
