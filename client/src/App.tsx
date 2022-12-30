import './App.css';
import { gql, useQuery } from '@apollo/client';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { Login, TempLanding } from './pages';

const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
      price
    }
  }
`;

function App() {
  const { data } = useQuery(GET_PRODUCTS);
  console.log(data)

  return (
    <Router>
      <Switch>
        <Route path='/'>
          <TempLanding />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
