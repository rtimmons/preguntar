'use strict';

var mockery = require('mockery');
var expect = require('chai').expect;
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('underscore');

var quizr = require('../quizr.js');

describe('conjugation',() => {
  it('passes', () => {
    expect(quizr.questionAndAnswerFor('talk', 'first', 'present')).to.deep.equal({
      question: 'I talk',
      answer:   'hablo'
    });
  });
});
