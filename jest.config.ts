export default {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["text", "text-summary"],
  collectCoverageFrom: ["src/api/**/*.[jt]s?(x)"],
  testEnvironment: "jsdom",
};
