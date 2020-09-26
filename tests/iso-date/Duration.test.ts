const LUXON_WIDE_VARIETY_OF_VALID_VALUES: string[] = [
  'P5Y3M',
  'PT54M32S',
  'P3DT54M32S',
  'P1W1DT13H23M34S',
  'P2W',
  'PT10000000000000000000.999S',
];

const LUXON_MIXED_OR_NEGATIVE_DURATIONS: string[] = [
  'P-5Y-3M',
  'PT-54M32S',
  'P-3DT54M-32S',
  'P1YT-34000S',
  'P-1W1DT13H23M34S',
  'P-2W',
  '-P1D',
  '-P5Y3M',
  '-P-5Y-3M',
  '-P-1W1DT13H-23M34S',
];

const LUXON_FRACTIONS_OF_A_SECOND: string[] = [
  'PT54M32.5S',
  'PT54M32.53S',
  'PT54M32.534S',
  'PT54M32.5348S',
  'PT54M32.034S',
];

const LUXON_INVALID_EXAMPLES: string[] = [
  'foo',
  'PTglorb',
  '5Y',
  'P34K',
  'P5D2W',
  'PT',
];

const DATE_FNS_VALID_VALUES: string[] = [
  'P2.2Y3.3M4.4DT5.5H6.6M7.7S',
  'P2Y3M5D',
  'P3M5D',
  'P2Y5D',
  'P2Y3M',
  'PT65H40M22S',
  'PT3M4S',
  'PT2H4S',
  'PT2H3M',
];

const DATE_FNS_INVALID_VALUES: string[] = ['abcdef', 'P'];

// https://github.com/moment/moment/blob/dca02edaeceda3fcd52b20b51c130631a058a022/src/test/moment/duration.js
const MOMENT_VALID_VALUES: string[] = [
  'P1Y2M3DT4H5M6S',
  'P3W3D',
  'P1M',
  'PT1M',
  'P1MT2H',
  '-P60D',
  '+P60D',
  'PT0.5S',
  'PT0,5S',
  'P1Y2M3DT4H5M6S',
  '-P1M',
  '-PT1M',
  '-PT0.5S',
  '-P11M',
  '-P1YT-1H',
  '-P1YT-59M',
  '-P1YT-59M-59S',
  '-P1YT59M59S',
  '-P1Y-2D',
  'P1M',
  'PT1M',
  'PT0.5S',
  'P1Y1M',
  '-P1YT-1H',
  'PT34H17M36.789S',
  'PT31.952S',
];

const MOMENT_PYTHON_VALID_VALUES = [
  'P18Y9M4DT11H9M8S',
  'P2W',
  'P3Y6M4DT12H30M5S',
  'P23DT23H',
  'P4Y',
  'P1M',
  'PT1M',
  'P0.5Y',
  'PT36H',
  'P1DT12H',
  '-P2W',
  '-P2.2W',
  '+P2W',
  '+P2.2W',
  'P1DT2H3M4S',
  'P1DT2H3M',
  'P1DT2H',
  'PT2H',
  'PT2.3H',
  'PT2H3M4S',
  'PT3M4S',
  'PT22S',
  'PT22.22S',
  '-P2Y',
  '-P3Y6M4DT12H30M5S',
  '-P1DT2H3M4S',
  'PT-6H3M',
  '-PT-6H3M',
  '-P-3Y-6M-4DT-12H-30M-5S',
  'P-3Y-6M-4DT-12H-30M-5S',
  '-P-2W',
  'P-2W',
  '+P2Y',
  '+P3Y6M4DT12H30M5S',
  '+P1DT2H3M4S',
  'PT+6H3M',
  '+PT+6H3M',
  '+PT-6H3M',
  '+P-3Y-6M-4DT-12H-30M-5S',
  'P+3Y+6M+4DT+12H+30M+5S',
  '+P+2W',
  '+P-2W',
  'P+2W',
];

const NEGATIVE_VALID_VALUES = [
  'P-1Y',
  'P-1M',
  'P-1W',
  'P-1D',
  'PT-1H',
  'PT-1M',
  'PT-1S',
];

const VALID_EXAMPLES: string[] = [
  ...LUXON_WIDE_VARIETY_OF_VALID_VALUES,
  ...LUXON_MIXED_OR_NEGATIVE_DURATIONS,
  ...LUXON_FRACTIONS_OF_A_SECOND,
  ...DATE_FNS_VALID_VALUES,
  ...MOMENT_VALID_VALUES,
  ...MOMENT_PYTHON_VALID_VALUES,
  ...NEGATIVE_VALID_VALUES,
];

const INVALID_VALUES: string[] = [
  ...LUXON_INVALID_EXAMPLES,
  ...DATE_FNS_INVALID_VALUES,
];

// https://stackoverflow.com/questions/32044846/regex-for-iso-8601-durations
// const ISO_DURATION_NEGATIVE_ALLOWED = /^-?P(?!$)(-?\d+(?:\.\d+)?Y)?(-?\d+(?:\.\d+)?M)?(-?\d+(?:\.\d+)?W)?(-?\d+(?:\.\d+)?D)?(T(?=-?\d)(-?\d+(?:\.\d+)?H)?(-?\d+(?:\.\d+)?M)?(-?\d+(?:\.\d+)?S)?)?$/
// const ISO_DURATION_WITHOUT_SIGN = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/

// negative and positive durations allowed commas and decimal points valid for fractions
const ISO_DURATION = /^(-|\+)?P(?!$)((-|\+)?\d+(?:(\.|,)\d+)?Y)?((-|\+)?\d+(?:(\.|,)\d+)?M)?((-|\+)?\d+(?:(\.|,)\d+)?W)?((-|\+)?\d+(?:(\.|,)\d+)?D)?(T(?=(-|\+)?\d)((-|\+)?\d+(?:(\.|,)\d+)?H)?((-|\+)?\d+(?:(\.|,)\d+)?M)?((-|\+)?\d+(?:(\.|,)\d+)?S)?)?$/;

describe('GraphQLISO8601Duration', () => {
  describe('serialization', () => {
    it('returns false for every invalid example', () => {
      INVALID_VALUES.forEach((example) => {
        const result = ISO_DURATION.test(example);
        if (result) {
          console.log(example);
        }
        expect(result).toEqual(false);
      });
    });

    it('returns true for ever valid example', () => {
      VALID_EXAMPLES.forEach((example) => {
        const result = ISO_DURATION.test(example);
        if (!result) {
          console.log(example);
        }
        expect(result).toEqual(true);
      });
    });
  });
});
