import { ASTNode, GraphQLError, Source, versionInfo } from 'graphql';

interface GraphQLErrorOptions {
  nodes?: ReadonlyArray<ASTNode> | ASTNode | null;
  source?: Source;
  positions?: ReadonlyArray<number>;
  path?: ReadonlyArray<string | number>;
  originalError?: Error & {
    readonly extensions?: unknown;
  };
  extensions?: any;
}

export function createGraphQLError(message: string, options?: GraphQLErrorOptions): GraphQLError {
  if (versionInfo.major >= 17) {
    return new GraphQLError(message, options);
  }
  return new GraphQLError(
    message,
    options?.nodes,
    options?.source,
    options?.positions,
    options?.path,
    options?.originalError,
    options?.extensions
  );
}
