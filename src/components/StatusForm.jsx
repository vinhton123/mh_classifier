import React from 'react';

class StatusForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: '' };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleStatus(this.state.status);
 }

 onChange = (e) => {
  this.setState({ status: e.target.value });
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
          <button className="ui button right floated" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default StatusForm;