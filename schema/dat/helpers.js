const path = require('path')
const fs = require('fs')
const mirror = require('mirror-folder')
const ram = require('random-access-memory')
const mkdirp = require('mkdirp')

export const downloadDat = (pubsub, channel, Dat, datPath, hash) => {
  const dest = path.join(datPath, hash)
  if (!fs.existsSync(dest)) {
    mkdirp.sync(dest)
  }
  let downloadDat = {
    name: null,
    connected: false,
    subscribed: false,
    progress: 0,
    done: false,
    peers: 0,
  }
  Dat(ram, {key: hash, sparse: true}, (err, dat) => {
    if (err) console.log('Error on downloading dat ', err)
    const network = dat.joinNetwork()
    const stats = dat.trackStats()

    network.once('connection', () => {
      const peers = stats.peers
      console.log('Connected')
      downloadDat.connected = true
      downloadDat.peers = dat.network.connected
      pubsub.publish(channel, { downloadDat })
    })
    dat.archive.metadata.update(download)

    function download () {
      const progress = mirror({fs: dat.archive, name: '/'}, dest, (err) => {
        if (err) throw err
        console.log('Done')
        downloadDat.done = true
        console.log('RES', downloadDat)
        pubsub.publish(channel, { downloadDat })
      })
      progress.on('put', (src) => {
        console.log('Downloading', src.name)
      })
    }
    console.log(`Downloading: ${dat.key.toString('hex')}\n`)
    downloadDat.name = dat.key.toString('hex')
  })
}

export const shareDat = (pubsub, channel, Dat, datPath) => new Promise((resolve, reject) => {
  Dat(src, (err, dat) => {
    if (err) console.log('Err on sharing ', err)
  
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

export const getDats = (Dat, datPath) => new Promise((resolve, reject) => {
  console.log('datPath', datPath)
  let res = []
  const files = fs.readdirSync(datPath)
  const datFolders = files.filter(file => file.length === 64)
  datFolders.map(folder => res.push({
    name: folder
  }))
  resolve(res)
})
