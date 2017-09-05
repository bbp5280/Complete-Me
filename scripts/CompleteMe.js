class CompleteMe {

  constructor () {
    this.dictionary = [];
    this.numOfWords = 0;
  }

  insert(word) {
    this.dictionary.push(word);
    this.numOfWords ++;
  }

  suggest(word) {

  }
}

module.exports = CompleteMe
