import React, { useState } from 'react';
import PlaneSVG from './PlaneSVG';

const Form = props => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const onFromChange = e => {
    setFrom(e.target.value);
  };
  const onToChange = e => {
    setTo(e.target.value);
  };

  return (
    <form className='searchForm' onSubmit={props.searchFlights}>
      <div className='inputContainer'>
        <input
          className='searchInput'
          type='text'
          name='from'
          value={from}
          placeholder='From? e.g: LON'
          onChange={onFromChange}
        />
        <PlaneSVG />
        <input
          className='searchInput'
          type='text'
          name='to'
          value={to}
          placeholder='To? e.g: DXB'
          onChange={onToChange}
        />
      </div>

      <div className='toggle'>
        <input onClick={props.toggle} type='checkbox' /> Direct Flight Only
      </div>

      <button className='searchBtn' type='submit'>
        BEST PRICE IN WEEK
      </button>
    </form>
  );
};

export default Form;
