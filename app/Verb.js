// // irreg
// go: {
//   esp: {
//     infinitive: 'ir',
//     present: {
//       first:      'voy',
//       secondInf:  'vas',
//       third:      'va',
//       firstPlural:'vamos',
//       secondForm: 'vais',
//       thirdPlural:'van',
//     },
//     past: {
//       first:      'fui',
//       secondInf:  'fuiste',
//       third:      'fue',
//       firstPlural:'fuistemos',
//       secondForm: 'fuisteis',
//       thirdPlural:'fueran',
//     },
//     future: {
//       // TODO: is this right?
//       first:      'iré',
//       secondInf:  'irás',
//       third:      'irá',
//       firstPlural:'iremos',
//       secondForm: 'iréis',
//       thirdPlural:'iran',
//     },
//   },
//   eng: {
//     infinitive: 'to go',
//     present: {
//       first:      'go',
//       secondInf:  'go',
//       third:      'goes',
//       firstPlural:'go',
//       secondForm: 'go',
//       thirdPlural:'go',
//     },
//     past: {
//       first:      'went',
//       secondInf:  'went',
//       third:      'went',
//       firstPlural:'went',
//       secondForm: 'went',
//       thirdPlural:'went',
//     },
//     future: {
//       first:      'will go',
//       secondInf:  'will go',
//       third:      'will go',
//       firstPlural:'will go',
//       secondForm: 'will go',
//       thirdPlural:'will go',
//     },
//   }
// },

class Verb {
  constructor(config) {
    this.config = config;
  }

  conjugate(lang, person, tense) {
  }
}

if (typeof module === 'object') {
  module.exports = Verb;
}

