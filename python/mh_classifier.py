import csv
import numpy as np
import scipy
import scipy.stats
from scipy.stats import norm
import re
import sys

filename = 'mh_dataset.csv'
input_message = "Input a friend's social media post that you're concerned about to see if they might be feeling depressed or not (press CTRL+D to submit).\n"
depressed_prior = 0.3
nondepressed_prior = 0.7


def main():
    data = readCSV(filename)
    depressed_ct_total, nondepressed_ct_total, depressed_freq_table, nondepressed_freq_table = populateCounts(data)

    user_input = handleInput(input_message)

    depressed_log_probs_table = logProbsOf(nondepressed_freq_table, nondepressed_ct_total)
    nondepressed_log_probs_table = logProbsOf(depressed_freq_table, depressed_ct_total)

    depressed_log_likelihood = logLikelihoodOf(user_input, depressed_log_probs_table, depressed_prior)
    nondepressed_log_likelihood = logLikelihoodOf(user_input, nondepressed_log_probs_table, nondepressed_prior)

    handleOutput(depressed_log_likelihood, nondepressed_log_likelihood)

def handleInput(input_message):
    print(input_message)
    lines = []

    try:
        while True:
            lines.append(input())
    except (EOFError):
        pass
    lines = "\n".join(lines)
    return lines

def handleOutput(ll1, ll2):
    yhat = max(ll1, ll2)
    if yhat == ll1:
        print("\n\nIt seems like they are not feeling well lately. It would be a good idea to reach out to them and give them support.")
    else:
        print("\n\nIt seems like they are doing okay, but make sure to cherish them. :)")
    print('This was evidenced under the hood by the log likelihood of the text showing emotional distress being ', ll1)
    print('This was evidenced under the hood by the log likelihood of the text showing positivity being ', ll2)


def logLikelihoodOf(input_data, log_probs_table, prior):
    prob = 0.0
    words = input_data.split()
    for word in words:
        word = re.sub('[!@#$,.()]', '', word)
        if word in log_probs_table:
            prob += log_probs_table[word]
    return prob + np.log(prior)

def logProbsOf(word_freq_table, total_ct_term):
    log_probs = {}
    for word in word_freq_table.keys():
        log_probs[word] = np.log(word_freq_table[word] / total_ct_term)
    return log_probs

def populateCounts(data):
    depressed_ct_total = 0.0
    nondepressed_ct_total = 0.0
    depressed_freq_table = {}
    nondepressed_freq_table = {}

    # global depressed_ct_total, nondepressed_ct_total
    for row in data:
        if row[1] == 'Yes':
            words = row[0].split()
            for word in words:
                word = re.sub('[!@#$,.()]', '', word)
                if word not in depressed_freq_table:
                    depressed_freq_table[word] = 1.0
                else:
                    depressed_freq_table[word] += 1.0
                depressed_ct_total += 1.0
        elif row[1] == 'No':
            words = row[0].split()
            for word in words:
                word = re.sub('[!@#$,.()]', '', word)
                if word not in nondepressed_freq_table:
                    nondepressed_freq_table[word] = 1.0
                else:
                    nondepressed_freq_table[word] += 1.0
                nondepressed_ct_total += 1.0
    return depressed_ct_total, nondepressed_ct_total, depressed_freq_table, nondepressed_freq_table

def readCSV(file):
    matrix = []
    with open(file,'r') as fin:
        for row in csv.reader(fin):
            fmt=u'{:<15}'*len(list(row))
            matrix.append(list(row))
    return matrix

# This if statement passes if this
# was the file that was executed
if __name__ == '__main__':
	main()
