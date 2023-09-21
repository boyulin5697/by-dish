import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.less'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
//config graphql server
const client = new ApolloClient({
  uri: 'http://localhost:19200/bydish/gql',
  cache: new InMemoryCache(),
});


function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
export default App
