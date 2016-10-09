if (typeof require === 'function') {
  var _ = require('underscore');
  var config = require('./config.js');
  var rand = require('./util.js').rand;
}

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

  var engVerb = verb.eng || verbKey;
  var rootCtx = _.defaults(verb, {
    engVerb: engVerb,
  });
  var tensed = (config.tenses[tense].eng || (ctx => ctx.engVerb))(rootCtx);

  var engPerson = config.persons[person].eng;

  return engPerson + ' ' + tensed;
}

function answerFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

  // e.g. 'regar' for regular ar verbs
  var typeKey = verb.type || verb.esp.replace(EXTRACT_ROOT,'reg$2')
  // hablar => habl
  var stem    = verb.stem || verb.esp.replace(EXTRACT_ROOT,'$1');

  var typ = config.types[typeKey];

  if (!typ || !typ[tense]) {
    return `${typeKey} ${tense} not configured`;
  }
  
  var rootCtx = _.defaults(verb, {
    stem: stem,
  });
  var root = (config.tenses[tense].esp || (ctx => ctx.stem))(rootCtx);

  var suffix = typ[tense][person];
  return root + suffix;
}


function questionAndAnswerFor(verbKey, person, tense) {
  var q = questionFor(verbKey,person,tense);
  var a = answerFor(verbKey,person,tense);

  return {
    question: q,
    answer:   a,
  };
}

function choose() {
  var verb   = rand(_.keys(config.verbs));
  var person = rand(_.keys(config.persons));
  var tense  = rand(_.keys(config.tenses));

  var q = questionFor(verb,person,tense);
  var a = answerFor(verb,person,tense);

  return {
    question: q,
    answer:   a,
  };
}

if (typeof module === 'object') {
  module.exports = {
    choose: choose,
    questionAndAnswerFor: questionAndAnswerFor,
  };
}
