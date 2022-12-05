/* eslint-disable max-len */
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
  // owner: User | null,
}

interface CategoryExtended extends Category {
//   // id: number,
//   // title: string,
//   // icon: string,
//   // ownerId: number,
  owner: User | null,
}

interface Product {
  id: number,
  name: string,
  categoryId: number,
  category: CategoryExtended | null,
}

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const categories: CategoryExtended[] = categoriesFromServer.map((category: Category) => ({
  ...category,
  owner: getUser(category.ownerId),
}));

function getCategory(categoryId: number): CategoryExtended | null {
  const foundCategory = categories.find(category => category.id === categoryId);

  return foundCategory || null;
}

export const products: Product[] = productsFromServer.map(product => ({
  ...product,
  // user: getUser(product.userId),
  category: getCategory(product.categoryId),
}));

export const App: React.FC = () => {
  const [activeOwner, setActiveOwner] = useState(['All']);
  const [query, setQuery] = useState('');

  const visibleProducts = products.filter((product: Product) => {
    let userFilter = true;
    let nameFilter = true;

    // eslint-disable-next-line no-console
    console.log(activeOwner);

    if (!(activeOwner.includes('All')) && product.category?.owner?.name !== undefined) {
      userFilter = activeOwner.includes(product.category?.owner?.name);
      // eslint-disable-next-line no-console
      console.log(activeOwner.includes(product.category?.owner?.name));
    }

    if (query !== '') {
      nameFilter = product.name.toLowerCase().includes(query.toLowerCase());
    }

    return nameFilter && userFilter;
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
                onClick={(e) => {
                  e.preventDefault();
                  if (activeOwner.includes('All')) {
                    setActiveOwner([...activeOwner, 'All']);
                  }
                }}
                className={classNames({ 'is-active': activeOwner.includes('All') })}
              >
                All
              </a>
              {usersFromServer.map((user: User) => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!activeOwner.includes(user.name)) {
                      setActiveOwner([...activeOwner, user.name].filter(el => el !== 'All'));
                    } else {
                      setActiveOwner(activeOwner.filter(el => el !== user.name));
                    }
                  }}
                  className={classNames({ 'is-active': activeOwner.includes(user.name) })}
                >
                  {user.name}
                </a>
              ))}

              {/* <a
                data-cy="FilterUser"
                href="#/"
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 3
              </a> */}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
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
                    onClick={() => {
                      if (query !== '') {
                        setQuery('');
                      }
                    }}
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
              {categoriesFromServer.map((category: Category) => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}

              {/* <a
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
              </a> */}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setActiveOwner(['All']);
                  setQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>
        <div className="box table-container">
          { visibleProducts.length < 1
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
            : (
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
                  {visibleProducts.map((product: Product) => (
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product?.category?.icon} - ${product?.category?.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={classNames(
                          {
                            'has-text-link': product?.category?.owner?.sex === 'm',
                            'has-text-danger': product?.category?.owner?.sex === 'f',
                          },
                        )}
                      >
                        {product?.category?.owner?.name}
                      </td>
                    </tr>
                  ))}

                  {/* <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    2
                  </td>

                  <td data-cy="ProductName">Bread</td>
                  <td data-cy="ProductCategory">🍞 - Grocery</td>

                  <td
                    data-cy="ProductUser"
                    className="has-text-danger"
                  >
                    Anna
                  </td>
                </tr>

                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    3
                  </td>

                  <td data-cy="ProductName">iPhone</td>
                  <td data-cy="ProductCategory">💻 - Electronics</td>

                  <td
                    data-cy="ProductUser"
                    className="has-text-link"
                  >
                    Roma
                  </td>
                </tr> */}
                </tbody>
              </table>
            )}

        </div>
      </div>
    </div>
  );
};
