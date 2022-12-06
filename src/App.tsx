/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { Product } from './types/Product';

function findCategoryById(categoryId: number) {
  return categoriesFromServer.find(
    category => category.id === categoryId,
  ) || null;
}

function findUserById(userId: number) {
  return usersFromServer.find(
    user => user.id === userId,
  ) || null;
}

export const App: React.FC = () => {
  const preparedProducts: Product[] = productsFromServer.map(
    product => ({
      ...product,
      category: findCategoryById(product.categoryId),
      user: findUserById(findCategoryById(product.categoryId)?.ownerId || -1),
    }),
  );

  const [selectedUser, setSelectedUser] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  // const [selectedCategories, setSelectedCategories] = useState([]);

  let filteredProducts = preparedProducts.filter(
    user => user.user?.id === selectedUser,
  );

  filteredProducts = selectedUser === 0
    ? preparedProducts
    : filteredProducts;

  filteredProducts = filteredProducts.filter(
    product => product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

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
                className={classNames(
                  {
                    'is-active': selectedUser === 0,
                  },
                )}
                onClick={() => setSelectedUser(0)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames(
                    {
                      'is-active': selectedUser === user.id,
                    },
                  )}
                  onClick={() => setSelectedUser(user.id)}
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
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchValue !== ''
                    && (
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => setSearchValue('')}
                      />
                    )}
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

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
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
                  setSelectedUser(0);
                  setSearchValue('');
                }}

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0
            && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}

          {filteredProducts.length > 0
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
                  {filteredProducts
                    .map(product => (
                      <tr data-cy="Product">
                        <td className="has-text-weight-bold" data-cy="ProductId">
                          {product.id}
                        </td>

                        <td data-cy="ProductName">
                          {product.name}
                        </td>
                        <td data-cy="ProductCategory">
                          {`${product.category?.icon} - ${product.category?.title}`}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={classNames(
                            {
                              'has-text-link': product.user?.sex === 'm',
                            },
                            {
                              'has-text-danger': product.user?.sex === 'f',
                            },
                          )}
                        >
                          {product.user?.name}
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
