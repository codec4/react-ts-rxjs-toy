import React, { useEffect } from 'react'
import { useService } from 'src/hooks/useService'
import { pickerService, PickerState } from '../../services/pickerService';
import { redditService } from '../../services/redditService';

export const Picker = () => {
  const [{ value, options }, setPickerState] = useService<PickerState>(pickerService);

  useEffect(() => {
    redditService.fetchSubreddit(value);
  }, [value]);

  return (
    <span>
      <h1>{value}</h1>
      <select onChange={e => setPickerState({ value: e.target.value })}>
        {options.map(o => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </select>
    </span>
  );
}
