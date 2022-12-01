import classNames from 'classnames';
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState('');
  const [query, setQuery] = useState('');
  // const [categories, setCategories] = useState([]);

  const categoriesWithOwners = categoriesFromServer.map(category => {
    return {
      ...category,
      owner: usersFromServer.find(user => user.id === category.ownerId),
    };
  });

  const productsWitghCategory = productsFromServer.map(product => {
    return {
      ...product,
      category: categoriesWithOwners
        .find(category => category.id === product.categoryId),
    };
  });

  let filteredList = productsWitghCategory;

  if (filterBy.length > 0) {
    filteredList = productsWitghCategory.filter(product => (
      product.category?.owner?.name === filterBy
    ));
  }

  if (query.length > 0) {
    filteredList = filteredList.filter(product => (
      product.name.toLowerCase().includes(query.toLowerCase())
    ));
  }

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
                onClick={() => setFilterBy('')}
                className={classNames(
                  {
                    'is-active': filterBy === '',
                  },
                )}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => setFilterBy(user.name)}
                  className={classNames(
                    {
                      'is-active': filterBy === user.name,
                    },
                  )}
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
                  onChange={(event => {
                    setQuery(event.target.value);
                  })}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                { query.length > 0
                  && (
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
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={classNames(
                    'button',
                    'mr-2',
                    'my-1',
                  )}
                  href="#/"
                  key={category.id}
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
                  setQuery('');
                  setFilterBy('');
                }}

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredList.length === 0
            && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}
          {filteredList.length > 0
          && (
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
                {filteredList.map(product => (
                  <tr
                    data-cy="Product"
                    key={product.id}
                  >
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${product.category?.icon} - ${product.category?.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={classNames(
                        {
                          'has-text-link':
                          product.category?.owner?.sex === 'm',
                          'has-text-danger':
                          product.category?.owner?.sex === 'f',
                        },
                      )}
                    >
                      {product.category?.owner?.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
