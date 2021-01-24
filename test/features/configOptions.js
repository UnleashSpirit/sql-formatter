import dedent from 'dedent-js';
import * as sqlFormatter from '../../src/sqlFormatter';

/**
 * Tests for all the config options
 * @param {String} language
 */
export default function supportsConfigOptions(language) {
  const format = (query, cfg = {}) => sqlFormatter.format(query, { ...cfg, language });

  it('supports indent option', () => {
    const result = format('SELECT count(*),Column1 FROM Table1;', {
      indent: '    ',
    });

    expect(result).toBe(dedent`
      SELECT
          count(*),
          Column1
      FROM
          Table1;
    `);
  });

  it('supports linesBetweenQueries option', () => {
    const result = format('SELECT * FROM foo; SELECT * FROM bar;', { linesBetweenQueries: 2 });
    expect(result).toBe(dedent`
      SELECT
        *
      FROM
        foo;

      SELECT
        *
      FROM
        bar;
    `);
  });

  it('supports uppercase option', () => {
    const result = format('select distinct * frOM foo left join bar WHERe cola > 1 and colb = 3', {
      uppercase: true,
    });
    expect(result).toBe(dedent`
      SELECT
        DISTINCT *
      FROM
        foo
        LEFT JOIN bar
      WHERE
        cola > 1
        AND colb = 3
    `);
  });
}
