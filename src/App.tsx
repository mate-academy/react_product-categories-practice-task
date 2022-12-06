import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

const findUser = (userId?: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const findCategory = (categoryId: number) => {
  return categoriesFromServer.find(
    category => category.id === categoryId,
  )
      || null;
};

const productsWithAll = productsFromServer.map(product => {
  return {
    ...product,
    category: findCategory(product.categoryId),
    user: findUser(findCategory(product.categoryId)?.ownerId),
  };
});

export const App: React.FC = () => {
  const [selectedUserId, setUserId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCategoryId, setCategoryId] = useState<number[]>([]);

  let visibleProducts = [...productsWithAll];

  if (selectedUserId) {
    visibleProducts = productsWithAll.filter(product => {
      return product.user?.id === selectedUserId;
    });
  }

  if (query.length > 0) {
    visibleProducts = visibleProducts.filter(product => (
      product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ));
  }

  if (selectedCategoryId.length > 0) {
    visibleProducts = visibleProducts.filter(product => (
      selectedCategoryId.join('').includes(`${product.category?.id}`)
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
                className={classNames(
                  { 'is-active': selectedUserId === null },
                )}
                onClick={() => setUserId(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames(
                    { 'is-active': selectedUserId === user.id },
                  )}
                  onClick={() => setUserId(user.id)}
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
                className={classNames('button is-success mr-6',
                  {
                    'is-outlined': selectedCategoryId.length !== 0,
                  })}
                onClick={() => setCategoryId([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={classNames('button mr-2 my-1',
                    {
                      'is-info':
                        selectedCategoryId.join('').includes(`${category.id}`),
                    })}
                  href="#/"
                  onClick={() => {
                    if (!selectedCategoryId.includes(category.id)) {
                      const copy = [...selectedCategoryId];

                      copy.push(category.id);
                      setCategoryId(copy);
                    } else {
                      const copy = [...selectedCategoryId];

                      copy.splice(selectedCategoryId.indexOf(category.id), 1);
                      setCategoryId(copy);
                    }
                  }}
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
                  setUserId(null);
                  setCategoryId([]);
                }}

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
                        'has-text-link': product.user?.sex === 'm',
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
        </div>
      </div>
    </div>
  );
};
