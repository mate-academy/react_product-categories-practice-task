import React, { useState } from 'react';
import './App.scss';

import { ProductTable } from
  './components/ProductTable/ProductTable/ProductTable';

import { Product } from './types/Product';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

const getCategoryById = (categoryId: number) => {
  return categoriesFromServer.find(category => category.id === categoryId);
};

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};

const productsWithCategories = productsFromServer.map(
  product => ({
    ...product,
    category: getCategoryById(product.categoryId),
  }),
);

let products: Product[] = productsWithCategories.map(
  product => ({
    ...product,
    user: getUserById(product.category?.ownerId),
  }),
);

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');

  const filterByUser = (userToFilter: string) => {
    setSelectedUser(userToFilter);
  };

  const visibleProducts = (selectedUser !== '')
    ? products.filter(product => (product.user?.name === selectedUser))
    : products;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={selectedUser === '' ? 'is-active' : ''}
                onClick={() => filterByUser('')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  onClick={() => filterByUser(user.name)}
                  className={user.name === selectedUser ? 'is-active' : ''}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <ProductTable products={visibleProducts} />
        </div>
      </div>
    </div>
  );
};
