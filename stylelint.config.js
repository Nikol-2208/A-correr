module.exports = {
  extends: ["stylelint-config-sass-guidelines", "stylelint-config-prettier"],
  plugins: ["stylelint-scss"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-class-pattern": null,
    "max-nesting-depth": null,
    "selector-max-compound-selectors": 6,
    "selector-no-qualifying-type": null,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["/^box-/", "orient"],
        ignoreSelectors: [":export", /^:import/],
      },
    ],
    "scss/dollar-variable-pattern": "^foo",
    "scss/selector-no-redundant-nesting-selector": true,
  },
};
