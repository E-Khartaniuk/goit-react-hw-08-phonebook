import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './Filter.module.css';
import { filter } from 'redux/store';
import { TextField } from '@mui/material';

export default function Filter() {
  const dispatch = useDispatch();
  const [inputFilterValue, setInputFilterValue] = useState('');

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setInputFilterValue(value);
    dispatch(filter(value));
  };

  return (
    <div className={css.filterInput}>
      <h4>Find Contact</h4>
      <TextField
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        name="filter"
        value={inputFilterValue}
        onChange={handleFilterChange}
      />
    </div>
  );
}
