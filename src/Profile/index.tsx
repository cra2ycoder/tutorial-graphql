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
                        return ''
                        // const fruitsView = (response.data!.fruits || []).map(
                        //     (fruit: any) => {
                        //         return (
                        //             <>
                        //                 <div>{fruit.name}</div>
                        //                 <div>{fruit.brand}</div>
                        //             </>
                        //         )
                        //     }
                        // )
                        // return fruitsView
                    }}
                </Query>
            </ApolloProvider>
        )
    }
}

export { Profile }
export default Profile
