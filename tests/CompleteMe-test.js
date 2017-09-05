const { assert, expect } = require ('chai');
const CompleteMe = require ('../scripts/completeMe.js');

let completion;

describe('CompleteMe', () => {

  beforeEach ( ()=> {
    completion = new CompleteMe
  })

  it('should add words to the dictionary', () => {

    completion.insert('pizza')
    assert.equal(completion.dictionary[0], 'pizza');
  });

  it('number of words should increase by 1 when a word is inserted', () => {

    completion.insert('pizza')
    assert.equal(completion.numOfWords, 1);

    completion.insert('apple')
    assert.equal(completion.numOfWords, 2);
  });


})
