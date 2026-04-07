import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../context/PostsContext';

interface Props {
  authorName: string;
  setAuthorName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: (
    name: string,
    email: string,
    postId: number,
    body: string,
  ) => void;
  isAddCommentLoading: boolean;
}

export const NewCommentForm: React.FC<Props> = ({
  authorName,
  setAuthorName,
  email,
  setEmail,
  commentText,
  setCommentText,
  handleAddComment,
  isAddCommentLoading,
}) => {
  const { selectedPost } = useContext(PostsContext);

  const [nameInputError, setNameInputError] = useState('');
  const [emailInputError, setEmailInputError] = useState('');
  const [commentInputError, setCommentInputError] = useState('');

  const handleSetAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const clearValue = value.trim();
    const isEmpty = clearValue.length === 0 && value.length > 0;

    setAuthorName(value);

    setNameInputError(isEmpty ? 'Task title cannot be empty' : '');
  };

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const clearValue = value.trim();
    const isEmpty = clearValue.length === 0 && value.length > 0;

    setEmail(value);

    setEmailInputError(isEmpty ? 'Task title cannot be empty' : '');
  };

  const handleSetCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const clearValue = value.trim();
    const isEmpty = clearValue.length === 0 && value.length > 0;

    setCommentText(value);

    setCommentInputError(isEmpty ? 'Task title cannot be empty' : '');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameInputError('');
    setEmailInputError('');
    setCommentInputError('');

    let hasError = false;

    if (!authorName.trim()) {
      setNameInputError('Name is required');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailInputError('Email is required');
      hasError = true;
    }

    if (!commentText.trim()) {
      setCommentInputError('Enter some text');
      hasError = true;
    }

    if (hasError || !selectedPost) {
      return;
    }

    handleAddComment(authorName, email, selectedPost.id, commentText);
    setCommentText('');
  };

  const handleClear = () => {
    setAuthorName('');
    setEmail('');
    setCommentText('');

    setNameInputError('');
    setEmailInputError('');
    setCommentInputError('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': nameInputError,
            })}
            onInput={handleSetAuthor}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameInputError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': emailInputError,
            })}
            onInput={handleSetEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailInputError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': commentInputError,
            })}
            onInput={handleSetCommentText}
          />
        </div>

        {commentInputError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isAddCommentLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
