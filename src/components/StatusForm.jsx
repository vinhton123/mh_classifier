import React from 'react';

class StatusForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: '', error: false };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.status.length > 20) {
      this.setState({error: false });
      this.props.handleStatus(this.state.status);
    } else {
      this.setState({error: true });
      this.props.handleStatus(null);
    }
 }

  onChange = (e) => {
    this.setState({ status: e.target.value });
  }

  renderValidate = () => {
    if (this.state.error) {
      return (
        <div className='ui header red'> Please enter more than 20 characters for better accuracy. </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className='ui card container' style={{ width: '40vw', padding: '20px'}}>
        <form className="ui form clearing" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Social Media Status</label>
            <input
              type="text"
              name="post"
              placeholder="Enter your friend's social media post."
              onChange={this.onChange}
            />
          </div>
          <div>{this.renderValidate()}</div>
          <button className="ui button primary right floated" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default StatusForm;