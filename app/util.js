var rand = function(array) {
  var r = Math.round(Math.random() * (array.length-1));
  var out = array[r];
  return out;
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

if (typeof module === 'object') {
  module.exports = {
    rand: rand,
    deepClone: deepClone,
  };
}
