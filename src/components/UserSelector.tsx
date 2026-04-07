import React, { useContext, useState } from 'react';
import { User } from '../types/User';
import { UserItem } from './UserItem';
import cn from 'classnames';
import { PostsContext } from '../context/PostsContext';

interface UserSelectorProps {
  users: User[];
}

export const UserSelector: React.FC<UserSelectorProps> = ({ users }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedUser } = useContext(PostsContext);

  return (
    <div
      data-cy="UserSelector"
      onClick={() => setIsOpen(prevState => (prevState ? false : true))}
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return <UserItem key={user.id} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};
