---
id: regular-expression
title: RegularExpression
sidebar_label: RegularExpression
---

A `GraphQLScalarType` object generator that takes two arguments:

- `name` - The name of your custom type
- `regex` - The regex to be used to check against any values for fields with this new type

```
const MyRegexType = new RegularExpression('MyRegexType', /^ABC$/);
```
