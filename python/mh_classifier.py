import csv
import numpy as np
import scipy
import scipy.stats
from scipy.stats import norm
import re
import sys


totNon = 0.0
totMisog = 0.0
non = {}
misog = {}

def main():
    data = loadCsvData("training2.csv")
    countWords(data)
    logNon = calcLogProb(non, totNon)
    logMisog = calcLogProb(misog, totMisog)
    print("Input a friend's social media post that you're concerned about to see if they might be feeling depressed or not.\n")
    lines = []
    try:
        while True:
            lines.append(input())
    except (EOFError):
        pass
    lines = "\n".join(lines)

    probNon = calcFullProb(lines,logNon, 0.5)
    probMisog = calcFullProb(lines, logMisog, 0.5)
    if(probNon > probMisog):
        print("\n\nIt seems like they are doing okay, but make sure to cherish them. :)")
    else:
        print("\n\nIt seems like they are not feeling well lately. It would be a good idea to reach out to them and give them support.")
    print('This was evidenced under the hood by the log probability of the text showing emotional distress being %',probNon)
    print('This was evidenced under the hood by the log probability the text showing positivity being ',probMisog)

def calcFullProb(lyrics, probs, prior):
    words = lyrics.split()
    prob = 0.0
    for word in words:
        word = re.sub('[!@#$,.()]', '', word)
        if word in probs:
            prob += probs[word]
    return prob + np.log(prior)

def calcLogProb(data, tot):
    logProb = {}
    for word in data.keys():
        logProb[word] = np.log(data[word]/tot)
    return logProb

def countWords(data):
    global totNon, totMisog
    for row in data:
        if row[3] == 'Yes':
            words = row[2].split()
            for word in words:
                word =  re.sub('[!@#$,.()]', '', word)
                if word in non:
                    non[word] += 1.0
                else:
                    non[word] = 1.0
                totNon += 1.0
        elif row[3] == 'No':
            words = row[2].split()
            for word in words:
                word =  re.sub('[!@#$,.()]', '', word)
                if word in misog:
                    misog[word] += 1.0
                else:
                    misog[word] = 1.0
                totMisog += 1.0

def loadCsvData(fileName):
    matrix = []
    with open('training2.csv','r') as fin:
        reader = csv.reader(fin)
        for row in reader:
            temp=list(row)
            fmt=u'{:<15}'*len(temp)
            matrix.append(temp)
    return matrix

# This if statement passes if this
# was the file that was executed
if __name__ == '__main__':
	main()
