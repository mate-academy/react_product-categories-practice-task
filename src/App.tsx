import React, { useState } from 'react';
// import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { User } from './types/User';
import { Category } from './types/Category';
import { Product } from './types/Product';

import { ProductTable } from './components/ProductTable/ProductTable';
import { Categories } from './components/Category/Categories';
import { Users } from './components/User/Users';
import { Query } from './components/Query/Query';

const productMerged: Product[] = productsFromServer.map(product => {
  const categoryFromServer: Category | undefined = categoriesFromServer.find(
    category => category.id === product.categoryId,
  );

  const userFromServer: User | undefined = usersFromServer.find(
    user => user.id === categoryFromServer?.ownerId,
  );

  return {
    ...product,
    category: categoryFromServer,
    user: userFromServer,
  };
});

export const App: React.FC = () => {
  const products: Product[] = productMerged;
  const [filterUser, setFilterUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState('');

  let visibleProducts = products.filter(product => {
    if (filterUser === '') {
      return product;
    }

    return product.user?.name === filterUser;
  });

  visibleProducts = visibleProducts.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });

  visibleProducts = visibleProducts.filter(product => {
    if (selectedCategory === '') {
      return product;
    }

    return product.category?.title === selectedCategory;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <Users
                usersFromServer={usersFromServer}
                filterUser={filterUser}
                setFilterUser={setFilterUser}
              />
            </p>

            <div className="panel-block">
              <Query query={query} setQuery={setQuery} />
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <Categories
                categoriesFromServer={categoriesFromServer}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setFilterUser('');
                  setSelectedCategory('');
                  setQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductTable visibleProducts={visibleProducts} />
          )}
        </div>
      </div>
    </div>
  );
};
