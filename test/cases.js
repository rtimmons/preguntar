'use strict';

var mockery = require('mockery');
var expect = require('chai').expect;
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('underscore');

var quizr = require('../quizr.js');

describe('conjugation',() => {
  var doc = yaml.safeLoad(fs.readFileSync('./test/cases.yaml', 'utf8'));

  var only = _.findWhere(doc.cases, { only: true });

  (only ? [only] : doc.cases).forEach((c) => {
    it('given ' + c.given, () => {
      var given = c.given.split(/\s+/);
      var actual = quizr.questionAndAnswerFor.apply(null, given);
      expect(actual).to.deep.equal({
        question: c.question,
        answer:   c.answer,
      });
    });
  });
  it('passes', () => {
    expect(quizr.questionAndAnswerFor('talk', 'first', 'present')).to.deep.equal({
      question: 'I talk',
      answer:   'hablo'
    });
  });
});
