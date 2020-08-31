import React from 'react';
import { Segment, SegmentGroup } from 'semantic-ui-react';

import { depressed_msg, depressed_LL_msg,
nondepressed_msg, nondepressed_LL_msg,
} from '../utils/constants';

class ResultCard extends React.Component {

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
          <Segment className='red' style={{fontSize: '20pt'}}> 
          <b>{depressed_msg}</b>
          </Segment>
          <Segment style={{fontSize: '20pt'}}>
          {depressed_LL_msg} <b>{this.props.depressed_LL}</b>
          <br/>
          <br/>
          {nondepressed_LL_msg} <b>{this.props.nondepressed_LL}</b>
          </Segment>
       </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Segment className='green' style={{fontSize: '20pt'}}>
            <b>{nondepressed_msg}</b>
          </Segment>
          <Segment style={{fontSize: '20pt'}}>
          {depressed_LL_msg} <b>{this.props.depressed_LL}</b>
          <br/>
          <br/>
          {nondepressed_LL_msg} <b>{this.props.nondepressed_LL}</b>
          </Segment>
       </React.Fragment>
      );
    }
  }

  render() {
    return (
      <SegmentGroup className='ui container'>
        {this.renderResult()}
      </SegmentGroup>
    );
  }
}

export default ResultCard;