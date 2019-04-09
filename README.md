# graphql-tutorial
repository with apollo-link-state, graphql, react-apollo and playground for graphql-anywhere

## pieces

**1. typings (schema)**

**2. transform (simplify data into a good output) [optional, only if bad data]**
  - fixing bad propertyNames (_`sku_id` => `skuId`_)
  - flattening out data that doesn't need to be nested
  - adding defaults when there is missing data (like default props)
  
**3. query**
   > READ
- ~ `GET` or `localStorage.get`
- the properties from the typings that you wanna use
- it's like using `omit`

**4. mutation**
   > WRITE

- ~ `POST` or `localStorage.set`
- the exact same as a query, but it's used to change data, and it's like a function you call, and you pass in an object or whatever the params are

**5. resolvers**

- arguments(obj, args, context, info)
  - **obj**: `never use`,
  - **args**: `the query params, or mutation arguments`,
  - **context**: `express req, it's unique for each query/mutation/request`,
  - **info**: `forgot what is even in here, never use`
