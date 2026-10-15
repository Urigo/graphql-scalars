import { scalarsCodegenTypes } from "../src/index"

import * as DefinedScalars from "../src/scalars/index"

describe('scalarsCodegenTypes', () => {
  it('should not be empty', () => {
    expect(Object.keys(scalarsCodegenTypes).length).toBeGreaterThan(0);
  });

  it('should include a codegen type binding for every defined scalar', () => {
    const definedScalarNames = Object.keys(DefinedScalars)
      .filter(key => key.startsWith('GraphQL'))
      .map(key => key.replace(/^GraphQL/, ''));

    const missingScalars = definedScalarNames.filter(
      name => !(name in scalarsCodegenTypes)
    );

    expect(missingScalars).toEqual([]);
  });
});

