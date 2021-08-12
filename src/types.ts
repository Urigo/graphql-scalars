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

export const ID = createScalarType<
  string | number,
  string,
  string,
  string | number
>({
  name: 'ID',

  ClientInput: 'string | number',
  ClientOutput: 'string',

  ServerInput: 'string',
  ServerOutput: 'string | number',
});

export const Int = createScalarType<
  number,
  number,
  number,
  number | boolean | string | { toJSON: Function } | { valueOf: Function }
>({
  name: 'Int',

  ClientInput: 'number',
  ClientOutput: 'number',

  ServerInput: 'number',
  ServerOutput:
    'number | boolean | string | { toJSON: Function } | { valueOf: Function }',
});

export const Float = createScalarType<
  number,
  number,
  number,
  number | boolean | string | { toJSON: Function } | { valueOf: Function }
>({
  name: 'Float',

  ClientInput: 'number',
  ClientOutput: 'number',

  ServerInput: 'number',
  ServerOutput:
    'number | boolean | string | { toJSON: Function } | { valueOf: Function }',
});

export const String = createScalarType<
  string,
  string,
  string,
  string | boolean | number | { toJSON: Function } | { valueOf: Function }
>({
  name: 'String',

  ClientInput: 'string',
  ClientOutput: 'string',

  ServerInput: 'string',
  ServerOutput:
    'string | boolean | number | { toJSON: Function } | { valueOf: Function }',
});

export const Boolean = createScalarType<
  boolean,
  boolean,
  boolean,
  boolean | string | number | { toJSON: Function } | { valueOf: Function }
>({
  name: 'Boolean',

  ClientInput: 'boolean',
  ClientOutput: 'boolean',

  ServerInput: 'boolean',
  ServerOutput:
    'boolean | string | number | { toJSON: Function } | { valueOf: Function }',
});

export const DateTime = createScalarType<
  string | Date,
  string,
  Date,
  Date | string | number
>({
  name: 'DateTime',

  ClientInput: 'string | Date',
  ClientOutput: 'string',

  ServerInput: 'Date',
  ServerOutput: 'Date | string | number',
});

export const Timestamp = createScalarType<
  string | number | Date,
  number,
  Date,
  Date | string | number
>({
  name: 'Timestamp',

  ClientInput: 'string | number | Date',
  ClientOutput: 'number',

  ServerInput: 'Date',
  ServerOutput: 'Date | string | number',
});

export const Void = createScalarType<any, null, null, any>({
  name: 'Void',

  ClientInput: 'any',
  ClientOutput: 'null',

  ServerInput: 'null',
  ServerOutput: 'any',
});

export const USCurrency = createScalarType<string, string, number, number>({
  name: 'USCurrency',

  ClientInput: 'string',
  ClientOutput: 'string',

  ServerInput: 'number',
  ServerOutput: 'number',
});

export const UUID = createScalarType<string, string, string, string>({
  name: 'UUID',

  ClientInput: 'string',
  ClientOutput: 'string',

  ServerInput: 'string',
  ServerOutput: 'string',
});

export const JSON = createScalarType<unknown, JsonValue, JsonValue, unknown>({
  name: 'JSON',

  ClientInput: 'unknown',
  ClientOutput: 'JsonValue',

  ServerInput: 'JsonValue',
  ServerOutput: 'unknown',
});

export const JSONObject = createScalarType<
  Record<string | number, any>,
  JsonObject,
  JsonObject,
  Record<string | number, any>
>({
  name: 'JSONObject',

  ClientInput: 'Record<string | number,any>',
  ClientOutput: 'JsonObject',

  ServerInput: 'JsonObject',
  ServerOutput: 'Record<string | number,any>',
});

export const Scalars = {
  ID,
  Int,
  Float,
  String,
  Boolean,
  DateTime,
  Timestamp,
  Void,
  USCurrency,
  UUID,
  JSON,
  JSONObject,
};
