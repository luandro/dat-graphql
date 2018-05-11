// import Dat from './dat/types'
import Query from './query/type'

const Schema = () => [`
  schema {
    query: Query
  }
`]

export default [
  // Dat,
  Query,
  Schema,
]
