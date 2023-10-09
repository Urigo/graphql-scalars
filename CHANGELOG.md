## CHANGELOG moved to [GitHub releases](https://github.com/Urigo/graphql-scalars/releases)

## 1.22.3

### Patch Changes

- [`9029d0a`](https://github.com/Urigo/graphql-scalars/commit/9029d0a28b81ad13d9dc3533860a2987f7ae6c43)
  Thanks [@ardatan](https://github.com/ardatan)! - Parse BigInt as Number s if they are safe and
  BigInt is not serializable

## 1.22.2

### Patch Changes

- [`b6d930f`](https://github.com/Urigo/graphql-scalars/commit/b6d930fd31f8ad8b4aa2532f4e25d5b15fcadd4a)
  Thanks [@ardatan](https://github.com/ardatan)! - Serialize bigints as numbers if possible

## 1.22.1

### Patch Changes

- [`613d0b4`](https://github.com/Urigo/graphql-scalars/commit/613d0b4a41cb9c4f540ed9e55e5c62ecafa05d5c)
  Thanks [@ardatan](https://github.com/ardatan)! - Introduce DateTimeISO scalar

## 1.22.0

### Minor Changes

- [`2e9ebad`](https://github.com/Urigo/graphql-scalars/commit/2e9ebad9dfcc578a37d8a5858d75053b7124a666)
  Thanks [@ardatan](https://github.com/ardatan)! - New `LocalDateTimeString` scalar

## 1.21.3

### Patch Changes

- [`7460ec4`](https://github.com/Urigo/graphql-scalars/commit/7460ec43ed67003913336bd1f4fac80dc3915a05)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix the spec reference in \`EmailAddress\`

- [`ef0585a`](https://github.com/Urigo/graphql-scalars/commit/ef0585a16796a27e93c82865bcc1fbd1c6e5c5b3)
  Thanks [@ardatan](https://github.com/ardatan)! - If JSON serializer is missing for `BigInt` use
  `number` serialization for safe integers and `string` for unsafe integers by warning the users.

## 1.21.2

### Patch Changes

- [`7b3811d`](https://github.com/Urigo/graphql-scalars/commit/7b3811d50a507573e5b16d1e14c6d203cee1c8d4)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix wrong scalar name in the scalar configuration

## 1.21.1

### Patch Changes

- [`f12ccbd`](https://github.com/Urigo/graphql-scalars/commit/f12ccbd98e8d4a9fd4a9f4bf334eb09f4e4f61ba)
  Thanks [@ardatan](https://github.com/ardatan)! - Add missing `DurationTypeDefinition`

## 1.21.0

### Minor Changes

- [#1817](https://github.com/Urigo/graphql-scalars/pull/1817)
  [`39e1890`](https://github.com/Urigo/graphql-scalars/commit/39e1890f494a19a86f50392cd9c9db6e466f6086)
  Thanks [@cmhhelgeson](https://github.com/cmhhelgeson)! - Add new scalar types related to Library
  and Patent Classifications

### Patch Changes

- [#1801](https://github.com/Urigo/graphql-scalars/pull/1801)
  [`7337d43`](https://github.com/Urigo/graphql-scalars/commit/7337d432cb8a103778ca62a570d27f3f00ec3a2c)
  Thanks [@mcclurejt](https://github.com/mcclurejt)! - Expand the DID scalar regex to accommodate
  did:pkh

- [#1850](https://github.com/Urigo/graphql-scalars/pull/1850)
  [`ea80093`](https://github.com/Urigo/graphql-scalars/commit/ea800938238be4c676ff3a71a4d77c3e66de364a)
  Thanks [@VoloshchenkoAl](https://github.com/VoloshchenkoAl)! - Support UA postal code in
  PostalCode scalar

## 1.20.1

### Patch Changes

- [#1764](https://github.com/Urigo/graphql-scalars/pull/1764)
  [`41551b8`](https://github.com/Urigo/graphql-scalars/commit/41551b8a1cfa616fefe2b67dbaea91d5ca76eeac)
  Thanks [@ardatan](https://github.com/ardatan)! - Throw located GraphQLErrors instead of TypeError

## 1.20.0

### Minor Changes

- [`89a867a`](https://github.com/Urigo/graphql-scalars/commit/89a867afaa0d7a0e5365dce8508aecf67586061a)
  Thanks [@ardatan](https://github.com/ardatan)! - Add JSON Schema annotations for SOFA

## 1.19.0

### Minor Changes

- [`8ba194c`](https://github.com/Urigo/graphql-scalars/commit/8ba194c60fa8e84d20c6ada6bbc30555b9c832c0)
  Thanks [@ardatan](https://github.com/ardatan)! - - feat: add IP scalar (#1717) - Thanks
  @mammadatei!
  - feat: add SemVer scalar (#1728) - Thanks @mammadatei!

## 1.18.0

### Minor Changes

- [`4db9d82`](https://github.com/Urigo/graphql-scalars/commit/4db9d82f36c834dfe37ac3759429c12a1cc24060)
  Thanks [@saihaj](https://github.com/saihaj)! - CUID Scalar

  A field whose value conforms to the standard cuid format as specified in
  [This Repo](https://github.com/ericelliott/cuid#broken-down).
