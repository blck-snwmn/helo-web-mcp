const counter = document.querySelector<HTMLOutputElement>("#counter");
const status = document.querySelector<HTMLParagraphElement>("#status");

if (!counter || !status) {
  throw new Error("Required page elements were not found.");
}

let count = 0;

if (!document.modelContext) {
  status.textContent = "WebMCP is not enabled in this browser.";
} else {
  const registrationController = new AbortController();

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      registrationController.abort();
    });
  }

  await document.modelContext.registerTool({
    name: "get_counter",
    description: "Get the current value of the counter displayed on this page.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
    },
    execute: async () => {
      return JSON.stringify({ count });
    },
  }, { signal: registrationController.signal });

  await document.modelContext.registerTool({
    name: "increment_counter",
    description: "Increase the counter displayed on this page.",
    inputSchema: {
      type: "object",
      properties: {
        amount: {
          type: "integer",
          minimum: 1,
          description: "Amount to add to the counter.",
        },
      },
      required: ["amount"],
    },
    annotations: {
      readOnlyHint: false,
    },
    execute: async (input) => {
      const amount = input.amount;

      if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 1) {
        throw new TypeError("amount must be a positive integer.");
      }

      count += amount;
      counter.value = String(count);
      return `Counter increased by ${amount}. Current value: ${count}`;
    },
  }, { signal: registrationController.signal });

  status.textContent = "WebMCP tools registered: get_counter, increment_counter";
}
