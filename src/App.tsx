import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

function getUserById(UserID: number) {
  return usersFromServer.find(user => user.id === UserID);
}

export const categoriesWithUsers = categoriesFromServer.map(category => ({
  ...category,
  user: getUserById(category.ownerId),
}));

function getCategoryById(categoryID: number) {
  return categoriesWithUsers.find(category => category.id === categoryID);
}

export const productsWithCategory = productsFromServer.map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),
}));

export const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [query, setQuery] = useState('');

  let visibleProducts = userName
    ? productsWithCategory.filter(product => (
      product.category?.user?.name === userName))
    : [...productsWithCategory];

  visibleProducts = categoryTitle
    ? visibleProducts.filter(product => (
      product.category?.title === categoryTitle))
    : [...visibleProducts];

  visibleProducts = visibleProducts.filter(product => (
    product.name.toLowerCase().includes(query.toLowerCase())
  ));

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
                onClick={() => setUserName('')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  className={classNames(
                    { 'is-active': user.name === userName },
                  )}
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => setUserName(user.name)}
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
                  onChange={event => setQuery(event.target.value)}
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
                onClick={() => setCategoryTitle('')}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                  onClick={() => setCategoryTitle(category.title)}
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
                onClick={() => {
                  setCategoryTitle('');
                  setUserName('');
                  setQuery('');
                }}
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

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
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

            <tbody>
              {visibleProducts.map(product => (
                <tr data-cy="Product">
                  <td
                    className="has-text-weight-bold"
                    data-cy="ProductId"
                  >
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category?.icon} - ${product.category?.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className="has-text-link"
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
