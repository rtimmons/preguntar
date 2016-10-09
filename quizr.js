if (typeof require === 'function') {
  var _ = require('underscore');
  var config = require('./config.js');
  var rand = require('./util.js').rand;
}

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionAndAnswerFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

  var engVerb = verb.eng || verbKey;

  // regular ar -> 'regar' 
  var type = verb.type || [verb.esp.replace(EXTRACT_ROOT,'reg$2')]

  // hablar => habl
  var espStem = verb.stems && verb.stems[tense] ? verb.stems[tense] 
    : verb.esp.replace(EXTRACT_ROOT,'$1')

  var tenses = {};
  type.forEach(t => { tenses = _.defaults(tenses, config.types[t]) });
  var espSuffix = tenses[tense][person];

  var rootCtx = _.defaults(_.clone(verb), {
    engVerb: engVerb,
    espStem: espStem,
  });
  var engConjugation = (config.tenses[tense].eng || (ctx => ctx.engVerb))(rootCtx);
  var espRoot = (
    // TODO: this is so gross
    verb.stems && verb.stems[tense] && verb.stems[tense] && (c => espStem) ||
    config.tenses[tense].esp || (ctx => ctx.espStem))(rootCtx);

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
