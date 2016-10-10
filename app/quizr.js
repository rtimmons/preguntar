if (typeof require === 'function') {
  var _ = require('underscore');
  var config = require('./config.js');
  var rand = require('./util.js').rand;
}

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionAndAnswerFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

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
    config.persons[person].eng + ' ' + conjugated;
    

  function computeAnswer() {
    var type = _.find(_.collect(
      verb.type || [verb.esp.replace(EXTRACT_ROOT,'reg$2')], 
      t => config.types[t]
    ), typ => typ[tense]);
    var espSuffix = type[tense][person];

    var stemmer =
      // use per-verb stem for given tense
      (verb.stems && verb.stems[tense] && (() => verb.stems[tense]) ) ||
      // else use stemmer for tense
      config.tenses[tense].esp ||
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

function randomChoice() {
  var verb   = rand(_.keys(config.verbs));
  var person = rand(_.keys(config.persons));
  var tense  = rand(_.keys(config.tenses));

  return {
    verb: verb, person: person, tense: tense
  };
}

if (typeof module === 'object') {
  module.exports = {
    randomChoice: randomChoice,
    questionAndAnswerFor: questionAndAnswerFor,
  };
}
