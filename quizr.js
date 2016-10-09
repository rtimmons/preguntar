var config = {
  verbs: {
    talk: {
      esp: 'hablar',
    },
    study: {
      esp: 'estudiar',
    },
  },

  types: {
    regar: {
      present: {
        first: 'o',
        secondInf: 'as',
        third: 'a',
      },
    },
  },

  persons: {
    first: {
      esp: '',
      eng: 'I',
    },
    secondInf: {
      esp: 'tú',
      eng: 'You (friendly)',
    },
    third: {
      esp: 'él/ella',
      eng: 'He/she',
    },
  },
};

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionFor(verbKey, person, tense) {
  var verb = config.verbs[verbKey];

  // e.g. 'regar' for regular ar verbs
  var typeKey = verb.type || verb.esp.replace(EXTRACT_ROOT,'reg$2')
  // hablar => habl
  var root    = verb.root || verb.esp.replace(EXTRACT_ROOT,'$1');

  var typ = config.types[typeKey];
  
  var suffix = typ[tense][person];
  return root + suffix;
}

$(() => {
  var q = questionFor('talk','secondInf','present');
  $('body').append($('<div>').html(q + ''));
});

var rand = function(array) {
  var r = Math.round(Math.random() * (array.length-1));
  var out = array[r];
  return out;
};
