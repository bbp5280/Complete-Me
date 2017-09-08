const { assert, expect } = require ('chai');
const CompleteMe = require ('../lib/completeMe.js');
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

  it('should have a function called select', () => {

    assert.isFunction(completion.select);
  });
})

describe('insert', () => {

  beforeEach ( ()=> {
    completion = new CompleteMe
  })

  it('number of words should increase by 1 when a word is inserted', () => {

    completion.insert('pizza')
    assert.equal(completion.wordCount, 1);

    completion.insert('apple')
    assert.equal(completion.wordCount, 2);
  });

  it('inserting the same word should not increase the count', () => {

    completion.insert('pizza')
    assert.equal(completion.wordCount, 1);

    completion.insert('pizza')
    assert.equal(completion.wordCount, 1);
  });

  it('should have a root node defaulted to null', () => {
    expect(completion.root).to.equal(null);
  });

  it('insert should assign a root node/branch', () => {
    expect(completion.root).to.equal(null);
    completion.insert('word');
    expect(completion.root).not.to.equal(null);
  })

})

describe('suggest', () => {

  beforeEach ( ()=> {
    completion = new CompleteMe
  })

  it('should return words when passed partial strings', () => {

    completion.insert('pizza')
    completion.insert('pizzaria')
    assert.deepEqual(completion.suggest('pizz'), ['pizza', 'pizzaria']);
  });

  it('should return different words when passed a different partial strings', () => {

    completion.insert('pizza')
    completion.insert('apple')
    assert.deepEqual(completion.suggest('ap'), ['apple']);
  });

  it('should return word and words beyond when the partial string is a word', () => {

    completion.insert('star')
    completion.insert('stars')
    assert.deepEqual(completion.suggest('star'), ['star', 'stars']);
  });

  it('should return word as lower case to recuce duplicates', () => {

    completion.insert('Star')
    completion.insert('stars')
    assert.deepEqual(completion.suggest('star'), ['star', 'stars']);
  });

  it('should take an capital letter in the partial string and return suggestions as lowercase', () => {

    completion.insert('star')
    completion.insert('stars')
    assert.deepEqual(completion.suggest('Star'), ['star', 'stars']);
  });


  it('should return muliple words when partial strings that start the same', () => {
    expect(completion.suggest).to.be.a('function');

    completion.insert('string')

    completion.insert('stringy')
    completion.insert('strap')
    completion.insert('star')
    completion.insert('star')
    completion.insert('steel')
    completion.insert('stop')
    completion.insert('street')
    completion.insert('stratus')


    assert.deepEqual(completion.suggest('st'), ['string', 'stringy', 'strap', 'stratus', 'street', 'star', 'steel', 'stop'])
  })


  describe('populate', () => {

    beforeEach ( ()=> {
      completion = new CompleteMe
    })

    it('should load a dictionary of words', (done) => {

      completion.populate(dictionary)
      assert.equal(completion.wordCount, 234371);
      done()
    }).timeout(40000)

    it('should return muliple words when passed a partial strings that start the same letters', () => {

      completion.populate(dictionary)
      assert.deepEqual(completion.suggest('piz'),
      ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
    });
  })

  describe('Select', () => {

    beforeEach ( ()=> {
      completion = new CompleteMe
    })

    it("select should increment frequency", () => {
      completion.insert("stop")

      expect(completion.root.child.s.child.t.child.o.child.p.frequency).to.equal(0)

      completion.select("stop")

      expect(completion.root.child.s.child.t.child.o.child.p.frequency).to.equal(1)
    })

    it('select should order and array of 2 words', () => {
      completion.populate(['start', 'stop'])

      assert.deepEqual(completion.suggest('st'), ['start', 'stop'])

      completion.select('stop')

      assert.deepEqual(completion.suggest('st'), ['stop', 'start'])
    })
    it("select should order and array of 4 words", () => {
      completion.populate(['stoop', 'stopping', 'stopped', 'stop'])


      completion.select("stop")
      completion.select("stop")
      completion.select("stop")
      completion.select("stopped")
      completion.select("stopped")
      completion.select("stopping")

      assert.deepEqual(completion.suggest('st'), ['stop', 'stopped', 'stopping', 'stoop'])
    })
  })

})
