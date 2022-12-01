import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { ProductsList } from './components/ProductsList/ProductsList';
// import { UserList } from './components/UserList/UserList';

import { Product } from './Types/Product';
import { Category } from './Types/Category';
import { User } from './Types/User';

// enum SortType {
//   NONE,
//   ALPABET,
//   LENGTH,
// }

// type State = {
//   sortType: SortType,
//   isReversed: boolean,
// };

function getCategory(categoryId: number): Category | null {
  const foundCategory = categoriesFromServer
    .find(category => category.id === categoryId);

  return foundCategory || null;
}

function getOwner(category: Category | null): User | null {
  if (!category) {
    return category;
  }

  const foundedCategory = usersFromServer
    .find(user => user.id === category.ownerId);

  return foundedCategory || null;
}

export const allProducts: Product[] = productsFromServer.map(product => ({
  ...product,
  category: getCategory(product.categoryId),
  owner: getOwner(getCategory(product.categoryId)),
}));

export const allUsers: User[] = [
  { id: 0, name: 'All', sex: '' },
  ...usersFromServer,
];

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('All');

  let visibleProducts = allProducts;

  if (selectedUser !== 'All') {
    visibleProducts = allProducts
      .filter(product => product.owner?.name === selectedUser);
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              {allUsers.map((user) => (
                <a
                  data-cy="FilterAllUsers"
                  href="#/"
                  key={user.id}
                  onClick={() => setSelectedUser(user.name)}
                  className={classNames(
                    { 'is-active': selectedUser === user.name },
                  )}
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
                  value="qwe"
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
          {true
            && (
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

            <ProductsList products={visibleProducts} />
          </table>
        </div>
      </div>
    </div>
  );
};
