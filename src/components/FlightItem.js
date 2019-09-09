import React from 'react';
import spinner from '../asset/spinner.gif';
import uuid from 'uuid';
import plane from '../asset/plane.png';
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
            <div className='departureContainer'>
              <span className='small-text'>From</span>
              <br />
              <div>
                {flight.cityFrom}, {flight.flyFrom}
              </div>
              <div>
                {`${getTimeInfo(flight.dTime).hours}:${
                  getTimeInfo(flight.dTime).minutes
                }`}
              </div>
            </div>
            <div className='middleContainer'>
              <div>
                {getTimeInfo(flight.dTime).dateInMonth},{' '}
                {getTimeInfo(flight.dTime).month_str}
              </div>

              <div>{flight.fly_duration}</div>
              <div>
                <img
                  id='plane-logo'
                  alt=''
                  src={`https://images.kiwi.com/airlines/64/${flight.route[0].airline}.png`}
                />
              </div>

              <a className='book-btn' href={flight.deep_link} target='blanck'>
                Book For £{flight.price}
              </a>
            </div>
            <div className='arrivalContainer'>
              <div>
                <span className='small-text'>To</span>
                <br />
                {flight.cityTo}, {flight.flyTo}
              </div>

              <div>
                {`${getTimeInfo(flight.aTime).hours}:${
                  getTimeInfo(flight.aTime).minutes
                }`}
              </div>

              <div className='small-medium-text'>
                <span className='cursor-mouse'>
                  {(getTimeInfo(flight.aTime).dateInMonth >
                    getTimeInfo(flight.dTime).dateInMonth ||
                    (getTimeInfo(flight.aTime).dateInMonth <
                      getTimeInfo(flight.dTime).dateInMonth &&
                      flight.aTime > flight.dTime)) &&
                    'Arriving different day !'}
                  <div className='popup'>
                    If flight duration is too much, consider searching for
                    direct flights only
                  </div>
                </span>
              </div>
            </div>

            <div className='line' />
            <img alt='' className='line-plane' src={plane} />
            <img alt='' className='line-plane-2' src={plane} />
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
