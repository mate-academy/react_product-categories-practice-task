import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import { User } from './types/User';
import { Product } from './types/Product';
import { Category } from './types/Category';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

function getUser(userId: number): User | null {
  const foundUserById = usersFromServer
    .find(user => user.id === userId);

  return foundUserById || null;
}

const categories: Category[] = categoriesFromServer
  .map(category => ({
    ...category,
    owner: getUser(category.ownerId),
  }));

function getCategory(categoryId: number): Category | null {
  const foundCategoryById = categories
    .find(category => category.id === categoryId);

  return foundCategoryById || null;
}

const products: Product[] = productsFromServer
  .map(product => ({
    ...product,
    category: getCategory(product.categoryId),
  }));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  let visibleProducts = [...products];

  const selectUser = (userName: string) => {
    return setSelectedUser(userName);
  };

  const resetQuery = () => {
    return setQuery('');
  };

  const resetAllFilters = () => {
    setSelectedUser('All');
    setQuery('');
  };

  const selectCategory = (categoryName: string) => {
    return setSelectedCategory(categoryName);
  };

  if (selectedUser !== 'All') {
    visibleProducts = products
      .filter(product => product.category?.owner?.name === selectedUser);
  }

  if (selectedCategory !== 'All') {
    visibleProducts = visibleProducts
      .filter(product => product.category?.title === selectedCategory);
  }

  if (query !== '') {
    visibleProducts = visibleProducts
      .filter(product => {
        const normalizedQuery = query.toLocaleLowerCase();
        const normalizedName = product.name.toLocaleLowerCase();

        return normalizedName.includes(normalizedQuery);
      });
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
                  'is-active': selectedUser === 'All',
                })}
                onClick={() => selectUser('All')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': selectedUser === user.name,
                  })}
                  onClick={() => selectUser(user.name)}
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
                  {query !== '' && (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => resetQuery()}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6',
                  {
                    'is-outlined': selectedCategory !== 'All',
                    'is-info': selectedCategory === 'All',
                  })}
              >
                All
              </a>

              {categories.map(category => (
                <a
                  data-cy="Category"
                  className={classNames('button mr-2 my-1',
                    {
                      'is-info': selectedCategory === category.title,
                    })}
                  href="#/"
                  onClick={() => selectCategory(category.title)}
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
                onClick={() => resetAllFilters()}
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

          {visibleProducts.length !== 0 && (
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
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
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
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {`${product.category?.icon} - ${product.category?.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames({
                        'has-text-link': product.category?.owner?.sex === 'm',
                        'has-text-danger': product.category?.owner?.sex === 'f',
                      })}
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
