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
  user: User | null,
}

interface Product {
  id: number,
  name: string,
  categoryId: number,
  category: Category | null,
}

function findUserByOwnerId(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const categories: Category[] = categoriesFromServer.map(category => ({
  ...category,
  user: (findUserByOwnerId(category.ownerId)),
}));

function findCategoryById(categoryId: number): Category | null {
  return categories
    .find(category => category.id === categoryId) || null;
}

export const products: Product[] = productsFromServer.map(product => ({
  ...product,
  category: findCategoryById(product.categoryId),
}));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isNoUsersSelected, setIsNoUserSelected] = useState(false);

  const [query, setQuery] = useState('');

  let visibleProducts = [...products];

  if (query !== '') {
    const normalizedQuery = query.toLocaleLowerCase();

    visibleProducts = visibleProducts.filter(product => {
      const normalizedName = product.name.toLocaleLowerCase();

      return normalizedName.includes(normalizedQuery);
    });
  }

  visibleProducts = visibleProducts.filter(product => {
    if (!selectedUser) {
      return true;
    }

    return selectedUser.id === product.category?.ownerId;
  });

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
                onClick={() => {
                  setSelectedUser(null);
                  setIsNoUserSelected(false);
                }}
                className={classNames({
                  'is-active': !isNoUsersSelected,
                })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsNoUserSelected(true);
                  }}
                  className={classNames({
                    'is-active': isNoUsersSelected
                      && user.id === selectedUser?.id,
                  })}
                >
                  {`User ${user.id}`}
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

                {query.length > 0 && (
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

              {categories.map(category => (
                <a
                  data-cy="Category"
                  key={category.id}
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
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!visibleProducts.length && (
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
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    {product.category && (
                      <td data-cy="ProductCategory">
                        {`${product.category.icon} - ${product.category.title}`}
                      </td>
                    )}

                    {product.category && product.category.user && (
                      <td
                        data-cy="ProductUser"
                        className={classNames(
                          {
                            'has-text-link': product.category.user.sex === 'm',
                          },
                          {
                            'has-text-danger':
                              product.category.user.sex === 'f',
                          },
                        )}
                      >
                        {product.category.user.name}
                      </td>
                    )}
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
