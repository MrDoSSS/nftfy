module.exports = {
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false,
        explicitTypes: 'preserve',
      },
    },
  ],
  plugins: [require('prettier-plugin-tailwindcss')],
}
