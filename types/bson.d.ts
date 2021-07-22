/**
 * Unfortunately, the file `bson/lib/objectid` does not have its own
 * type definitions. This causes TypeScript to throw an error when we
 * try and use it instead of the whole bson module. This is mostly
 * copy/pasted from the `bson.d.ts` in the installed package.
 */
declare module 'bson/lib/objectid' {
  /** @public */
  export interface ObjectIdLike {
    id: string | Buffer;
    __id?: string;
    toHexString(): string;
  }
  /**
   * A class representation of the BSON ObjectId type.
   * @public
   */
  export class ObjectId {
    _bsontype: 'ObjectId';
    /* Excluded from this release type: index */
    static cacheHexString: boolean;
    /* Excluded from this release type: [kId] */
    /* Excluded from this release type: __id */
    /**
     * Create an ObjectId type
     *
     * @param id - Can be a 24 character hex string, 12 byte binary Buffer, or a number.
     */
    constructor(id?: string | Buffer | number | ObjectIdLike | ObjectId);
    /*
     * The ObjectId bytes
     * @readonly
     */
    id: Buffer;
    /*
     * The generation time of this ObjectId instance
     * @deprecated Please use getTimestamp / createFromTime which returns an int32 epoch
     */
    generationTime: number;
    /** Returns the ObjectId id as a 24 character hex string representation */
    toHexString(): string;
    /* Excluded from this release type: getInc */
    /**
     * Generate a 12 byte id buffer used in ObjectId's
     *
     * @param time - pass in a second based timestamp.
     */
    static generate(time?: number): Buffer;
    /* Excluded from this release type: toString */
    /* Excluded from this release type: toJSON */
    /**
     * Compares the equality of this ObjectId with `otherID`.
     *
     * @param otherId - ObjectId instance to compare against.
     */
    equals(otherId: string | ObjectId | ObjectIdLike): boolean;
    /** Returns the generation date (accurate up to the second) that this ID was generated. */
    getTimestamp(): Date;
    /* Excluded from this release type: createPk */
    /**
     * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
     *
     * @param time - an integer number representing a number of seconds.
     */
    static createFromTime(time: number): ObjectId;
    /**
     * Creates an ObjectId from a hex string representation of an ObjectId.
     *
     * @param hexString - create a ObjectId from a passed in 24 character hexstring.
     */
    static createFromHexString(hexString: string): ObjectId;
    /**
     * Checks if a value is a valid bson ObjectId
     *
     * @param id - ObjectId instance to validate.
     */
    static isValid(
      id: number | string | ObjectId | Uint8Array | ObjectIdLike,
    ): boolean;

    /* Excluded from this release type: toExtendedJSON */
    /* Excluded from this release type: fromExtendedJSON */
    inspect(): string;
  }
}
