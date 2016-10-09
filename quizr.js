if (typeof require === 'function') {
  var _ = require('underscore');
  var config = require('./config.js');
  var rand = require('./util.js').rand;
}

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionAndAnswerFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

  var engConjugation =
    (config.tenses[tense].eng || (x => x))(verb.eng || verbKey);

  var type = _.find(_.collect(
    verb.type || [verb.esp.replace(EXTRACT_ROOT,'reg$2')], 
    t => config.types[t]
  ), typ => typ[tense]);

  var espSuffix = type[tense][person];

  var espRoot =
    verb.stems && verb.stems[tense] ||
    config.tenses[tense].esp && config.tenses[tense].esp(verb) ||
    verb.esp.replace(EXTRACT_ROOT,'$1');

  return {
    question: config.persons[person].eng + ' ' + engConjugation,
    answer:   espRoot + espSuffix,
  };
}

function choose() {
  var verb   = rand(_.keys(config.verbs));
  var person = rand(_.keys(config.persons));
  var tense  = rand(_.keys(config.tenses));

  return questionAndAnswerFor(verb, person, tense);
}

if (typeof module === 'object') {
  module.exports = {
    choose: choose,
    questionAndAnswerFor: questionAndAnswerFor,
  };
}
