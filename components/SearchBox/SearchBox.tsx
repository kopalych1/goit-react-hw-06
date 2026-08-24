import styles from './SearchBox.module.css';
import { useState } from 'react';

interface SearchBoxProps {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  }

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
}
