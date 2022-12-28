import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

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
  const [products, setProducts] = useState([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const query = useQuery(GET_PRODUCTS);

  console.log('DATA - ALL PRODUCTS :::', data?.getAllProducts);
  console.log('QUERY :::', query);

  useEffect(() => {
    if (data?.getAllProducts.length !== 0) {
      setProducts(data?.getAllProducts)
    }
  }, [data]);

  useEffect(() => {
    console.log('products', products)
  }, [products])

  if (loading) return <div> loading... </div>

  return (
    <div className='App'>
      <header className='App-header'>
        
      </header>
    </div>
  );
}

export default App;
