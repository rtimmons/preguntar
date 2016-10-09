var config = {
  verbs: {
    // reg ar
    talk:  { esp: 'hablar',   },
    study: { esp: 'estudiar', },
    work:  { esp: 'trabajar', },
    drink: { esp: 'tomar',    },
    walk:  { esp: 'caminar'   },
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
    live:   { esp: 'vivir' },

    // reg er
    eat:      { esp: 'comer' },

    // irreg past
    want: {
      esp: 'querer',
      type: ['irregFuture', 'reger'],
      stems: {
        future: 'querr',
      },
    },
  },

  persons: {
    first:      { esp: 'yo',      eng: 'I',              },
    secondInf:  { esp: 'tú',      eng: 'You <small>(inf)</small>', },
    third:      { esp: 'él/ella', eng: 'He/she',         },
    firstPlural:{ esp: 'nosotros',eng: 'We'              },
    secondForm: { esp: 'vosotros',eng: 'You <small>(pl)</small>', },
    thirdPlural:{ esp: 'ellos',   eng: 'They'            },
  },

  tenses: {
    present:  {},
    past:     { eng: v => `${v.engVerb}ed`    },
    future:   { eng: v => `will ${v.engVerb}`, esp: c => c.esp },
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
