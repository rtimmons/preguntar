var verbs = {
  talk: {
    esp: 'hablar',
    root: 'habl',
    type: 'regAr',
    eng: 'talk',
    engDid: 'talked',
  },
  study: {
    esp: 'estudiar',
    root: 'estudi',
    type: 'regAr',
    engDid: 'studied'
  }
};


var verbTypes = {
  regAr: {
    first: 'o',
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

function questionFor(verbKey, person, tense) {
  var verb = verbs[verbKey];
  var root = verb.root;
  var typ = verbTypes[verb.type];
  var suffix = typ[person];

  return root + suffix;
}
// questionFor('talk','first','present') => hablo

$(() => {
  var q = questionFor('talk','first','present');
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
  // console.log(`out[${array}, len=${array.length} r=${r}] = ${out}`);
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