import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ValidateFunctionDefinition } from "../functions/validate_function.ts";

const RelayMessageWorkflow = DefineWorkflow({
  callback_id: "relay_message",
  title: "Relay a message",
  description: "Share an authorized webhook message",
  input_parameters: {
    properties: {
      key: {
        title: "Token",
        description: "An authenticated Slack token",
        type: Schema.types.string,
      },
      channel: {
        title: "Channel ID",
        description: "The place for posting a message",
        type: Schema.slack.types.channel_id,
      },
      message: {
        title: "Message",
        description: "A message to share",
        type: Schema.types.string,
      },
    },
    required: ["key", "channel", "message"],
  },
});

RelayMessageWorkflow.addStep(ValidateFunctionDefinition, {
  key: RelayMessageWorkflow.inputs.key,
});

RelayMessageWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: RelayMessageWorkflow.inputs.channel,
  message: RelayMessageWorkflow.inputs.message,
});

export default RelayMessageWorkflow;
