var config = {
  // TODO: add preterite vs imperfect subjunctive

  verbs: {
  },

  built_in_verbs: {
    // reg ar
    talk:  { esp: 'hablar',   },
    study: { esp: 'estudiar', },
    work:  { esp: 'trabajar', },
    drink: { esp: 'tomar',    },
    walk:  { esp: 'caminar'   },
    travel:{ esp: 'viajar'    },
    bkfst: { esp: 'desayunar', eng: 'breakfast' },
    lunch: { esp: 'almorzar', },
    dinner:{ esp: 'cenar',    },
    buy:   { esp: 'comprar',  },
    prepare:  { esp: 'preparar', },
    arrive:   { esp: 'llegar',    },
    wash:     { esp: 'lavar',     },
    ask:      { esp: 'preguntar', },
    call:     { esp: 'llamar',    },

    // reg ir
    live:   { esp: 'vivir'    },
    decide: { esp: 'decidir'  },
    write:  { esp: 'escribir' },

    // reg er
    eat:      { esp: 'comer' },
    drink:    { esp: 'beber' },
    respond:  { esp: 'responder' },

    // irreg past
    want: {
      esp: 'querer',
      type: ['irregFuture', 'irregPast', 'reger'],
      stems: {
        future: 'querr',
        past:   'quis',
      },
    },
    know: {
      esp: 'saber',
      type: ['irregFuture', 'irregPast', 'reger'],
      eng: {
        past: 'knew',
      },
      stems: {
        future: 'sabr',
        past:   'sup',
      },
    },
    have: {
      esp: 'tener',
      type: ['irregFuture', 'irregPast', 'reger'],
      stems: {
        // TODO: is this right?
        present: 'teng',
        future: 'tendr',
        past:   'tuv',
      },
    },
    // TODO: andar vs caminar?
    // walk: {
    //   esp: 'andar',
    //   type: ['irregPast', 'regar'],
    //   stems: {
    //     past:   'anduv',
    //   },
    // },
    able: {
      esp: 'poder',
      eng: {
        present: 'can',
        past: 'was/were able to',
        future: 'will be able to',
      },
      type: ['irregFuture', 'irregPast', 'reger'],
      stems: {
        present:'pued',
        future: 'podr',
        past:   'pud',
      },
    },

    // TODO: hicer
    // TODO: estar
    // TODO: ser

    go: {
      esp: {
        infinitive: 'ir',
        present: {
          first:      'voy',
          secondInf:  'vas',
          third:      'va',
          firstPlural:'vamos',
          secondForm: 'vais',
          thirdPlural:'van',
        },
        past: {
          first:      'fui',
          secondInf:  'fuiste',
          third:      'fue',
          firstPlural:'fuistemos',
          secondForm: 'fuisteis',
          thirdPlural:'fueran',
        },
        future: {
          // TODO: is this right?
          first:      'iré',
          secondInf:  'irás',
          third:      'irá',
          firstPlural:'iremos',
          secondForm: 'iréis',
          thirdPlural:'iran',
        },
      },
      eng: {
        infinitive: 'to go',
        present: {
          first:      'go',
          secondInf:  'go',
          third:      'goes',
          firstPlural:'go',
          secondForm: 'go',
          thirdPlural:'go',
        },
        past: {
          first:      'went',
          secondInf:  'went',
          third:      'went',
          firstPlural:'went',
          secondForm: 'went',
          thirdPlural:'went',
        },
        future: {
          first:      'will go',
          secondInf:  'will go',
          third:      'will go',
          firstPlural:'will go',
          secondForm: 'will go',
          thirdPlural:'will go',
        },
      }
    },
  },

  persons: {
    first:      { esp: 'yo',      eng: 'I',              },
    secondInf:  { esp: 'tú',      eng: 'You <em>(inf)</em>', },
    third:      { esp: 'él/ella', eng: 'He/she',         },
    firstPlural:{ esp: 'nosotros',eng: 'We'              },
    secondForm: { esp: 'vosotros',eng: 'You <em>(pl)</em>', },
    thirdPlural:{ esp: 'ellos',   eng: 'They'            },
  },

  tenses: {
    present:  {},
    past:     { eng: v => `${v}<em>'d</em>`    },
    future:   { eng: v => `will ${v}`, esp: c => c.esp },
  },

  types: {

    irregFuture: {
      future: {
        first: 'é',
        secondInf: 'ás',
        third: 'á',
        firstPlural: 'emos',
        secondForm: 'éis',
        thirdPlural: 'an',
      }
    },

    irregPast: {
      past: {
        first: 'e',
        secondInf: 'iste',
        third: 'o',
        firstPlural: 'imos',
        secondForm: 'isteis',
        thirdPlural: 'ieron',
      }
    },

    regar: {
      present: {
        first: 'o',
        secondInf: 'as',
        third: 'a',
        firstPlural: 'amos',
        secondForm: 'áis',
        thirdPlural: 'an',
      },
      past: {
        first: 'é',
        secondInf: 'aste',
        third: 'ó',
        firstPlural: 'amos',
        secondForm: 'asteis',
        thirdPlural: 'aron',
      },
      future: {
        first: 'é',
        secondInf: 'ás',
        third: 'á',
        firstPlural: 'emos',
        secondForm: 'eis',
        thirdPlural: 'an',
      },
    },

    regir: {
      present: {
        first: 'o',
        secondInf: 'es',
        third: 'e',
        firstPlural: 'imos',
        secondForm: 'is',
        thirdPlural: 'en',
      },
      past: {
        first: 'í',
        secondInf: 'iste',
        third: 'ió',
        firstPlural: 'imos',
        secondForm: 'isteis',
        thirdPlural: 'ieron',
      },
      future: {
        first: 'é',
        secondInf: 'ás',
        third: 'á',
        firstPlural: 'emos',
        secondForm: 'eis',
        thirdPlural: 'an',
      },
    },

    reger: {
      present: {
        first: 'o',
        secondInf: 'es',
        third: 'e',
        firstPlural: 'emos',
        secondForm: 'éis',
        thirdPlural: 'en',
      },
      past: {
        first: 'í',
        secondInf: 'iste',
        third: 'ió',
        firstPlural: 'emos',
        secondForm: 'esteis',
        thirdPlural: 'ieron',
      },
      future: {
        first: 'é',
        secondInf: 'ás',
        third: 'á',
        firstPlural: 'emos',
        secondForm: 'eis',
        thirdPlural: 'an',
      },
    },

  },
};


if (typeof module === 'object') {
  module.exports = config;
}
