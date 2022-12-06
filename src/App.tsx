/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import { Product } from './types/Product';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

export function getCategoryByID(categoryId?: number) {
  const foundCategory = categoriesFromServer
    .find(category => category.id === categoryId);

  return foundCategory || null;
}

export function getUserByID(userId?: number) {
  const foundUser = usersFromServer
    .find(user => user.id === userId);

  return foundUser || null;
}

export const products: Product[] = productsFromServer.map(product => {
  const category = getCategoryByID(product.categoryId);
  const user = getUserByID(category?.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [clickCount, setClickCount] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  const resetAll = () => {
    setQuery('');
    setSelectedUserId(null);
    setSelectedCategory('All');
    setClickCount(0);
    setIsReversed(false);
  };

  let visibleProducts = [...products];

  if (selectedUserId) {
    visibleProducts = visibleProducts.filter(product => (
      product.user?.id === selectedUserId
    ));
  }

  if (query !== '') {
    const normalizedQuery = query.toLocaleLowerCase();

    visibleProducts = visibleProducts.filter(product => (
      product.name.toLocaleLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedCategory === 'Grocery') {
    visibleProducts = visibleProducts.filter(product => (
      product.category?.title === 'Grocery'
    ));
  }

  if (selectedCategory === 'Drinks') {
    visibleProducts = visibleProducts.filter(product => (
      product.category?.title === 'Drinks'
    ));
  }

  if (selectedCategory === 'Fruits') {
    visibleProducts = visibleProducts.filter(product => (
      product.category?.title === 'Fruits'
    ));
  }

  if (selectedCategory === 'Electronics') {
    visibleProducts = visibleProducts.filter(product => (
      product.category?.title === 'Electronics'
    ));
  }

  if (selectedCategory === 'Clothes') {
    visibleProducts = visibleProducts.filter(product => (
      product.category?.title === 'Clothes'
    ));
  }

  if (isReversed) {
    visibleProducts = visibleProducts.reverse();
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
                className={classNames({
                  'is-active': selectedUserId === null,
                })}
                onClick={() => setSelectedUserId(null)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': selectedUserId === user.id,
                  })}
                  onClick={() => setSelectedUserId(user.id)}
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

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setQuery('')}
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedCategory !== 'All',
                })}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': category.title === selectedCategory,
                  })}
                  href="#/"
                  onClick={() => setSelectedCategory(category.title)}
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
                onClick={resetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          {visibleProducts.length > 0 && (
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
                          <i
                            data-cy="SortIcon"
                            className={classNames('fas', {
                              'fa-sort': clickCount === 0 || clickCount === 3,
                              'fa-sort-up': clickCount === 1,
                              'fa-sort-down': clickCount === 2,
                            })}
                            onClick={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                            onKeyDown={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product

                      <a href="#/">
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={classNames('fas', {
                              'fa-sort': clickCount === 0 || clickCount === 3,
                              'fa-sort-up': clickCount === 1,
                              'fa-sort-down': clickCount === 2,
                            })}
                            onClick={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                            onKeyDown={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category

                      <a href="#/">
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={classNames('fas', {
                              'fa-sort': clickCount === 0 || clickCount === 3,
                              'fa-sort-up': clickCount === 1,
                              'fa-sort-down': clickCount === 2,
                            })}
                            onClick={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                            onKeyDown={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User

                      <a href="#/">
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={classNames('fas', {
                              'fa-sort': clickCount === 0 || clickCount === 3,
                              'fa-sort-up': clickCount === 1,
                              'fa-sort-down': clickCount === 2,
                            })}
                            onClick={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                            onKeyDown={() => {
                              setClickCount(0);
                              setIsReversed(false);

                              if (clickCount < 3) {
                                setClickCount(clickCount + 1);
                              }

                              if (clickCount > 0) {
                                setIsReversed(true);
                              }
                            }}
                          />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(product => (
                  <tr data-cy="Product" key={product.id}>
                    <td
                      className="has-text-weight-bold"
                      data-cy="ProductId"
                    >
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {
                        `${product.category?.icon}
                         -
                         ${product.category?.title}`
                      }
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames({
                        'has-text-link': product.user?.sex === 'm',
                        'has-text-danger': product.user?.sex === 'f',
                      })}
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
