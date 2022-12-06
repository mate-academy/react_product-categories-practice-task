import { User } from '../types/User';
import { PanelTabItem } from './PanelTabItem';

type Props = {
  users: User[],
};

export const PanelTab: React.FC<Props> = ({ users }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
      >
        All
      </a>

      {users.map(user => (
        <PanelTabItem user={user} />
      ))}

      {/* <a
        data-cy="FilterUser"
        href="#/"
        className="is-active"
      >
        User 2
      </a> */}
    </p>
  );
};
