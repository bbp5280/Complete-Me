class Branch {
  constructor(letter = null) {
    this.letter = letter;
    this.isWord = false;
    this.child = {};
  }
}


module.exports = Branch;
