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

  clearConfig() {
    this.quizr.clearConfig();
    this.qa = null;

    this.$q.html('');
    this.$a.html('');
  }

  addVerb() {
    var esp = window.prompt('¿Infinitivo?')
    var eng = window.prompt('¿Significa \'to ...\' qué en Inglés?');
    this.quizr.setVerb(eng, {
      esp: esp,
    });
    this.generateChoice();
  }

  // keycode unused now - but better keyboard nav would be nice
  onKeyUp(keycode) {
    console.log('keycode = %j', keycode);
    if ( keycode == 91 /*cmd*/ || keycode == 16 /*shift*/ ) { 
      return;
    }
    if (keycode == 82 /*r*/) {
      this.clearConfig();
      return;
    }
    if (keycode == 68 /*d*/) {
      this.addVerb();
      return;
    }

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
