import * as React from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import { client, FruitsQuery } from './apollo'

class Profile extends React.Component {
  static defaultProps = {}
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={FruitsQuery}>
          {(response: any) => {
            console.log(response)
            const fruitsView = (response.data!.fruits || []).map(
              (fruit: any) => {
                return (
                  <li key={fruit.name}>
                    <p>{fruit.name}</p>
                    <p>{fruit.brand}</p>
                  </li>
                )
              }
            )
            return <ul>{fruitsView}</ul>
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

export { Profile }
export default Profile
