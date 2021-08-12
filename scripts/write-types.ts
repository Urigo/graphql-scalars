import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

import data from './types.json';

let typesFile = `
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */

export type JsonObject = { [Key in string]?: JsonValue };

export interface JsonArray extends Array<JsonValue> {}

export type JsonValue =
| string
| number
| boolean
| null
| JsonObject
| JsonArray;

export type ScalarType<ClientInput, ClientOutput, ServerInput, ServerOutput> = {
  readonly name: string;
  readonly ClientInput: string;
  readonly ClientOutput: string;
  readonly ServerInput: string;
  readonly ServerOutput: string;
  readonly type: {
    ClientInput: ClientInput;
    ClientOutput: ClientOutput;
    ServerInput: ServerInput;
    ServerOutput: ServerOutput;
  };
};

function createScalarType<
  ClientInput,
  ClientOutput,
  ServerInput,
  ServerOutput,
>({
  name,

  ClientInput,
  ClientOutput,

  ServerInput,
  ServerOutput,
}: {
  name: string;
  ClientInput: string;
  ClientOutput: string;

  ServerInput: string;
  ServerOutput: string;
}): ScalarType<ClientInput, ClientOutput, ServerInput, ServerOutput> {
  return {
    name,

    ClientInput,
    ClientOutput,

    ServerInput,
    ServerOutput,
    get type(): never {
      throw Error('This field is only meant to be used for types usage');
    },
  } as const;
}

`;

const names: string[] = [];

for (const v of data) {
  names.push(v['scalar name']);
  typesFile += `
  export const ${v['scalar name']} = createScalarType<${v['parseValue expects']},${v['serialize returns']},${v['parseValue returns']},${v['serialize expects']}>({
    name: '${v['scalar name']}',

    ClientInput: '${v['parseValue expects']}',
    ClientOutput: '${v['serialize returns']}',

    ServerInput: '${v['parseValue returns']}',
    ServerOutput: '${v['serialize expects']}'
  });
  `;
}

typesFile += `
export const Scalars = {
  ${names.join(',\n')}
}
`;

writeFileSync('src/types.ts', typesFile, {
  encoding: 'utf-8',
});

execSync('prettier -w src/types.ts', {
  stdio: 'inherit',
});
