## Steps to be followed for create a offline-server

> filename apollo.tsx

1. our `data` json needs to be created
2. import `gql` object from `apollo-boost` for creating a
   types(schemas/typeDefs) and query/mutation
3. create schema (types / typeDefs) for the json
4. create query (GET) based on the `data` json, just filter the required props
5. import `InMemoryCache` object from `apollo-boost` to create a cache, to share
   with `state` and `client` objects
6. import `withClientState` from `apollo-link-state` to create a store
7. create `stateLink` object with use of `withClientState`
8. pass our `json`, `typeDefs`, `cache` objects to `stateLink`
9. create a `resolvers` property, add `Query/Mutation` based on our needs
10. implement the async function inside `Query/Mutation`
11. import `ApolloClient` from `apollo-boost`
12. create `client` object with `ApolloClient`
13. import `ApolloLink` from `apollo-boost`
14. create `link` object with `ApolloLink`
15. pass the `link` and `cache` with `client`
