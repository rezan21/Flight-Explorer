import React from 'react';
import spinner from '../asset/spinner.gif';
import uuid from 'uuid';

const FlightItem = props => {
  // !! Server Time Must be UTC
  const getTimeInfo = unixTime => {
    const date = new Date(unixTime * 1000);
    const month_str = String(date).substring(4, 7);
    const week_day_str = String(date).substring(0, 3);
    const dateInMonth = date.getDate();
    const hours = String(date).substring(16, 18);
    const minutes = String(date).substring(19, 21);

    return { date, month_str, week_day_str, dateInMonth, hours, minutes };
  };

  return (
    <div className='results'>
      <img
        className='spinner'
        src={spinner}
        alt='Loading...'
        style={{
          display: props.loading ? 'block' : 'none'
        }}
      />
      {props.flights.map(flight =>
        Object.keys(flight).length > 1 ? (
          <div key={uuid.v4()} className='flightItem'>
            <img
              alt=''
              src={`https://images.kiwi.com/airlines/64/${flight.route[0].airline}.png`}
            />
            <p>Price:€ {flight.price}</p>
            <div>
              From: {flight.cityFrom}, {flight.flyFrom}
            </div>
            <div>
              To: {flight.cityTo}, {flight.flyTo}
            </div>
            <div>Duration: {flight.fly_duration}</div>

            <div>
              Departure:{' '}
              {`${getTimeInfo(flight.dTime).hours}:${
                getTimeInfo(flight.dTime).minutes
              }`}
            </div>
            <div>
              Arrival:{' '}
              {`${getTimeInfo(flight.aTime).hours}:${
                getTimeInfo(flight.aTime).minutes
              }`}
            </div>
            <div>
              Test:{String(getTimeInfo(flight.dTime).date)}
              <p>
                {getTimeInfo(flight.dTime).week_day_str},{' '}
                {getTimeInfo(flight.dTime).dateInMonth}{' '}
                {getTimeInfo(flight.dTime).month_str}
              </p>
            </div>
            <div>
              {(getTimeInfo(flight.aTime).dateInMonth >
                getTimeInfo(flight.dTime).dateInMonth ||
                (getTimeInfo(flight.aTime).dateInMonth <
                  getTimeInfo(flight.dTime).dateInMonth &&
                  flight.aTime > flight.dTime)) &&
                'Arriving next Date'}
            </div>

            <a href={flight.deep_link} target='blanck'>
              Book This Flight
            </a>
          </div>
        ) : (
          <p className='flightItem' key={uuid.v4()}>
            No Available Flights For {flight.dateOfSearch}{' '}
          </p>
        )
      )}
    </div>
  );
};

export default FlightItem;
