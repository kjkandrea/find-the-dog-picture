export default {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["text", "text-summary"],
  collectCoverageFrom: ["src/api/**/*.[jt]s?(x)"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/assetTransformer.cjs",
  },
};
