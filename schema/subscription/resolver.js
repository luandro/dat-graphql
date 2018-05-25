import { downloadDat } from '../dat/helpers'

export default {
  downloadDat: {
    subscribe: (_, { hash }, { pubsub, sbot, dat, paths }) => {
      const channel = Math.random().toString(36).substring(2, 15) // random channel name
      downloadDat(pubsub, channel, dat, paths.datPath, hash)
      return pubsub.asyncIterator(channel)
    }
  },
}