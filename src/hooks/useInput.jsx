import { useState } from 'react';

export default function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue || '');

  const onChangeInputs = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInput = (e) => {
    const targetValue = e.target.value || '';
    setValue(targetValue);
  };

  /**
   * TODO : change 'object' to specific class types
   */
  const onChanage = typeof defaultValue === 'object' ? onChangeInputs : onChangeInput;

  return [value, onChanage];
}
