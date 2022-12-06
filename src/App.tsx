import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { ProductList } from './components/ProductList';

const getCategoryById = (categoryId: number) => {
  return categoriesFromServer.find(category => category.id === categoryId);
}; // this function return a category object

const getUserById = (userId?: number) => {
  return usersFromServer.find(user => user.id === userId);
}; // this function return user object

const productsWithCategories = productsFromServer.map(
  product => ({
    ...product,
    category: getCategoryById(product.categoryId),
  }),
);

const productsWithCategoriesAndOwners = productsWithCategories.map(
  product => ({
    ...product,
    user: getUserById(product.category?.ownerId),
  }),
);

/* output array of products [
   product = {
    id: number,
    name: string,
    categoryId: number,
    category: object = {
      id: number;
      title: string;
      icon: string;
      ownerId: number;
    },
    user: object = {
      id: number;
      name: string;
      sex: string;
    },
  }
];
*/

// const getFilteredProducts = (userId: number): Product[] => {
//   return categoriesFromServer.filter(category => category.ownerId === userId);
// };

export const App: React.FC = () => {
  const [products, setProducts] = useState(productsWithCategoriesAndOwners);
  const [query, setQuery] = useState(''); // hook for controling input
  const [ownerId, setOwnerId] = useState(0); // hook for controling a className of users link

  const displayedProducts = products.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });

  const filterProductsByOwner = (userId: number) => {
    const filteredProducts = productsWithCategoriesAndOwners.filter(
      product => product.category?.ownerId === userId,
    );

    setProducts(filteredProducts);
  };

  const hasDisplayedProducts = products.length > 0;

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
                className={ownerId === 0
                  ? 'is-active'
                  : ''}
                onClick={() => {
                  setProducts(productsWithCategoriesAndOwners);
                  setOwnerId(0);
                }}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={user.id === ownerId
                    ? 'is-active'
                    : ''}
                  onClick={() => {
                    filterProductsByOwner(user.id);
                    setOwnerId(user.id);
                  }}
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
                  value={query}
                  onChange={(event) => {
                    setQuery(event?.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => {
                  setProducts(productsWithCategoriesAndOwners);
                }}
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Grocery
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Drinks
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Fruits
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Electronics
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Clothes
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                onClick={() => {
                  alert('sorry, but two hours is not enough');
                }}
              >
                Sasha , CLICK ME
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setQuery('');
                  setOwnerId(0);
                  setProducts(productsWithCategoriesAndOwners);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        {!hasDisplayedProducts && (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
        )}

        {hasDisplayedProducts && (
          <ProductList products={displayedProducts} />
        )}
      </div>
    </div>
  );
};
