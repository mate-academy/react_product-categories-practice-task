import { Category } from '../types/Category';
import { CategoryInfo } from './CategoryInfo';

type Props = {
  categories: Category[];
};

export const CategoriesList: React.FC<Props> = ({ categories }) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
      >
        All
      </a>

      {categories.map(category => (
        <CategoryInfo category={category} />
      ))}
    </div>
  );
};
