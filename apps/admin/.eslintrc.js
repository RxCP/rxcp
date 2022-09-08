{
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "svelte3",
    '@typescript-eslint'
  ],
  "overrides": [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  "settings": {
    'svelte3/typescript': true, // load TypeScript as peer dependency
  }
}
