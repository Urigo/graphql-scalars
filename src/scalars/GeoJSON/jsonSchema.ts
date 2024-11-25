export const geojsonSchema = {
  title: 'GeoJSON',
  type: 'object',
  required: ['type'],
  oneOf: [
    { $ref: '#/definitions/Point' },
    { $ref: '#/definitions/MultiPoint' },
    { $ref: '#/definitions/LineString' },
    { $ref: '#/definitions/MultiLineString' },
    { $ref: '#/definitions/Polygon' },
    { $ref: '#/definitions/MultiPolygon' },
    { $ref: '#/definitions/GeometryCollection' },
    { $ref: '#/definitions/Feature' },
    { $ref: '#/definitions/FeatureCollection' },
  ],
  definitions: {
    Position: {
      type: 'array',
      minItems: 2,
      maxItems: 3,
      items: { type: 'number' },
    },
    Point: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: { enum: ['Point'] },
        coordinates: { $ref: '#/definitions/Position' },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    MultiPoint: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: { enum: ['MultiPoint'] },
        coordinates: {
          type: 'array',
          items: { $ref: '#/definitions/Position' },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    LineString: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: { enum: ['LineString'] },
        coordinates: {
          type: 'array',
          minItems: 2,
          items: { $ref: '#/definitions/Position' },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    MultiLineString: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: { enum: ['MultiLineString'] },
        coordinates: {
          type: 'array',
          items: {
            type: 'array',
            minItems: 2,
            items: { $ref: '#/definitions/Position' },
          },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    Polygon: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: { enum: ['Polygon'] },
        coordinates: {
          type: 'array',
          items: {
            type: 'array',
            minItems: 4,
            items: { $ref: '#/definitions/Position' },
          },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    MultiPolygon: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: { enum: ['MultiPolygon'] },
        coordinates: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'array',
              minItems: 4,
              items: { $ref: '#/definitions/Position' },
            },
          },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    GeometryCollection: {
      type: 'object',
      required: ['type', 'geometries'],
      properties: {
        type: { enum: ['GeometryCollection'] },
        geometries: {
          type: 'array',
          items: {
            oneOf: [
              { $ref: '#/definitions/Point' },
              { $ref: '#/definitions/MultiPoint' },
              { $ref: '#/definitions/LineString' },
              { $ref: '#/definitions/MultiLineString' },
              { $ref: '#/definitions/Polygon' },
              { $ref: '#/definitions/MultiPolygon' },
            ],
          },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    Feature: {
      type: 'object',
      required: ['type', 'geometry', 'properties'],
      properties: {
        type: { enum: ['Feature'] },
        geometry: {
          oneOf: [
            { type: 'null' },
            { $ref: '#/definitions/Point' },
            { $ref: '#/definitions/MultiPoint' },
            { $ref: '#/definitions/LineString' },
            { $ref: '#/definitions/MultiLineString' },
            { $ref: '#/definitions/Polygon' },
            { $ref: '#/definitions/MultiPolygon' },
            { $ref: '#/definitions/GeometryCollection' },
          ],
        },
        properties: {
          oneOf: [{ type: 'null' }, { type: 'object' }],
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
    FeatureCollection: {
      type: 'object',
      required: ['type', 'features'],
      properties: {
        type: { enum: ['FeatureCollection'] },
        features: {
          type: 'array',
          items: { $ref: '#/definitions/Feature' },
        },
        bbox: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: { type: 'number' },
        },
      },
    },
  },
};
