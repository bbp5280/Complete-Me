class CompleteMe {

  constructor () {
    this.dictionary = [];
    this.numOfWords = 0;
  }

  insert(word) {
    this.dictionary.push(word);
    this.numOfWords ++;
  }

  suggest(partialWord) {
    let suggested = this.dictionary.filter ((word) => {
      return (word.indexOf(partialWord) > -1);
    })

    return suggested
  }
}

module.exports = CompleteMe
