import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

interface User {
  id: number,
  name: string,
  sex: string,
}

interface Category {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
  user: User,
}

interface Product {
  id: number,
  name: string,
  categoryId: number,
  category: Category,
}

function getUser(userId: number): User {
  const foundUser = usersFromServer.find(user => user.id === userId)
    || usersFromServer[0];

  return foundUser;
}

export const categories: Category[] = categoriesFromServer.map(category => ({
  ...category,
  user: getUser(category.ownerId),
}));

function getCategory(categoryId: number): Category {
  const foundCategory = categories
    .find(category => category.id === categoryId)
    || categories[0];

  return foundCategory;
}

const filterProductsByName = (element: string, query: string): boolean => {
  return element.toLowerCase().includes(query.toLowerCase());
};

const filterProductsByCategory = (element: number, userID: number): boolean => {
  return userID === 0 || element === userID;
};

const filterProductsByUser = (element: number, categoryID: number): boolean => {
  return categoryID === 0 || element === categoryID;
};

const getFilteredProducts = (
  products: Product[],
  query: string,
  userID: number,
  categoryID: number,
) => {
  return products.filter(product => {
    const filterByName = filterProductsByName(product.name, query);
    const filterByCategory = filterProductsByCategory(
      product.categoryId,
      categoryID,
    );
    const filterByUser = filterProductsByUser(product.category.ownerId, userID);

    return filterByName && filterByCategory && filterByUser;
  });
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [userID, setUserID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);

  const products: Product[] = productsFromServer.map(product => ({
    ...product,
    category: getCategory(product.categoryId),
  }));

  const visibleProducts = getFilteredProducts(
    products,
    query,
    userID,
    categoryID,
  );

  const resetFilters = () => {
    setQuery('');
    setUserID(0);
    setCategoryID(0);
  };

  const users: User[] = usersFromServer;

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
                className={userID === 0 ? 'is-active' : ''}
                onClick={() => setUserID(0)}
              >
                All
              </a>
              {users.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={userID === user.id ? 'is-active' : ''}
                  onClick={() => setUserID(user.id)}
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
                  onChange={(event) => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      value={query}
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
                className={classNames(
                  'button',
                  'is-success',
                  'mr-6',
                  categoryID !== 0 && 'is-outlined',
                )}
                onClick={() => setCategoryID(0)}
              >
                All
              </a>

              {categories.map(category => (
                <a
                  data-cy="Category"
                  className={classNames(
                    'button',
                    'mr-2',
                    'my-1',
                    categoryID === category.id && 'is-info',
                  )}
                  href="#/"
                  onClick={() => setCategoryID(category.id)}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => resetFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length < 1 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            {visibleProducts.length > 0 && (
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>
            )}

            <tbody>
              {visibleProducts.map(product => (
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category?.icon} - ${product.category?.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={classNames(
                      product.category?.user?.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger',
                    )}
                  >
                    {product.category?.user?.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
