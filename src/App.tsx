import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { User } from './types/User';
import { Product } from './types/Product';
import { Category } from './types/Category';

// enum SortType {
//   NONE,
//   ALPHABET,
//   LENGTH,
// }

// type ReorderOptions = {
//   sortType: SortType,
//   isReversed: boolean,
// };

export function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const categories: Category[] = categoriesFromServer.map(category => ({
  ...category,
  user: getUserById(category.ownerId),
}));

export function getCategoryById(categoryId: number): Category | null {
  const foundCategory = categoriesFromServer
    .find(category => category.id === categoryId);

  return foundCategory || null;
}

export const products: Product[] = productsFromServer.map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),
}));

export function getVisibleProducts(
  query: string,
) {
  const normalizedQuery = query.toLocaleLowerCase();

  return products.filter(product => (
    product.name.toLocaleLowerCase().includes(normalizedQuery)
    || product.name.toLocaleLowerCase().includes(normalizedQuery)));
}

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  // const visibleProducts = getVisibleProducts(productsFromServer, query);

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
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
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
                  onChange={((event) => setQuery(event.target.value))}
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
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
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
              {products.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td
                    className="has-text-weight-bold"
                    data-cy="ProductId"
                    key={product.id}
                  >
                    {product.id}
                  </td>
                  <td data-cy="ProductName">
                    {product.name}
                  </td>
                  <td data-cy="ProductCategory">
                    {product.category?.icon}
                    -
                    {product.category?.title}
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={classNames({
                      'has-text-link': product.category?.user?.sex === 'm',
                    },
                    {
                      'has-text-danger': product.category?.user?.sex === 'f',
                    })}
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
