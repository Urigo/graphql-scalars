import { GenerateRoutes, IRoutes } from '@guild-docs/server';

export function getRoutes(): IRoutes {
  const Routes: IRoutes = {
    _: {
      docs: {
        $name: 'Docs',
        $routes: ['README', 'quick-start', '$usage', '$scalars'],
        _: {
          usage: {
            $name: 'Recipes',
            $routes: ['apollo-server', 'mocks', 'regex'],
          },
          scalars: {
            $name: 'Available Scalars',
            $routes: ['big-int', 'byte'],
          },
        },
      },
    },
  };
  GenerateRoutes({
    Routes,
    folderPattern: 'docs',
    basePath: 'docs',
    basePathLabel: 'Documentation',
  });

  return Routes;
}
