module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  testRegex: "\\.(test|spec)\\.tsx?$",
  transform: {
    "\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.jest.json",
    },
  },
  verbose: true,
  reporters: ["default"],
};
