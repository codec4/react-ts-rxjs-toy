import React from 'react'
import { BehaviorSubject } from 'rxjs'
import { useSharedState } from 'src/hooks/useSharedState'

export enum Option {
  ReactJS = 'reactjs',
  Angular = 'angular',
  WebDevelopment = 'webdevelopment',
}

export const PickerStateSubject = new BehaviorSubject({
  value: Option.ReactJS,
})

export const Picker: React.SFC<{ options: string[] }> = props => {
  const [{ value }, setState] = useSharedState(PickerStateSubject)
  const { options } = props
  return (
    <span>
      <h1>{value || options[0]}</h1>
      <select onChange={e => setState({ value: e.target.value })}>
        {options.map(o => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </select>
    </span>
  )
}
