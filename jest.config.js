module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  testRegex: "\\.(test|spec)\\.tsx?$",
  transform: {
    "\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es|@foundry|@workshop|@palantir|@acme|@gotham|@tron)/)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  verbose: true,
  reporters: ["default"],
};
