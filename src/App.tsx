import React, { useEffect, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { ProductTable } from './components/ProductTable';
import { Filter } from './components/Filter';

import { Product } from './types/product';

const products: Product[] = productsFromServer.map(product => {
  const categories = categoriesFromServer.find(
    categorie => categorie.id === product.categoryId,
  ) || null;

  const userFromServer = usersFromServer.find(
    user => user.id === categories?.ownerId,
  ) || null;

  return {
    ...product,
    category: categories,
    user: userFromServer,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);

  const reset = () => {
    setSelectedUser(0);
    setQuery('');
  };

  const filterByFunction = () => {
    const filteredProducts = products.filter(product => {
      const { name } = product;

      return name.toLowerCase().includes(query.toLowerCase());
    });

    if (selectedUser > 0) {
      return filteredProducts.filter(product => {
        const { user } = product;

        return selectedUser === user?.id;
      });
    }

    return filteredProducts;
  };

  useEffect(() => {
    const filter = filterByFunction();

    setVisibleProducts(filter);
  }, [query, selectedUser]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <Filter
          query={query}
          setQuery={setQuery}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          reset={reset}
        />

        <ProductTable
          products={visibleProducts}
        />
      </div>
    </div>
  );
};
