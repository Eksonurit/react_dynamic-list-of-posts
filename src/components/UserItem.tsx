import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { User } from '../types/User';

interface UserItemProps {
  user: User;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { handleUserSelect } = useContext(PostsContext);

  return (
    <a
      href={`#user-${user.id}`}
      className="dropdown-item"
      onClick={e => {
        e.preventDefault();
        handleUserSelect(user);
      }}
    >
      {user.name}
    </a>
  );
};
