import { ApolloClient, ApolloLink, gql, InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'

/**
 * @description
 * this will be consider as our stub/fixtures/local data
 *
 * @note
 * In future, this one will be received from APIs
 *
 * __typename -> this is required to normalize the data in properly even cache
 */
const fruitsData = {
  fruits: [
    {
      __typename: 'FruitType',
      name: 'mango',
      brand: 'malgova'
    }
  ]
}

/**
 * @description
 * creating types (schemas) for the object-response `fruitsData`
 *
 * @note
 * type FruitItemType === fruitsData.fruits[0]
 *
 * @note
 * type Query === fruitsData.fruits
 * this will be a for GET call
 *
 * [syntax] [callType] {
 *     [propName]: [types]
 * }
 *
 */

const FruitsTypes = gql`
  type FruitItemType {
    name: string!
    brand: string!
  }

  type Query {
    fruits: [FruitItemType]
  }
`

/**
 * @description
 * this is a model query where we required to pass to api calls
 * and this one will help us to get the required properties values from the response
 *
 * @note
 * we can use mutation as well -> if we are planning to do for POST
 */

const FruitsQuery = gql`
  query {
    fruits @client {
      name
      brand
    }
  }
`

/**
 * @description
 * creating a cache object to share with `state` and `client` object
 */
const cache = new InMemoryCache()

/**
 * @description
 *
 * @syntax
 * withClientState({ cache, defaults, typeDefs, resolvers: { Query: {}, Mutation:{} } })
 *
 * @defaults
 * our custom object
 *
 * @typeDefs
 * passing schema / types of the response
 *
 * @resolvers
 * where we going to make our Query(GET) and Mutation(POST) call
 *
 */
const stateLink = withClientState({
  cache,
  defaults: { ...fruitsData },
  typeDefs: FruitsTypes,
  resolvers: {
    Query: {
      async fruits(obj: any, args: any, context: any, info: any) {
        console.log('get fruits list')
        const data = context.cache.read({
          query: FruitsQuery,
          optimistic: true
        })
        return { ...data!.fruits }
      }
    }
  }
})

/**
 * @description
 * this is the object where it will be sent for rendering to react-apollo
 *
 */

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink])
})

export { fruitsData, FruitsQuery, FruitsTypes, stateLink, client, cache }
