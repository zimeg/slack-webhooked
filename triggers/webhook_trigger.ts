import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import RelayMessageWorkflow from "../workflows/relay_message_workflow.ts";

/*
 * https://api.slack.com/automation/triggers/webhook
 */
const greetingTrigger: Trigger<typeof RelayMessageWorkflow.definition> = {
  type: TriggerTypes.Webhook,
  name: "Relay a message",
  description: "Share an authorized webhook message",
  workflow: `#/workflows/${RelayMessageWorkflow.definition.callback_id}`,
  inputs: {
    key: {
      value: "{{data.token}}",
    },
    channel: {
      value: "{{data.channel}}",
    },
    message: {
      value: "{{data.message}}",
    },
  },
};

export default greetingTrigger;
