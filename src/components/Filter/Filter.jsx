import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';
import { filter } from 'redux/store';
// import cssTitle from './styleMain/styleMaine.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter);
  const [inputFilterValue, setInputFilterValue] = useState(filterValue);

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setInputFilterValue(value);
    dispatch(filter(value));
  };

  return (
    <>
      <h4
      // className={cssTitle.titleSecond}
      >
        Find Contact
      </h4>
      <input
        className={css.filterInput}
        name="filter"
        value={inputFilterValue}
        onChange={handleFilterChange}
      ></input>
    </>
  );
}
