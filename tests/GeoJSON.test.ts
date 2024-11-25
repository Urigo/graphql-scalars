import { Kind } from 'graphql/language';
import { GraphQLGeoJSON } from '../src/scalars/GeoJSON/GeoJSON.js';

describe('GeoJSON', () => {
  const validExamples = {
    Point: {
      type: 'Point',
      coordinates: [100.0, 0.0],
    },
    MultiPoint: {
      type: 'MultiPoint',
      coordinates: [
        [100.0, 0.0],
        [101.0, 1.0],
      ],
    },
    LineString: {
      type: 'LineString',
      coordinates: [
        [100.0, 0.0],
        [101.0, 1.0],
      ],
    },
    MultiLineString: {
      type: 'MultiLineString',
      coordinates: [
        [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
        [
          [102.0, 2.0],
          [103.0, 3.0],
        ],
      ],
    },
    Polygon: {
      type: 'Polygon',
      coordinates: [
        [
          [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0],
        ],
      ],
    },
    MultiPolygon: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [102.0, 2.0],
            [103.0, 2.0],
            [103.0, 3.0],
            [102.0, 3.0],
            [102.0, 2.0],
          ],
        ],
      ],
    },
    GeometryCollection: {
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Point',
          coordinates: [100.0, 0.0],
        },
      ],
    },
    Feature: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [100.0, 0.0],
      },
      properties: { name: 'Test Point' },
    },
    FeatureCollection: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [100.0, 0.0],
          },
          properties: { name: 'Test Point' },
        },
      ],
    },
  };

  describe('valid', () => {
    Object.entries(validExamples).forEach(([type, example]) => {
      describe(type, () => {
        test('serialize', () => {
          expect(GraphQLGeoJSON.serialize(example)).toEqual(example);
        });

        test('parseValue', () => {
          expect(GraphQLGeoJSON.parseValue(example)).toEqual(example);
        });

        test('parseLiteral', () => {
          expect(
            GraphQLGeoJSON.parseLiteral(
              {
                kind: Kind.STRING,
                value: JSON.stringify(example),
              },
              {},
            ),
          ).toEqual(example);
        });
      });
    });
  });

  describe('invalid', () => {
    describe('not a GeoJSON object', () => {
      const invalidObject = { type: 'NotGeoJSON', coordinates: [1, 2] };

      test('serialize', () => {
        expect(() => GraphQLGeoJSON.serialize(invalidObject)).toThrow(/Invalid GeoJSON/);
      });

      test('parseValue', () => {
        expect(() => GraphQLGeoJSON.parseValue(invalidObject)).toThrow(/Invalid GeoJSON/);
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLGeoJSON.parseLiteral(
            {
              kind: Kind.STRING,
              value: JSON.stringify(invalidObject),
            },
            {},
          ),
        ).toThrow(/Invalid GeoJSON/);
      });
    });

    describe('invalid coordinates', () => {
      const invalidCoords = {
        type: 'Point',
        coordinates: [200, 100], // Invalid longitude/latitude
      };

      test('serialize', () => {
        expect(() => GraphQLGeoJSON.serialize(invalidCoords)).toThrow(/Invalid GeoJSON/);
      });

      test('parseValue', () => {
        expect(() => GraphQLGeoJSON.parseValue(invalidCoords)).toThrow(/Invalid GeoJSON/);
      });
    });

    describe('invalid polygon', () => {
      const unclosedPolygon = {
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
          ], // Not closed
        ],
      };

      test('serialize', () => {
        expect(() => GraphQLGeoJSON.serialize(unclosedPolygon)).toThrow(/Invalid GeoJSON/);
      });
    });

    describe('not an object', () => {
      test('serialize', () => {
        expect(() => GraphQLGeoJSON.serialize(123)).toThrow(/Invalid GeoJSON/);
      });

      test('parseValue', () => {
        expect(() => GraphQLGeoJSON.parseValue(123)).toThrow(/Invalid GeoJSON/);
      });

      test('parseLiteral', () => {
        expect(() => GraphQLGeoJSON.parseLiteral({ value: '123', kind: Kind.INT }, {})).toThrow(
          /Can only validate strings or objects as GeoJSON but got a/,
        );
      });
    });
  });
});
