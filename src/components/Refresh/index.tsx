import React, { useCallback } from 'react'
import { pickerService } from '../../services/pickerService';
import { redditService } from '../../services/redditService';

export const Refresh = () => {
  const { value } = pickerService.selectAll();

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleClick = useCallback(() => redditService.fetchSubreddit(value), []);

  return (
    <button onClick={handleClick}>
      Refresh
    </button>
  );
}
