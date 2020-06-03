import React, { useEffect } from 'react';
import { useService } from 'src/hooks/useService';
import { Picker } from 'src/components/Picker';
import { Refresh } from 'src/components/Refresh';
import { Post } from 'src/components/Post';
import { LastUpdated } from 'src/components/LastUpdated';
import { pickerService } from '../../services/pickerService';
import { redditService, RedditState } from '../../services/redditService';

export const App = () => {
  const { isFetching, posts } = useService<RedditState>(redditService);

  useEffect(() => {
    const value = pickerService.selectSnapshot('value');
    redditService.fetchSubreddit(value);
  }, []);

  return (
    <div>
      <Picker />

      <LastUpdated />

      <Refresh />

      {isFetching && <h2>Loading...</h2>}

      {!isFetching && !Boolean(posts.length) && <h2>Empty</h2>}

      <ul>
        {posts.map((post: any) => (
          <Post key={post.title} post={post} />
        ))}
      </ul>
    </div>
  );
};
