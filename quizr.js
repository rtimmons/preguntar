var verbs = {
  talk: {
    esp: 'hablar'
  },
  study: {
    esp: 'estudiar',
  },
};

var verbTypes = {
  regar: {
    present: {
      first: 'o',
      secondInf: 'as',
      third: 'a'
    },
  },
};

var persons = {
  first: {
    esp: '',
    eng: 'I',
  },
  secondInf: {
    esp: 'tú',
    eng: 'You (friendly)'
  },
  third: {
    esp: 'él/ella',
    eng: 'He/she'
  }
};

var EXTRACT_ROOT = /^(.*?)(..)$/g;

function questionFor(verbKey, person, tense) {
  var verb = verbs[verbKey];

  // e.g. 'regar' for regular ar verbs
  var typeKey = verb.type || verb.esp.replace(EXTRACT_ROOT,'reg$2')
  // hablar => habl
  var root    = verb.root || verb.esp.replace(EXTRACT_ROOT,'$1');

  var typ = verbTypes[typeKey];
  
  var suffix = typ[tense][person];
  return root + suffix;
}

$(() => {
  var q = questionFor('talk','secondInf','present');
  $('body').append($('<div>').html(q + ''));
});

var dimensions = [
  [
    'I',
    'You (inf)',
    'He/she',
    'We',
    'You (plural)',
    'They (plural)',
  ],
  [
    '(present)',
    '(past)',
    'will',
  ],
  [
    'talk',
    'work',
    'study',
    'drink',
    'walk',
    'travel',
  ]
];

var rand = function(array) {
  var r = Math.round(Math.random() * (array.length-1));
  var out = array[r];
  return out;
};

$(() => {
  $('#quizr').click(() => {
    var ix = _.map(dimensions, d => rand(d));
    var q = _.map(dimensions, d => {
      var out = rand(d);
      return out;
    }).join(' ');
    $('#quizr').html(q);
  })
  .click();
});