import openai from "../src/config/openai.js";

class AIService {
  async analyzeFailure(
    failure
  ) {
    const prompt = `
Analyze the following automated test failure.

Test Name:
${failure.testName}

Error Message:
${failure.errorMessage}

Stack Trace:
${failure.stackTrace}

Return JSON in this format:

{
  "rootCause": "...",
  "suggestedFix": "...",
  "confidenceScore": 90
}
`;

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        response_format: {
          type: "json_object",
        },
      });

    return JSON.parse(
      response.choices[0].message.content
    );
  }
}

export default new AIService();