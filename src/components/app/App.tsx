import React, { useEffect } from 'react'
import {  useService } from 'src/hooks/useService'
import { Picker } from 'src/components/Picker'
import { Refresh } from 'src/components/Refresh'
import { Post } from 'src/components/Post'
import { LastUpdated } from 'src/components/LastUpdated';
import { pickerService } from '../../services/pickerService';
import { redditService, RedditState } from '../../services/redditService';

export const App = () => {
  const [{ isFetching, posts }] = useService<RedditState>(redditService);
  const isLoading = isFetching && posts.length === 0;
  const isEmpty = !isFetching && posts.length === 0;

  useEffect(() => {
    const { value } = pickerService.selectAll();
    redditService.fetchSubreddit(value);
  }, []);

  return (
    <div>
      <Picker />
      <LastUpdated />
      <Refresh />
      {isLoading && <h2>Loading...</h2>}
      {isEmpty && <h2>Empty</h2>}
      <ul>
        {posts.map((post: any) => (
          <Post key={post.title} post={post} />
        ))}
      </ul>
    </div>
  );
}
