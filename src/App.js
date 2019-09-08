import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import FlightItem from './components/FlightItem';
import Form from './components/Form';

class App extends Component {
  state = {
    flights: [],
    isDirect: 0,
    loading: false
  };

  // On From Submit:
  searchFlights = async e => {
    var controller = new AbortController();
    controller.abort();
    this.setState({ flights: [], loading: true });
    e.preventDefault();
    let from = '';
    let to = '';
    from = e.target.from.value.toUpperCase();
    to = e.target.to.value.toUpperCase();

    // Find next 7 days
    let onDates = [];
    for (let i = 0; i < 7; i++) {
      var day = new Date();
      var nextDay = new Date(day);
      nextDay.setDate(day.getDate() + i);
      let dd = String(nextDay.getDate()).padStart(2, '0');
      let mm = String(nextDay.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = nextDay.getFullYear();
      let onDate = `${dd}/${mm}/${yyyy}`;
      onDates = [...onDates, onDate];
    }

    // Fetch Data for each Day
    for (let i = 0; i < onDates.length; i++) {
      let onDate = onDates[i];

      const res = await axios.get(
        `https://api.skypicker.com/flights?fly_from=${from}&fly_to=${to}&date_from=${onDate}&date_to=${onDate}&flight_type=oneway&direct_flights=${this.state.isDirect}&partner=picky&limit=1&sort=price&asc=1`
      );
      const flightResult = res.data.data[0];

      // Assign the date as an object
      const dateOfSearch = {
        dateOfSearch: [onDates[i]]
      };
      const newFlight = { ...dateOfSearch, ...flightResult };
      this.setState({
        flights: [...this.state.flights, newFlight]
      });
    }
    this.setState({
      loading: false
    });
  };

  // Toggle Direct/InDirect Flights
  toggle = () => {
    if (this.state.isDirect === 1) {
      this.setState({ flights: [], isDirect: 0 });
    }
    if (this.state.isDirect === 0) {
      this.setState({ flights: [], isDirect: 1 });
    }
  };

  render() {
    const { flights, loading } = this.state;
    return (
      <div className='appWrapper'>
        <Form searchFlights={this.searchFlights} />
        <FlightItem flights={flights} loading={loading} />
      </div>
    );
  }
}

export default App;
