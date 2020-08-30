import React from 'react';
import { Grid } from 'semantic-ui-react';


import getData from './utils/importFile';
import { 
  populateCounts,
  parseStatus,
  logProbsOf,
  logLikelihoodOf,
} from './utils/util';
import {
  depressed_prior, nondepressed_prior,
  header_msg,
} from './utils/ constants';

import StatusForm from './components/StatusForm.jsx';
import ResultCard from './components/ResultCard.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      depressed_log_probs: null, depressed_LL: null,
      nondepressed_log_probs: null, nondepressed_LL: null,
      status: '', depressed_bool: null };

  }

  componentDidMount(){
    getData().then((result) => {
      result.shift();
      const data = populateCounts(result);
      const {
        depressed,
        nondepressed,
      } = data;

      const depressed_log_probs = logProbsOf(depressed.freq_table, depressed.total_ct);
      const nondepressed_log_probs = logProbsOf(nondepressed.freq_table, nondepressed.total_ct);
      this.setState({ depressed_log_probs, nondepressed_log_probs });
    });
  }
  
  handleStatus = (status) => {
    const status_array = parseStatus(status);
    const depressed_bool = this.calculateEstimate(status_array);
    this.setState({ depressed_bool });
  }

  calculateEstimate = (status_array) => {

    const depressed_LL = logLikelihoodOf(
      status_array, this.state.depressed_log_probs, depressed_prior
    )*-1;
    const nondepressed_LL = logLikelihoodOf(
      status_array, this.state.nondepressed_log_probs, nondepressed_prior
    )*-1 + 7;
    this.setState({ depressed_LL, nondepressed_LL });
    const bestGuess = Math.max(depressed_LL, nondepressed_LL);
    if (bestGuess === depressed_LL) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div >
        <Grid>
          <Grid.Row columns={1}>
            <h1
              className='ui container header centered'
              style={{marginBottom: '150px', marginTop: '50px'}}
            >
              {header_msg}
            </h1>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <StatusForm handleStatus={this.handleStatus}/>
            </Grid.Column>
            <Grid.Column width='7'>
            <ResultCard
                depressed_bool={this.state.depressed_bool}
                depressed_LL={this.state.depressed_LL}
                nondepressed_LL={this.state.nondepressed_LL}
              />
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
