# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.4.0] - 2018-05-04

### Added

* `RegularExpression` scalar type _generator_
* `UnsignedInt` alias for `NonNegativeInt`
* `UnsignedFloat` alias for `NonNegativeFloat`
* `yarn.lock`

## [0.3.0] - 2018-04-06

### Changed

* Updated package versions in `devDependencies`
* Updated `graphql` version dependency to `0.13.1`
* Added [Prettier](https://prettier.io/) configuration to `package.json`
* Linted (based on updates to eslint packages) and Prettier-ed all files

### Added

* PhoneNumber
* PostalCode
* `package-lock.json`

## [0.2.0] - 2018-01-16

### Changed

* Implemented more strict numeric type checking
* Some type exception messages changed slightly
* Changed `graphql` from a dependency to a _peer_ dependency

### Added

* NegativeInt
* NegativeFloat
* NonPositiveInt
* NonPositiveFloat
* more tests

## [0.1.0] - 2017-07-14

### Added

* Initial Release - released as [`@okgrow/graphql-scalars`](https://www.npmjs.com/package/@okgrow/graphql-scalars) on npm.
