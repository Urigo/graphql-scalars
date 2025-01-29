---
'graphql-scalars': patch
---

Now the regex updated to support all phone numbers compliant with the E.164 international format
standard, which includes country code (Optional), area codes, and local numbers and extension
(optional). For more information on E.164 formatting, Regex: https://regex101.com/r/nol2F6/1

Ex. +62 (21) 9175 5194, 2191755194, +1 123-456-7890 12345, +1 (123) 456-7890
