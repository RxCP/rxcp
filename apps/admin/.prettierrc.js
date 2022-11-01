module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  "useTabs": false,
  singleQuote: true,
  trailingComma: 'all',
};
