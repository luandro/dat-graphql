const Query = `
  type Query {
    getDats: [Dat]
  }
`
module.exports = () => [Query]
