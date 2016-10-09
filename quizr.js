var config = {

  verbs: {
    // reg ar
    talk:  { esp: 'hablar',   },
    study: { esp: 'estudiar', },
    work:  { esp: 'trabajar', },
    drink: { esp: 'tomar',    },
    walk:  { esp: 'caminar'   },
    bkfst: { esp: 'desayunar', eng: 'breakfast' },
    lunch: { esp: 'almorzar', },
    dinner:{ esp: 'cenar',    },
    buy:   { esp: 'comprar',  },
    prepare:  { esp: 'preparar', },
    arrive:   { esp: 'llegar',    },
    wash:     { esp: 'lavar',     },
    ask:      { esp: 'preguntar', },
    call:     { esp: 'llamar',    },
  },

  persons: {
    first:      { esp: '',        eng: 'I',              },
    secondInf:  { esp: 'tú',      eng: 'You <small>(inf)</small>', },
    third:      { esp: 'él/ella', eng: 'He/she',         },
    firstPlural:{ esp: 'nosotros',eng: 'We'              },
    secondForm: { esp: 'vosotros',eng: 'You <small>(pl)</small>', },
    thirdPlural:{ esp: 'ellos',   eng: 'They'            },
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
        firstPlural: 'amos',
        secondForm: 'áis',
        thirdPlural: 'an',
      },
      past: {
        first: 'é',
        secondInf: 'aste',
        third: 'ó',
        firstPlural: 'amos',
        secondForm: 'areis',
        thirdPlural: 'aron',
      },
      future: {
        first: 'é',
        secondInf: 'ás',
        third: 'á',
        firstPlural: 'emos',
        secondForm: 'eis',
        thirdPlural: 'an',
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

var ANSWER_DELAY   = 4000;
var CHANGE_Q_DELAY = 5500;

function updateUI(choice) {
  $('#question').html(choice.question);
  $('#answer').html('');
  setTimeout( () => $('#answer').html(choice.answer), ANSWER_DELAY);
}

$(() => {
  updateUI(choose());
  setTimeout(() => 
    setInterval(() => updateUI(choose()), CHANGE_Q_DELAY),
    CHANGE_Q_DELAY
  );
});

var rand = function(array) {
  var r = Math.round(Math.random() * (array.length-1));
  var out = array[r];
  return out;
};
