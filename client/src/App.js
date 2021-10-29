import './App.css';
import {InMemoryCache, ApolloClient, ApolloProvider} from "@apollo/client"
import { BrowserRouter , Route,Switch } from 'react-router-dom'
import ShowMore from './components/ShowMore';
import MainPage from './components/MainPage';
 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client = {client}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path = "/" component = {MainPage} exact />
            <Route path = "/showmore" component = {ShowMore} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
