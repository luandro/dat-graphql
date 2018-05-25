const Subscription=`
  type Subscription {
    downloadDat(hash: String!): Dat
  }
`

module.exports = () => [Subscription]