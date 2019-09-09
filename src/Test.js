import React, { Component } from 'react';
import axios from 'axios';

class Example extends Component {
  signal = axios.CancelToken.source();

  state = {
    isLoading: false,
    user: {}
  };

  componentDidMount() {
    this.onLoadUser();
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  onLoadUser = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get('https://randomuser.me/api/', {
        cancelToken: this.signal.token
      });
      this.setState({ user: response.data, isLoading: true });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled
      } else {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
      </div>
    );
  }
}
