import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.153.0/testing/asserts.ts";

import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import handler from "./validate_function.ts";

mf.install();

mf.mock("POST@/api/auth.test", async (args) => {
  const body = await args.formData();
  const token = body.get("token");
  if (token === "xoxp-valid-example") {
    return new Response(`{"ok": true}`);
  } else {
    return new Response(`{"ok": false}`);
  }
});

const { createContext } = SlackFunctionTester("validate_function");
const env = { logLevel: "CRITICAL" };

Deno.test("Verify a valid token is considered authentic", async () => {
  const inputs = {
    key: "xoxp-valid-example",
  };
  const { outputs, error } = await handler(createContext({ inputs, env }));
  assertEquals(error, undefined);
  assertEquals(outputs?.is_valid, true);
});

Deno.test("Verify an invalid token is rejected", async () => {
  const inputs = {
    key: "password123",
  };
  const { error } = await handler(createContext({ inputs, env }));
  assertStringIncludes(error!, "Failed to validate token");
});
