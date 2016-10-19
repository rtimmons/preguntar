'use strict';

var mockery = require('mockery');
var expect = require('chai').expect;
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('underscore');

var config = require('../app/config.js');
var Quizr = require('../app/quizr.js');

var clean = function(ob) {
  var out = {};
  _.forEach(ob, (v,k) => {
    out[k] = v.replace(/<\/?em>/g,'');
  });
  return out;
}

describe('conjugation',() => {
  var doc = yaml.safeLoad(fs.readFileSync('./test/cases.yaml', 'utf8'));

  var only = _.findWhere(doc.cases, { only: true });

  (only ? [only] : doc.cases).forEach((c) => {
    it(c.given + ': ' + c.question + ' => ' + c.answer, () => {
      var quizr = new Quizr(config);
      var given = c.given.split(/\s+/);
      var actual = clean(quizr.questionAndAnswerFor.apply(quizr, given));
      expect(actual).to.deep.equal({
        question: c.question,
        answer:   c.answer,
      });
    });
  });
});
