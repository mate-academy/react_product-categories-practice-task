import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

interface Product {
  id: number,
  name: string,
  categoryId: number,
}

export const App: React.FC = () => {
  const findProductCategories = (product: Product) => (
    categoriesFromServer.find(category => category.id === product.categoryId)
      || categoriesFromServer[0]
  );

  const findOwner = (product: Product) => (
    usersFromServer.find(user => (
      user.id === findProductCategories(product).ownerId))
      || usersFromServer[0]
  );

  const [selectedUserId, setUserId] = useState(0);
  const [query, setQuery] = useState('');

  const textIncluding = (text: string) => (
    text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  const visibleProducts = productsFromServer.filter(product => (
    textIncluding(product.name)
  ));

  const isHidden: boolean = query.length === 0;

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
                onClick={() => setUserId(0)}
                className={classNames({
                  'is-active': selectedUserId === 0,
                })}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setUserId(1)}
                className={classNames({
                  'is-active': selectedUserId === 1,
                })}
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setUserId(2)}
                className={classNames({
                  'is-active': selectedUserId === 2,
                })}
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setUserId(3)}
                className={classNames({
                  'is-active': selectedUserId === 3,
                })}
              >
                User 3
              </a>
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

                {!isHidden && (
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
          {!(visibleProducts.length > 0) && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

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
                findOwner(product).id === selectedUserId && (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${findProductCategories(product).icon} - ${findProductCategories(product).title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={classNames(
                        findOwner(product).sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger',
                      )}
                    >
                      {`${findOwner(product).name}`}
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
