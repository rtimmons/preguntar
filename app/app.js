const UNANSWERED = 1;
const ANSWERED   = 2;

class App {
  constructor(quizr, $q, $a) {
    this.$q = $q;
    this.$a = $a;

    this.quizr = quizr;
    this.generateChoice();
  }

  generateChoice() {
    var choice = this.quizr.randomChoice();
    var qa = this.quizr.questionAndAnswerFor(choice.verb, choice.person, choice.tense);
    this.qa = qa;

    this.$q.html(this.qa.question);
    this.$a.html('');
    this.state = UNANSWERED;
  }

  answer() {
    this.$a.html(this.qa.answer);
    this.state = ANSWERED;
  }

  // keycode unused now - but better keyboard nav would be nice
  onKeyUp(keycode) {
    console.log('keycode = %j', keycode);
    if (this.state === UNANSWERED) {
      this.answer();
      return;
    }
    this.generateChoice();
  }
}

if (typeof module === 'object') {
  module.exports = App;
}