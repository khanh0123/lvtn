import React from "react";

class Async extends React.Component {
    state = {
      Component: void 0
    };
  
    async componentDidMount() {
      const { Component } = await this.props.provider();
      this.setState({ Component });
    }
  
    render() {
      const { Component } = this.state;
      return(
        <React.Fragment>
          {Component ? <Component /> : <div>Loading...</div>}
          </React.Fragment>
      )
    }
  }
export default Async;