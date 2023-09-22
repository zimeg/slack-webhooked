import { Manifest } from "deno-slack-sdk/mod.ts";
import RelayMessageWorkflow from "./workflows/relay_message_workflow.ts";

export default Manifest({
  name: "Webhooked",
  description: "Securely share messages from the outerweb",
  icon: "assets/icon.png",
  workflows: [RelayMessageWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
