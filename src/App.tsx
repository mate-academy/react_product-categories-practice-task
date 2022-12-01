import './App.scss';

import usersFromServer from './api/users';
// import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { PanelTab } from './components/PanelTab';
import { CategoriesList } from './components/CategoriesList';
import { Category } from './types/Category';
// import { Table } from './components/Table';
// import { Product } from './types/Product';

export function getOwnerById(ownerId: number) {
  return usersFromServer.find(user => user.id === ownerId) || null;
}

export function getCategoryById(categoryId: number) {
  return categoriesFromServer.find(
    category => category.id === categoryId,
  ) || null;
}

export const App = () => {
  const modifiedCategoriesList: Category[] = categoriesFromServer
    .map(category => ({
      ...category,
      owner: getOwnerById(category.ownerId),
    }));

  // const modifiedProductsList: Product[] = productsFromServer
  //   .map(product => ({
  //     ...product,
  //     category: {
  //       ...getCategoryById(product.categoryId),
  //       owner: getOwnerById(getCategoryById(product.categoryId).ownerId),
  //     },
  //   }));

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <PanelTab users={usersFromServer} />

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

            <CategoriesList categories={modifiedCategoriesList} />

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

          {/* <Table products={modifiedProductsList} /> */}
        </div>
      </div>
    </div>
  );
};
