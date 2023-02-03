# eslint-plugin-enforce-absolute-imports

## Getting Started

Use the recommended configuration

```json
  "extends": ["plugin:enforce-absolute-imports/recommended"]
```

## Rules

### enforce-absolute-imports/imports

This rule enforces absolute imports.

```js
...
"enforce-absolute-imports/imports": [<enabled>, { allowShorterRelative: <boolean> }]
...
```

#### Options

- `allowShorterRelative` (default: `false`): Allow relative imports that have fewer segments than the absolute import.
