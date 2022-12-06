import { Category } from '../types/Category';

type Props = {
  category: Category;
};

export const CategoryInfo: React.FC<Props> = ({ category }) => {
  return (
    <a
      data-cy="Category"
      className="button mr-2 my-1"
      href="#/"
    >
      {category.title}
    </a>
  );
};
