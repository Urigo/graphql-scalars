// GeoJSON Types according to RFC 7946
export type Position = [number, number] | [number, number, number];
export type LineStringCoordinates = Position[];
export type MultiLineStringCoordinates = LineStringCoordinates[];
export type PolygonCoordinates = Position[][]; // Array of linear rings
export type MultiPolygonCoordinates = PolygonCoordinates[];
export type BBox =
  | [number, number, number, number]
  | [number, number, number, number, number, number];

export type Point = {
  type: 'Point';
  coordinates: Position;
  bbox?: BBox;
};

export type MultiPoint = {
  type: 'MultiPoint';
  coordinates: Position[];
  bbox?: BBox;
};

export type LineString = {
  type: 'LineString';
  coordinates: LineStringCoordinates;
  bbox?: BBox;
};

export type MultiLineString = {
  type: 'MultiLineString';
  coordinates: MultiLineStringCoordinates;
  bbox?: BBox;
};

export type Polygon = {
  type: 'Polygon';
  coordinates: PolygonCoordinates;
  bbox?: BBox;
};

export type MultiPolygon = {
  type: 'MultiPolygon';
  coordinates: MultiPolygonCoordinates;
  bbox?: BBox;
};

/*type Geometry = {
  type:
    | 'Point'
    | 'MultiPoint'
    | 'LineString'
    | 'MultiLineString'
    | 'Polygon'
    | 'MultiPolygon'
    | 'GeometryCollection';
  coordinates?: any;
  geometries?: Geometry[];
};*/

export type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  // eslint-disable-next-line no-use-before-define
  | GeometryCollection;

export type GeometryCollection = {
  type: 'GeometryCollection';
  geometries: Geometry[];
  bbox?: BBox;
};

export type Feature = {
  type: 'Feature';
  geometry: Geometry | null;
  properties: { [key: string]: any } | null;
  bbox?: BBox;
};

export type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
  bbox?: BBox;
};

export type GeoJSONObject = Geometry | Feature | FeatureCollection;

/*type GeoJSONObject = {
  type: 'Feature' | 'FeatureCollection' | Geometry['type'];
  geometry?: Geometry;
  geometries?: Geometry[];
  coordinates?: any;
  properties?: { [key: string]: any } | null;
  features?: GeoJSONObject[];
  bbox?: [number, number, number, number] | [number, number, number, number, number, number];
};*/
