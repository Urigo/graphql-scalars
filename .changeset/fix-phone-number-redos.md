---
'graphql-scalars': patch
---

Improve `PhoneNumber` scalar regex parsing performance

The new pattern accepts exactly the same values and matches in linear time.
