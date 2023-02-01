'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULTS = {
  allowShorterRelative: true,
};

const getOptions = (context) => {
  const option = context.options[0] || {};
  return {
    allowShorterRelative:
      option.allowShorterRelative !== undefined
        ? option.allowShorterRelative
        : DEFAULTS.allowShorterRelative,
  };
};

const getBaseUrl = () => {
  const fromFile = (name) => {
    const file = JSON.parse(fs.readFileSync(name));
    if (file.compilerOptions && file.compilerOptions.baseUrl) {
      return file.compilerOptions.baseUrl;
    }
  };
  if (fs.existsSync('tsconfig.json')) {
    return fromFile('tsconfig.json');
  }
  if (fs.existsSync('jsconfig.json')) {
    return fromFile('jsconfig.json');
  }
  return './src';
};

const create = (context) => {
  const baseUrl = getBaseUrl();
  const { allowShorterRelative } = getOptions(context);
  const root = path.resolve(process.cwd(), baseUrl);
  return {
    ImportDeclaration(node) {
      const { value: target } = node.source;
      if (target.startsWith('../')) {
        const sourcePath = context.getFilename();
        const targetPath = path.resolve(path.dirname(sourcePath), target);
        const absoluteSource = path.relative(root, sourcePath);
        const absoluteTarget = path.relative(root, targetPath);
        if (absoluteSource.split('/')[0] !== absoluteTarget.split('/')[0]) {
          context.report({
            node,
            message: `Use absolute import "${absoluteTarget}"`,
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${absoluteTarget}'`);
            },
          });
        } else if (
          !allowShorterRelative ||
          target.split('/').length >= absoluteTarget.split('/').length
        ) {
          context.report({
            node,
            message: `Use absolute import "${absoluteTarget}"`,
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${absoluteTarget}'`);
            },
          });
        }
      }
    },
  };
};

module.exports = {
  configs: {
    recommended: {
      plugins: ['absolute-imports'],
      rules: {
        'absolute-imports/imports': [
          'error',
          {
            allowShorterRelative: true,
          },
        ],
      },
    },
  },
  rules: {
    imports: {
      meta: {
        docs: {
          description: 'Enforce absolute imports',
          category: 'Possible Errors',
          recommended: true,
        },
        fixable: 'code',
        schema: [
          {
            type: 'object',
            properties: {
              allowShorterRelative: {
                type: 'boolean',
              },
            },
          },
        ],
      },
      create,
    },
  },
};
