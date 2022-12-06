import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { Product } from './types/product';

function findUser(userID?: number) {
  const neededUser = usersFromServer.find(user => user.id === userID);

  return neededUser || null;
}

function findCategory(categoryID: number) {
  const category = categoriesFromServer.find(c => c.id === categoryID);

  return category || null;
}

const products: Product[] = productsFromServer.map(product => {
  const categoryById = findCategory(product.categoryId);
  const user = findUser(categoryById?.ownerId);

  return {
    ...product,
    category: categoryById,
    user,
  };
});

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number[]>([]);

  let productsCopy = [...products];

  if (selectedUserId) {
    productsCopy = productsCopy.filter(
      product => product.user?.id === selectedUserId,
    );
  }

  if (query !== '') {
    const lowerQuery = query.toLocaleLowerCase();

    productsCopy = productsCopy.filter(product => (
      product.name.toLocaleLowerCase().includes(lowerQuery)
    ));
  }

  if (selectedCategoryId.length > 0) {
    productsCopy = productsCopy.filter(product => (
      selectedCategoryId.includes(product.categoryId)
    ));
  }

  function handleCategories(categoryID: number) {
    const selectCategory = [...selectedCategoryId];

    if (selectCategory.includes(categoryID)) {
      const findedID = selectCategory.indexOf(categoryID);

      selectCategory.splice(findedID, 1);
    } else {
      selectCategory.push(categoryID);
    }

    return selectCategory;
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
                  {
                    'is-active': selectedUserId === null,
                  },
                )}
                onClick={() => setSelectedUserId(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={classNames(
                    {
                      'is-active': user.id === selectedUserId,
                    },
                  )}
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
                className={classNames(
                  'button is-success mr-6',
                  {
                    'is-outlined': selectedCategoryId.length > 0,
                  },
                )}
                onClick={() => setSelectedCategoryId([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={classNames(
                    'button mr-2 my-1',
                    {
                      'is-info': selectedCategoryId.includes(category.id),
                    },
                  )}
                  href="#/"
                  onClick={() => setSelectedCategoryId(
                    handleCategories(category.id),
                  )}
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
                  setSelectedUserId(null);
                  setQuery('');
                  setSelectedCategoryId([]);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {productsCopy.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No results
            </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            {productsCopy.length > 0 && (
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
              {productsCopy.map(product => (
                <tr data-cy="Product" key={product.id}>
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
