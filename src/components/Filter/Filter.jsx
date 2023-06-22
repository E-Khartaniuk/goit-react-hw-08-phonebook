import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';
import { filter } from 'redux/store';


export default function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter);
  const [inputFilterValue, setInputFilterValue] = useState(filterValue);



  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setInputFilterValue(value);
    dispatch(
      filter(value)
       );
  };

  return (
    <input
      className={css.filterInput}
      name="filter"
      value={inputFilterValue}
      onChange={handleFilterChange}
    ></input>
  );
}
