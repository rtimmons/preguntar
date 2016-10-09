class Verb {
  constructor(config) {
    this.config = config;
  }

  conjugate(lang, person, tense) {
  }
}

if (typeof module === 'object') {
  module.exports = Verb;
}

