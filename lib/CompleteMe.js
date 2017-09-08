const Branch = require('./branch');

class CompleteMe {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    const branch = new Branch();

    if (this.root === null) {
      this.root = branch;
    }

    let letters = [...word];
    let childBranch = this.root;

    letters.forEach(letter => {
      if (!childBranch.child[letter]) {
        childBranch.child[letter] = new Branch(letter);
      }
      childBranch = childBranch.child[letter];
    })

    if (!childBranch.isWord) {
      childBranch.isWord = true;
      this.wordCount++
    }
  }

  findNode(word) {
    let wordsArray = [...word];
    let currentBranch = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentBranch = currentBranch.child[wordsArray[i]];
    }
    return currentBranch
  }

  suggest(partialWord) {
    let currentBranch = this.findNode(partialWord);

    let suggestion = [];

    const traveseTheTree = (word, currentBranch) => {
      const keys = Object.keys(currentBranch.child);


      for (let i = 0; i < keys.length; i++) {
        const child = currentBranch.child[keys[i]];
        const newString = word + child.letter;

        if (child.isWord) {
          suggestion.push({value: newString, frequency: child.frequency, lastTouched: child.lastTouched});
        }
        traveseTheTree(newString, child);

      }
    }

    if (currentBranch) {
      traveseTheTree(partialWord, currentBranch);
    }
    suggestion.sort((a, b) => {
      return b.frequency - a.frequency;
    })
    let suggestionArray = suggestion.map(obj => {
      return obj.value;
    });


    return suggestionArray;
  }

  select(word) {
    let currentBranch = this.findNode(word);

    currentBranch.frequency++;
    currentBranch.lastTouched = Date.now()
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}

module.exports = CompleteMe;
