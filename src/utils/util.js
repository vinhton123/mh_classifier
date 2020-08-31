
export const populateCounts = (data) => {
  let depressed_ct_total = 0.0;
  let nondepressed_ct_total = 0.0;
  let depressed_freq_table = {};
  let nondepressed_freq_table = {};

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const words = row[0].split(" ");
    for (let j = 0; j < words.length; j++) {
      const word = words[j].toLowerCase().replace(/[^a-z]/, '');
      if (row[1] === 'Yes') {
        if (!(word in depressed_freq_table)) {
          depressed_freq_table[word] = 1.0
        }
        else {
          depressed_freq_table[word] += 1.0
        }
        depressed_ct_total += 1.0;
      } else if (row[1] === 'No') {
        if (!(word in nondepressed_freq_table)) {
          nondepressed_freq_table[word] = 1.0
        }
        else {
          nondepressed_freq_table[word] += 1.0
        }
        nondepressed_ct_total += 1.0;
      }
    }
  }
  return {
    depressed: {total_ct: depressed_ct_total, freq_table: depressed_freq_table},
    nondepressed: {total_ct: nondepressed_ct_total, freq_table: nondepressed_freq_table}
  };
};

export const parseStatus = (status) => {
  let words = status.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].toLowerCase().replace(/[^a-z]/, '');
  } 
  return words;
};

export const logProbsOf = (word_freq_table, total_ct_term) => {
  let log_probs = {}
  for (const word in word_freq_table) {
    log_probs[word] = Math.log(word_freq_table[word] / total_ct_term);
  }
  return log_probs;
}

export const logLikelihoodOf = (input_data, log_probs_table, prior) => {
  let logLikelihood = 0.0;
  for (let i = 0; i < input_data.length; i++) {
    const word = input_data[i];
    if (word in log_probs_table) {
      logLikelihood += log_probs_table[word];
    }
  } 
  return logLikelihood + Math.log(prior);

}

