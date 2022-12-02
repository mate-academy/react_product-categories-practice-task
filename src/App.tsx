import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

interface User {
  id: number,
  name: string,
  sex: string,
}
export const userInfo: React.FC<User> = (user) => {
  const { name } = user;

  return (
    <td
      data-cy="ProductUser"
      className="has-text-danger"
    >
      {name}
    </td>
  );
};

interface Categories {
  id: number,
  title: string,
  icon: string,
  ovnerId: number,
}

export const categoriesInfo: React.FC<Categories> = (category) => {
  const { title, icon } = category;

  return (
    <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>
  );
};

interface Products {
  name: string,
  icon: string,
  id: number,
  caregoryId: number,
}

export const productsInfo: React.FC<Products> = (product) => {
  const { name, id } = product;

  return (
    <>
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
    </>
  );
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isInputEmpty, setTsInputEmpty] = useState(true);

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
                  key={user.id}
                >
                  { user.name }
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
                  onChange={(event) => {
                    setTsInputEmpty(false);
                    setQuery(event.target.value);
                  }}
                />

                {isInputEmpty && !query && (
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                )}

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

              {categoriesFromServer.map(({ id, title }) => (
                <a
                  href="#/"
                  data-cy="AllCategories"
                  className="button is-success mr-6 is-outlined"
                  key={id}
                >
                  {title}
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
              <tr>
                {
                  productsFromServer.map(produt => (
                    <>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {produt.id}
                      </td>

                      <td data-cy="ProductName">{produt.name}</td>
                    </>
                  ))
                }
                {
                  categoriesFromServer.map(category => (
                    <>
                      <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>
                    </>
                  ))
                }
                {
                  usersFromServer.map(user => (
                    <>
                      <td
                        data-cy="ProductUser"
                        className="has-text-link"
                      >
                        {user.name}
                      </td>
                    </>
                  ))
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
