import fs from "fs/promises";
import xml2js from "xml2js";

class ReportParserService {
  async parseJUnitReport(filePath) {
    const xmlContent =
      await fs.readFile(
        filePath,
        "utf-8"
      );

    const parser =
      new xml2js.Parser();

    const result =
      await parser.parseStringPromise(
        xmlContent
      );

    return this.extractFailures(
      result
    );
  }

  extractFailures(parsedXml) {
    const failures = [];

    const testSuites =
      parsedXml.testsuite
        ? [parsedXml.testsuite]
        : parsedXml.testsuites
            ?.testsuite || [];

    for (const suite of testSuites) {
      const testCases =
        suite.testcase || [];

      for (const testCase of testCases) {
        if (
          testCase.failure &&
          testCase.failure.length > 0
        ) {
          failures.push({
            testName:
              testCase.$.name,

            status: "FAILED",

            errorMessage:
              testCase.failure[0].$
                ?.message ||
              "Unknown Failure",

            stackTrace:
              testCase.failure[0]._ ||
              "",
          });
        }
      }
    }

    return failures;
  }
}

export default new ReportParserService();