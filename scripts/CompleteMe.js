const Branch = require('./branch');

class CompleteMe {

  constructor () {
    this.dictionary = [];
    this.numOfWords = 0;
  }

  insert(word) {
    const branch = new Branch();


    if (this.root === null) {
      this.root = branch;
    }

    let letters = [...word];
    let childBranch = this.root;

    letters.forEach( (letter) => {
      if (!childBranch.child[letter]) {
        childBranch.child[letter] = new Branch(letter)

      }
      childBranch = childBranch.child[letter]
    })

    if (!childBranch.isFinishedWord) {
      branch.isFinishedWord = true;
      this.count++;
    }

  }

  suggest(partialWord) {
    let suggested = this.dictionary.filter ((word) => {
      return (word.indexOf(partialWord) > -1);
    })

    return suggested
  }

  populate (dictionary) {
    dictionary.forEach((word) => {
      this.insert(word);
    });
  }
}



module.exports = CompleteMe
