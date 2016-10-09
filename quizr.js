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
  $('body').click(() => {
    var ix = _.map(dimensions, d => rand(d));
    var q = _.map(dimensions, d => {
      var out = rand(d);
      return out;
    }).join(' ');
    $('body').html(q);
  });
  $('body').click();
});