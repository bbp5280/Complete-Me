const { assert } = require ('chai');
const CompleteMe = require ('../scripts/completeMe.js');
const text = "/usr/share/dict/words";
const fs = require('fs');
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

let completion;

describe('CompleteMe', () => {

  beforeEach ( ()=> {
    completion = new CompleteMe
  })

  it('should be a object', () => {

    assert.isObject(completion);
  });

  it('should have a function called insert', () => {

    assert.isFunction(completion.insert);
  });

  it('should have a function called suggest', () => {

    assert.isFunction(completion.suggest);
  });

  it('should have a function called populate', () => {

    assert.isFunction(completion.populate);
  });
})

describe('insert', () => {

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

describe('suggest', () => {

  beforeEach ( ()=> {
    completion = new CompleteMe
  })

  it('should return words when passed partial strings', () => {

    completion.insert('pizza')
    assert.deepEqual(completion.suggest('pizz'), ['pizza']);
  });

  it('should return different words when passed partial strings', () => {

    completion.insert('pizza')
    completion.insert('apple')
    assert.deepEqual(completion.suggest('ap'), ['apple']);
  });

  it('should return muliple words when partial strings that start the same',
  () => {

    completion.insert('pizza')
    completion.insert('pizzeria')
    completion.insert('apple')
    assert.deepEqual(completion.suggest('piz'), ['pizza', 'pizzeria']);
  });

  describe('populate', () => {

    beforeEach ( ()=> {
      completion = new CompleteMe
    })

    it('should load a dictionary of words', () => {

      completion.populate(dictionary)
      assert.equal(completion.numOfWords, 235886);
    });
  })

})
