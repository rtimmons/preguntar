var config = {

  verbs: {
    talk:  { esp: 'hablar',   },
    study: { esp: 'estudiar', },
  },

  persons: {
    first:      { esp: '',        eng: 'I',              },
    secondInf:  { esp: 'tú',      eng: 'You (friendly)', },
    third:      { esp: 'él/ella', eng: 'He/she',         },
  },

  tenses: {
    present:  {},
    past:     { eng: v => `${v.engVerb}ed`    },
    future:   { eng: v => `will ${v.engVerb}`, esp: c => c.esp },
  },

  types: {
    regar: {
      present: {
        first: 'o',
        secondInf: 'as',
        third: 'a',
      },
      past: {
        first: 'é',
        secondInf: 'aste',
        third: 'ó',
      },
      future: {
        first: 'é',
        secondInf: 'ás',
        third: 'á',
      },
    },
  },
};




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

  if (!typ[tense]) {
    return `${typeKey} ${tense} not configured`;
  }
  
  var rootCtx = _.defaults(verb, {
    stem: stem,
  });
  var root = (config.tenses[tense].esp || (ctx => ctx.stem))(rootCtx);

  var suffix = typ[tense][person];
  return root + suffix;
}



$(() => {
  var verb   = rand(_.keys(config.verbs));
  var person = rand(_.keys(config.persons));
  var tense  = rand(_.keys(config.tenses));

  var q = questionFor(verb,person,tense);
  var a = answerFor(verb,person,tense);
  $('#quizr').html(q + '=> ' + a);
});

var rand = function(array) {
  var r = Math.round(Math.random() * (array.length-1));
  var out = array[r];
  return out;
};
