import React from 'react';
import { Segment, SegmentGroup, Button } from 'semantic-ui-react';

import { depressed_msg, depressed_LL_msg,
nondepressed_msg, nondepressed_LL_msg,
explanation,
} from '../utils/constants';

class ResultCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {opened: false};
  }

  renderExplanation = () => {
    return (
      <React.Fragment style={{fontSize: '16pt', lineHeight: '1.4'}}>
        <br/>
        {explanation}
        <br/>
        <br/>
        {depressed_LL_msg} <b>{this.props.depressed_LL}</b>
        <br/>
        {nondepressed_LL_msg} <b>{this.props.nondepressed_LL}</b>
      </React.Fragment>
    );
  }



  renderResult = () => {
    if (this.props.depressed_bool === null) {
      return (
        <Segment style={{fontSize: '20pt', color: 'rgba(0,0,0,.4)'}}>
          <b>Awaiting submission to get back results ...</b>
        </Segment>
      );
    }
    else if (this.props.depressed_bool) {
      return (
        <React.Fragment> 
          <Segment className='red' style={{fontSize: '20pt', lineHeight: '1.6'}}> 
          <b>{depressed_msg}</b>
          <br/>
          </Segment>
          <Segment textAlign={"center"} clearing>
            <br/>
            <Button className='ui basic orange' onClick={() => this.setState({opened: !this.state.opened})}>
              See Explanation
              </Button>
              <br/>
            <div style={{textAlign: 'left', padding: '10px'}}>{this.state.opened && this.renderExplanation()}</div>
          </Segment>
       </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Segment className='green' style={{fontSize: '20pt', lineHeight: '1.4'}}>
            <b>{nondepressed_msg}</b>
            <br/>
          </Segment>
          <Segment textAlign={"center"} clearing>
            <br/>
            <Button className='ui basic orange' onClick={() => this.setState({opened: !this.state.opened})}>
              See Explanation
            </Button>
            <br/>
            <div style={{textAlign: 'left', padding: '10px'}}>{this.state.opened && this.renderExplanation()}</div>
          </Segment>
       </React.Fragment>
      );
    }
  }

  render() {
    console.log(this.state.opened);
    return (
      <SegmentGroup className='ui container'>
        {this.renderResult()}
      </SegmentGroup>
    );
  }
}

export default ResultCard;