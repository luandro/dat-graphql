const Query = `
  type Query {
    getDat(hash: String!): String
  }
`
module.exports = () => [Query]
