import React from 'react';
import { Segment, SegmentGroup } from 'semantic-ui-react';

import { depressed_msg, depressed_LL_msg,
nondepressed_msg, nondepressed_LL_msg,
} from '../utils/constants';

class ResultCard extends React.Component {

  renderResult = () => {
    if (this.props.depressed_bool === null) {
      return (
        <Segment>
          <b>Awaiting submission to get back results ...</b>
        </Segment>
      );
    }
    else if (this.props.depressed_bool) {
      return (
        <>
          <Segment className='red'>
          <b>{depressed_msg}</b>
          </Segment>
          <Segment>
          {depressed_LL_msg} <b>{this.props.depressed_LL}</b>
          <br/>
          <br/>
          {nondepressed_LL_msg} <b>{this.props.nondepressed_LL}</b>
          </Segment>
       </>
      );
    } else {
      return (
        <>
          <Segment className='green'>
            <b>{nondepressed_msg}</b>
          </Segment>
          <Segment>
          {depressed_LL_msg} <b>{this.props.depressed_LL}</b>
          <br/>
          <br/>
          {nondepressed_LL_msg} <b>{this.props.nondepressed_LL}</b>
          </Segment>
       </>
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