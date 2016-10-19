if (typeof require === 'function') {
  var _ = require('underscore');
  var config = require('./config.js');
  var rand = require('./util.js').rand;
}

const EXTRACT_ROOT = /^(.*?)(..)$/g;

class Quizr {

  constructor(config) {
    this.config = config;
  }

  setConfig(config) {
    this.config = config;
  }

  questionAndAnswerFor(verbKey, person, tense) {
    var verb = this.config.verbs[verbKey];

    // well this is confusing

    // is there an override for the tense
    var universalForTense = verb.eng
        && typeof(verb.eng) !== 'string'
        && verb.eng[tense];
    // ... and is there one for the person?
    var forPersonAndTense = universalForTense 
        && typeof(universalForTense) !== 'string'
        && universalForTense[person];

    var engBase = typeof(verb.eng) !== 'string' ? verbKey : verb.eng;
    var conjugated = 
        forPersonAndTense || 
        universalForTense ||
        (config.tenses[tense].eng || (x => x))(engBase);
  
    // console.log(`verb.eng = %j, universalForTense = %j, forPersonAndTense = %j, conjugated = %j`,
    //   verb.eng, universalForTense, forPersonAndTense, conjugated
    // );

    var question =
      this.config.persons[person].eng + ' ' + conjugated;

    var self = this;
    function computeAnswer() {
      var type = _.find(_.collect(
        verb.type || [verb.esp.replace(EXTRACT_ROOT,'reg$2')], 
        t => self.config.types[t]
      ), typ => typ[tense]);
      var espSuffix = type[tense][person];

      var stemmer =
        // use per-verb stem for given tense
        (verb.stems && verb.stems[tense] && (() => verb.stems[tense]) ) ||
        // else use stemmer for tense
        self.config.tenses[tense].esp ||
        // else remove last 2 (suffix)
        (v => v.esp.replace(EXTRACT_ROOT,'$1'));
      var espRoot = stemmer(verb);

      return espRoot + espSuffix;
    }

    var answer = verb.esp && verb.esp[tense] && verb.esp[tense][person] ||
      computeAnswer();

    return {
      question: question,
      answer:   answer,
    };
  }

  randomChoice() {
    var verb   = rand(_.keys(this.config.verbs));
    var person = rand(_.keys(this.config.persons));
    var tense  = rand(_.keys(this.config.tenses));

    return {
      verb: verb, person: person, tense: tense
    };
  }
}

if (typeof module === 'object') {
  module.exports = Quizr;
}
