import React from 'react';

class Chevron extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      down: props.down,
      onToggle: props.onToggle,
    };
  }

  toggle = () => {
    var { down, onToggle } = this.state;
    this.setState({ down: !down });
    onToggle();
  }

  render = () => {
    var { down } = this.state;
    return (
      <span
        onClick={this.toggle}
        className={`pull-right fa fa-chevron-right ${down ? "rotate" : "rotate-back"}`}
      />
    );
  }
}

export default Chevron;