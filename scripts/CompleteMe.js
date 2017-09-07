const Branch = require('./branch');

class CompleteMe {

  constructor () {
    this.root = null;
    this.numOfWords = 0;
    this.words = []
  }

  insert(word) {
    const branch = new Branch();

    this.words.push(word)

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

    if (!childBranch.isWord) {
      branch.isWord = true;
      this.numOfWords++;
    }

  }

  suggest(partialWord) {
    let spreadWord = [...partialWord];
    let currentNode = this.root;
    let suggestions = [];

    for (var i = 0; i < spreadWord; i++) {
      currentNode = currentNode.child[spreadWord[i]]
    }
    console.log('currentNode:', currentNode)

    function traverseTrie (partialWord, currentNode) {
      const keys = Object.keys(currentNode.child)
        console.log('keys:', keys)
      for (var k = 0; k < keys.length; k ++) {
        const child = currentNode.child[keys[k]]
        console.log('child', child)
        const newString = partialWord + child.letter
        // console.log(newString)

        if (child.isWord) {
          suggestions.push(newString)
          console.log ('suggestions:',  suggestions)
        } else {
          traverseTrie(newString, child)
        }
      }
    }

    if (currentNode) {
      traverseTrie(partialWord, currentNode)
    }

  }

  populate (dictionary) {
    dictionary.forEach((word) => {
      this.insert(word);
    });
  }
}



module.exports = CompleteMe
