import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

interface Categories {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
}

interface Products {
  id: number,
  name: string,
  categoryId: number,
}

interface Users {
  id: number,
  name: string,
  sex: string,
}

interface Props {
  categories: Categories[],
  products: Products[],
  users: Users[],
  selectedUserId: number,
  onUserSelected: (user: Users) => void,
}

// export function sortByType(
//   names: string || number,
// ) {
//   const visibleNames = [...names];

//   visibleNames.sort((a, b) => {
//     if (typeof a === 'number') {
//       return a - b;
//     } else {
//       return a.localeCompare(b)
//     }
//   })
// }

export const App: React.FC<Props> = () => {
  const [query, setQuery] = useState('');

  const includesQuery = (productName: string) => (
    productName.toLowerCase().includes(query.toLowerCase())
  );

  const visibleProducts = productsFromServer.filter(product => (
    includesQuery(product.name)
  ));

  // const [names, setNames] = useState(false);

  // const changedNames = sortByType(
  //   productsFromServer,
  // );

  function getCategory(productCategoryId: number): Categories | null {
    const foundCategory = categoriesFromServer.find(category => (
      category.id === productCategoryId));

    return foundCategory || null;
  }

  function getUser(ownerId: number): Categories | null {
    const foundUser = usersFromServer.find(user => user.id === ownerId);

    return foundUser || null;
  }

  // const [selectedUser, setSelectedUser] = useState(0);
  // const onUserSelected = (user: Users) => setSelectedUser(user);

  // const selectedUser = usersFromServer.find(user => user.id === selectedUser.id);

  // const handleClickUser = (user: Users) => {
  //   if (user.id !== selectedUser.id) {
  //     onUserSelected(user);
  //   }
  // };

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

              {/* {usersFromServer.map(user => (
                <a
                  data-cy="FilterAllUsers"
                  href="#/"
                  key={user.id}
                  className={classNames(
                    {
                      'is-active': user.id === selectedUser.id,
                    },
                  )}
                  onClick={() => handleClickUser(user)}
                >
                  {user.name}
                </a>
              ))} */}

              <a
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
              {visibleProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${getCategory(product.categoryId).icon} - ${getCategory(product.categoryId).title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={classNames(
                      {
                        'has-text-link': getUser(getCategory(product.categoryId).ownerId).sex === 'm',
                        'has-text-danger': getUser(getCategory(product.categoryId).ownerId).sex === 'f',
                      },
                    )}
                  >
                    {getUser(getCategory(product.categoryId).ownerId).name}
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
