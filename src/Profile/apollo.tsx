import { ApolloClient, ApolloLink, gql, InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'

// cache declaring
export const cache = new InMemoryCache()

// default data that are currently having in our local
const DefaultFruit = {
    fruits: [
        {
            __typename: 'FruitType',
            name: 'default fruit'
        }
    ]
}

// our query based on the profile standard
// where we are using to passing this one to Query and Mutation calls
export const FruitListQuery = gql`
    query {
        fruits @client {
            name
        }
    }
`

// types/schema for qraphQl response
const CustomTypeDefs = gql`
    type FruitType {
        name: string
    }

    type Query {
        fruits: [FruitType]
    }
`

// works like a store + state management
export const stateLink = withClientState({
    cache,
    defaults: { ...DefaultFruit },
    typeDefs: CustomTypeDefs,
    resolvers: {
        Query: {
            async fruits(obj: any, args: any, context: any, info: any) {
                console.log('get fruits')
                const data = context.cache.read({
                    query: FruitListQuery,
                    optimistic: true
                })
                console.log(data)
                console.log('//////////////////////')
                return { ...data }
            }
        }
    }
})

// setting cache and state-link to the apollo-client
export const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink])
})
