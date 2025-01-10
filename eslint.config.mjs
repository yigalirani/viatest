import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";

import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { promises as fs } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});
const check_import=false//very slow, so turn on when needed
const import_extend=function(){
  if (!check_import)
    return []
  return  [
    "plugin:import/typescript",
    "plugin:import/recommended"
  ]
}() 
const import_rules=function(){
  if (!check_import)
    return {}
  return {
    "import/no-unresolved": "off",  
    'import/no-cycle': ['error', {
      ignoreExternal: true,  // Skip checking external dependencies - not working due to bug in the plugin
    }],
    "import/named": "off",
    "import/default":"off",
  }
}()
const ans = [{
  ignores: [
    "**/*.html",
    "**/*.css",
    "**/*.txt",
    "**/*.bat",
    "**/*.py",
    "**/*.json",
    "**/*.md",
    "**/*.png",
    "**/*.ico",
    "**/unused_code",
    "**/tmp",
    "**/dist",
    "**/node_modules",
    "**/.git",
    "**/.vscode",
    "**/data",
    "**/3dparty",
    "**/old",
    "src/unused_code",
    "src/unconverted",
    "*.js",
    "types"
  ],
}, ...fixupConfigRules(compat.extends(
  "eslint:recommended",
  ...import_extend,
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
)), {
  plugins: {
    "@typescript-eslint": fixupPluginRules(typescriptEslint),
  },

  languageOptions: {
    globals: {
      ...globals.webextensions,
      ...globals.browser,
    },

    parser: tsParser,
    ecmaVersion: 2022,
    sourceType: "module",
  },

  settings: {},

  rules: { 
    "@typescript-eslint/no-inferrable-types": ["error"],
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-unused-vars": "off",
    ...import_rules,
    "prefer-const": "warn",
    "no-inner-declarations": "warn",
    "no-duplicate-imports": "warn",
    "no-unused-labels": "off",
    "no-empty-pattern": "off",
    "no-use-before-define": "warn",
    "no-self-compare": "warn",
    "no-unused-expressions": "warn",
    "max-params": "warn",
    "no-param-reassign": "off",
    "logical-assignment-operators": "warn",
    "no-func-assign": "warn",
    "no-var": "warn",

  
    "@typescript-eslint/ban-ts-comment": "off",

    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^(_|debug_)",
      caughtErrorsIgnorePattern: "^_",
    }],

    //"@typescript-eslint/ban-types": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-unsafe-function-type": "warn",
    "@typescript-eslint/no-wrapper-object-types": "warn"
  },
}];
//fs.writeFile('eslint_coonfig.json',JSON.stringify(ans,null,2))
//console.log()
export default ans