# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.4.5] - 2019-02-12

### Fixed

- Fixed the TypeScript definitions in `graphql-scalars.d.ts` (Credit: [@capaj](https://github.com/capaj))

## [0.4.4] - 2019-02-08

### Changed

- Bump dependendencies (Credit: [@capaj](https://github.com/capaj))

### Added

- Added TypeScript type definitions (Credit: [@capaj](https://github.com/capaj))
- Support numeric date format in DateTime (Credit: [@luvies](https://github.com/luvies))

## [0.4.3] - 2019-01-18

### Changed

- Updated packages and dependencies
- Updated Airbnb eslint rules but disabled a couple and fixed issues for one rule
- Add yarn.lock

### Added

- A new options argument for the RegularExpression scalar

## [0.4.2] - 2018-09-21

### Changed

- `URL` - Now supports localhost (e.g., `http://localhost` or `http://localhost:3000`) and more
  set of URLs (Credit: [@igtm](https://github.com/igtm))
- Updated .eslintrc.js with new rule for linebreak-style to override the Airbnb defaults. On Windows
  systems the default line break style is CRLF, which previously would cause linting errors when
  developing on Windows. If Unix style line endings are necessary, those can be fixed via a script
  on commit. Please see https://eslint.org/docs/rules/linebreak-style for more info.
  (Credit: [@Saeris](https://github.com/Saeris))

### Added

- Added `./src/scalars.js` which defines and exports GraphQL scalar definitions as strings, both
  individually and as an array. (Credit: [@Saeris](https://github.com/Saeris))
- `./src/index.js` now exports the scalar definitions both individually and the array of scalar
  definitions as `OKGScalarDefinitions`. (Credit: [@Saeris](https://github.com/Saeris))
- Added new usage documentation for Apollo Server to the README. Updated the list of scalars to
  include `RegularExpression`, `UnsignedInt` and `UnsignedFloat`.
  (Credit: [@Saeris](https://github.com/Saeris))

## [0.4.1] - 2018-07-27

### Changed

- `DateTime` - Add support for serializing from a valid Date ISO string format

## [0.4.0] - 2018-04-27

### Added

- `RegularExpression` scalar type _generator_
- `UnsignedInt` alias for `NonNegativeInt`
- `UnsignedFloat` alias for `NonNegativeFloat`

## [0.3.0] - 2018-04-06

### Changed

- Updated package versions in `devDependencies`
- Updated `graphql` version dependency to `0.13.1`
- Added [Prettier](https://prettier.io/) configuration to `package.json`
- Linted (based on updates to eslint packages) and Prettier-ed all files

### Added

- PhoneNumber
- PostalCode
- `package-lock.json`

## [0.2.0] - 2018-01-16

### Changed

- Implemented more strict numeric type checking
- Some type exception messages changed slightly
- Changed `graphql` from a dependency to a _peer_ dependency

### Added

- NegativeInt
- NegativeFloat
- NonPositiveInt
- NonPositiveFloat
- more tests

## [0.1.0] - 2017-07-14

### Added

- Initial Release - released as [`@okgrow/graphql-scalars`](https://www.npmjs.com/package/@okgrow/graphql-scalars) on npm.
