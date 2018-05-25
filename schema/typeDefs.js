import Dat from './dat/types'
import Subscription from './subscription/type'
import Query from './query/type'

const Schema = () => [`
  schema {
    query: Query,
    subscription: Subscription
  }
`]

export default [
  Dat,
  Query,
  Subscription,
  Schema,
]
