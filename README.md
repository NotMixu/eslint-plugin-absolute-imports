<!-- README for eslint-plugin-absolute-imports -->

# eslint-plugin-absolute-imports

## Getting Started

Use the recommended configuration

```json
  "extends": ["plugin:absolute-imports/recommended"]
```

## Rules

### absolute-imports/imports

This rule enforces absolute imports.

```js
...
"absolute-imports/imports": [<enabled>, { allowShorterRelative: <boolean> }]
...
```

#### Options

- `allowShorterRelative` (default: `false`): Allow relative imports that have fewer segments than the absolute import.
