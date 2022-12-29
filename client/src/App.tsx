import { useEffect, useState } from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { Product } from './gql/graphql';


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
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, data } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (data?.getAllProducts.length !== 0) {
      setProducts(data?.getAllProducts);
    }
  }, [data]);

  useEffect(() => {
    console.log('products', products);
  }, [products]);

  if (loading) return <div> loading... </div>;

  return (
    <div className='App'>
      <header className='App-header'></header>
    </div>
  );
}

export default App;
