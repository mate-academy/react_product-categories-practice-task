import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import categoriesFromServer from './api/categories';
import usersFromServer from './api/users';
import productsFromServer from './api/products';
import { User } from './api/types/user';
import { Category } from './api/types/category';
import { Product } from './api/types/product';

function getCategoryById(categoryId: number): Category | null {
  return categoriesFromServer.find(
    category => category.id === categoryId,
  ) || null;
}

function getUserById(ownerId = 0): User | null {
  return usersFromServer.find(
    user => user.id === ownerId,
  ) || null;
}

const prepProducts: Product[] = [...productsFromServer].map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),

}));

export const products: Product[] = [...prepProducts].map(product => ({
  ...product,
  user: getUserById(product.category?.ownerId),
}));

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedCategoryId,
    setSelectedCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  let visibleProducts: Product[] = [...products];

  if (selectedUserId) {
    visibleProducts = visibleProducts.filter(product => (
      product.user?.id === selectedUserId
    ));
  }

  if (query !== '') {
    visibleProducts = visibleProducts.filter(product => (
      product.name.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (selectedCategoryId) {
    visibleProducts = visibleProducts.filter(product => (
      selectedCategoryId === product.category?.id
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
                className={classNames({
                  'is-activ': selectedUserId === null,
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
                    'is-activ': user.id === selectedUserId,
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
                onClick={() => setSelectedCategoryId(null)}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                  onClick={() => setSelectedCategoryId(category.id)}
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
                  setSelectedCategoryId(null);
                  setQuery('');
                }}

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {products.length === 0 && (
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
                  key={product.id}
                  data-cy="Product"
                >
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>

                  <td
                    data-cy="ProductCategory"
                  >
                    {product.category?.icon}
                    {' - '}
                    {product.category?.title}

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
        </div>
      </div>
    </div>
  );
};
