import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ValidateFunctionDefinition = DefineFunction({
  callback_id: "validate_function",
  title: "Validate a token",
  description: "Verify a token matches an authenticated identity",
  source_file: "functions/validate_function.ts",
  input_parameters: {
    properties: {
      key: {
        type: Schema.types.string,
        title: "Token",
        description: "An authenticated Slack token",
        examples: ["xoxp-example-token"],
      },
    },
    required: ["key"],
  },
  output_parameters: {
    properties: {
      is_valid: {
        type: Schema.types.boolean,
        title: "Valid",
        description: "Returns if the token matches an authorized identity",
        examples: [true, false],
      },
    },
    required: ["is_valid"],
  },
});

export default SlackFunction(
  ValidateFunctionDefinition,
  async ({ inputs, client }) => {
    const { key } = inputs;
    const resp = await client.auth.test({ token: key });
    if (!resp.ok) {
      return { error: `Failed to validate token: ${resp.error}` };
    }
    return {
      outputs: { is_valid: resp.ok },
    };
  },
);
