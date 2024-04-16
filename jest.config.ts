export default {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["text", "text-summary"],
  // no react function or class, react hooks
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts",
    "!src/**/*.d.ts",
    "!src/const/**.ts",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/assetTransformer.cjs",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
