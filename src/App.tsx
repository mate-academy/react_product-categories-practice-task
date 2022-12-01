import React, { useState } from 'react';
import './App.scss';
// import classNames from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

enum FilterType {
  Drinks,
  Grocery,
  Clothes,
  Electronics,
  Fruits,
}

const filterTable = (str: string) => {
  return productsFromServer.filter(
    product => product.name.toLowerCase().includes(str.toLowerCase()),
  );
};

// const getFilteredProducts = (filterType: number) => {
//   switch (filterType) {
//     case FilterType.Clothes:
//       return productsFromServer.filter(product => product.categoryId === 5);
//     case FilterType.Drinks:
//       return productsFromServer.filter(product => product.categoryId === 2);
//     case FilterType.Grocery:
//       return productsFromServer.filter(product => product.categoryId === 1);
//     case FilterType.Fruits:
//       return productsFromServer.filter(product => product.categoryId === 3);
//     case FilterType.Electronics:
//       return productsFromServer.filter(product => product.categoryId === 4);

//     default:
//       return 0;
//   }
// };

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  // const [filtered, setFiltered] = useState(0);

  const visibleProd = filterTable(query);
  // const filteredProd = getFilteredProducts(filtered);

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
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => setFiltered(0)}
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                onClick={() => setFiltered(FilterType.Grocery)}
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
                onClick={() => setFiltered(FilterType.Drinks)}
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                onClick={() => setFiltered(FilterType.Fruits)}
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
                onClick={() => setFiltered(FilterType.Electronics)}
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => setQuery('')}
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
              {visibleProd.map(product => (
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>
                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {categoriesFromServer
                      .find(category => category.id
                      === product.categoryId)?.icon}
                    {' - '}
                    {categoriesFromServer
                      .find(category => category.id
                      === product.categoryId)?.title}
                  </td>
                  <td
                    data-cy="ProductUser"
                    // className={classNames(
                    //   'has-text-link',
                    //   {
                    //     'has-text-danger': usersFromServer.find(user => user.id
                    //       === categoriesFromServer.find(category => category.id
                    //       === product.categoryId)?.ownerId).sex === 'f',
                    //   },
                    // )}
                  >
                    {usersFromServer.find(user => user.id
                    === categoriesFromServer
                      .find(category => category.id
                      === product.categoryId)?.ownerId)?.name}
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
