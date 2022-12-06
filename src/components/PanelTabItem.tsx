import { User } from '../types/User';

type Props = {
  user: User,
};

export const PanelTabItem: React.FC<Props> = ({ user }) => {
  return (
    <a
      data-cy="FilterUser"
      href="#/"
    >
      {user.name}
    </a>
  );
};
