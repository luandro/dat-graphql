const Dat = `
  type Dat {
    name: String!
    subscribed: Boolean
    connected: Boolean
    progress: Int
    done: Boolean
    peers: Int
  }
`
module.exports = () => [Dat]