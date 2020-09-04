import React from 'react';
import { Grid, Image } from 'semantic-ui-react';


import human from './icons/human.svg';
import social_media from './icons/social_media.svg';
import brain from './icons/brain2.svg';
import arrow from './icons/arrow.svg';


import {
  depressed_prior, nondepressed_prior,
  header_msg, bias_towards_nondepressed,
} from './utils/constants.js';

import getData from './utils/importFile';
import { 
  populateCounts,
  parseStatus,
  logProbsOf,
  logLikelihoodOf,
} from './utils/util';

import StatusForm from './components/StatusForm.jsx';
import ResultCard from './components/ResultCard.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      depressed_log_probs: null, depressed_LL: null,
      nondepressed_log_probs: null, nondepressed_LL: null,
      depressed_bool: null };

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
    if (status === null) {
      this.setState({ depressed_bool: null, depressed_LL: null, nondepressed_LL: null });
    } else {
      const status_array = parseStatus(status);
      const depressed_bool = this.calculateEstimate(status_array);
      this.setState({ depressed_bool });
    }
  }

  calculateEstimate = (status_array) => {

    const depressed_LL = logLikelihoodOf(
      status_array, this.state.depressed_log_probs, depressed_prior
    );
    const nondepressed_LL = logLikelihoodOf(
      status_array, this.state.nondepressed_log_probs, nondepressed_prior
    );
    this.setState({ depressed_LL, nondepressed_LL });
    const bestGuess = Math.min(depressed_LL, nondepressed_LL + bias_towards_nondepressed);
    if (bestGuess === depressed_LL) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div style={{ backgroundColor: 'tomato', marginLeft: '10px', marginRight: '10px', alignContent: 'center' }}>
        <Grid>
        <Grid.Row columns={1}>
            <Grid.Column>
            <div className='ui container header centered' style={{ marginTop: '50px' }}>
              <h1 style={{textAlign: 'right', fontWeight: 'lighter', color: 'rgba(255,255,255,1)', fontSize: '20pt'}}
              >
                ( by vinh ton )
                </h1>
                <Image className="ui large image" src={brain} style={{minWidth: '50px', marginTop: '30px'}}/>
              <h1 style={{ fontWeight: 'lighter', color: 'rgba(255,255,255,1)', marginTop: '0px', fontSize: '36pt' }}>
               peer mental health predictor tool
               </h1>
            </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
            <div className='ui container centered header' style={{ marginTop: '30px' }}>
            <h1 style={{ fontWeight: 'lighter',color: 'rgba(255,255,255,.60)', fontSize: '20pt', textAlign: 'left' }}>instructions:</h1>
            <h1 style={{ fontWeight: 'lighter',color: 'rgba(255,255,255,.60)', fontSize: '20pt', textAlign: 'left', marginTop: '-12px' }}>{header_msg}</h1>
            </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4} style={{ marginTop: '50px'}}>
            <Grid.Column></Grid.Column>
            <Grid.Column>
            <Image className="ui container large image" src={social_media} style={{minWidth: '200px'}}/>
              </Grid.Column>
              <Grid.Column>
              <Image className="ui container large image" src={human} style={{minWidth: '200px'}}/>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} style={{ marginTop: '50px'}}>
            <Grid.Column >
              <StatusForm handleStatus={this.handleStatus} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Image className="ui image centered" src={arrow} style={{maxWidth: '50px'}}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <ResultCard
                  depressed_bool={this.state.depressed_bool}
                  depressed_LL={this.state.depressed_LL}
                  nondepressed_LL={this.state.nondepressed_LL}
                />
            </Grid.Column>
          </Grid.Row>
            <Grid.Row columns={1} style={{ marginTop: '200px'}}>
              <Grid.Column>
                <div className='ui container centered header'>
                  <a href='https://vinhton.com'>
                  <button className="ui button inverted" style={{fontSize: '20pt'}}>
                    see more projects
                  </button>
                  </a>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} style={{ marginTop: '50px'}}>
              <Grid.Column>
                <h2 style={{ fontWeight: 'lighter', color: 'rgba(255,255,255,.70)', fontSize: '20pt', }}>
                  disclaimer:
                </h2>
                <h2 style={{ fontWeight: 'lighter', color: 'rgba(255,255,255,.70)', fontSize: '20pt', marginTop: '-12px' }}>
                  this tool is not meant to replace formal mental health diagnosis but rather an initial step in giving your friend support
                </h2>
                <h2 style={{ fontWeight: 'lighter', color: 'rgba(255,255,255,.70)', fontSize: '20pt' }}>
                </h2>
              </Grid.Column>
            </Grid.Row>
        </Grid>   
      </div>
    );
  }
}

export default App;
