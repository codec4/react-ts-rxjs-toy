import React, { useEffect, useState, memo } from 'react';
import { useService } from 'src/hooks/useService';
import { pickerService, PickerState } from '../../services/pickerService';
import { redditService } from '../../services/redditService';

export const Picker = memo(() => {
  const { value, options } = useService<PickerState>(pickerService);
  const [option, setOption] = useState(value);

  useEffect(() => {
    redditService.fetchSubreddit(option);
  }, [option]);

  return (
    <span>
      <h1>{option}</h1>
      <select onChange={(e) => setOption(e.target.value)}>
        {options.map((o) => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </select>
    </span>
  );
});
