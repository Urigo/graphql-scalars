---
'graphql-scalars': patch
---

If JSON serializer is missing for `BigInt` use `number` serialization for safe integers and `string`
for unsafe integers by warning the users.
