import React from 'react';
import { redditService } from '../../services/redditService';

export const LastUpdated = () => {
  const { lastUpdated } = redditService.getState();
  return <p>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </p>;
};
