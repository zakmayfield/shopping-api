import './App.css';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

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

  return (
    <div className='App'>
      <header className='App-header'></header>
    </div>
  );
}

export default App;
