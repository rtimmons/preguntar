if (typeof require === 'function') {
  var _ = require('underscore');
  var config = require('./config.js');
  var rand = require('./util.js').rand;
}

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionAndAnswerFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

  var engVerb = verb.eng || verbKey;
  var engPerson = config.persons[person].eng;

  // e.g. 'regar' for regular ar verbs
  var typeKey = verb.type || verb.esp.replace(EXTRACT_ROOT,'reg$2')

  var typ = config.types[typeKey];
  var espSuffix = typ[tense][person];

  if (!typ || !typ[tense]) {
    return `${typeKey} ${tense} not configured`;
  }

  // hablar => habl
  var stem = verb.stem || verb.esp.replace(EXTRACT_ROOT,'$1');

  var rootCtx = _.defaults(verb, {
    engVerb: engVerb,
    stem: stem,
  });
  var engConjugation = (config.tenses[tense].eng || (ctx => ctx.engVerb))(rootCtx);
  var root = (config.tenses[tense].esp || (ctx => ctx.stem))(rootCtx);

  return {
    question: engPerson + ' ' + engConjugation,
    answer:   root + espSuffix,
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
