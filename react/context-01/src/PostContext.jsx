/* eslint-disable react/prop-types */

// NOTE: only optimize context when these things happens in the same time
// 1. state in the context need to changes frequently
// 2. context has many consumers
// 3. app is slow due to this context

import { useContext, createContext, useState, useMemo } from 'react';
import { faker } from '@faker-js/faker';

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// 1. create a new context
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost()),
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // NOTE: since context provider will re-render once its parent component re-render,
  // the value object will be seem as a different object, and cause its consumer also re-render.
  // We usually preserve one state per context to avoid the consumer update by irrelevant value update.
  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return (
    <PostContext.Provider value={value}>
      {/* NOTE: consumer component can avoid wasted render */}
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error('PostContext was used outside of the PostProvider');
  return context;
}

export { PostProvider, usePosts, PostContext };
