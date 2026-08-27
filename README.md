# helo-web-mcp

Minimal WebMCP demo using Bun and TypeScript. It registers an
`increment_counter` tool that updates the counter shown on the page.

No package installation, MCP server, or Gemini API key is required to register
and execute the tool manually.

## Requirements

- [Bun](https://bun.com/)
- Chrome 150 or later
- These Chrome flags enabled, followed by a browser relaunch:
  - `chrome://flags/#enable-webmcp-testing`
  - `chrome://flags/#devtools-webmcp-support`

## Run

1. Start the local server:

   ```sh
   bun run dev
   ```

2. Open <http://localhost:3000>.

## Test manually

1. Open Chrome DevTools.
2. Select **Application > WebMCP**.
3. Select `increment_counter`, enter an `amount`, and run the tool.

The counter on the page should increase by the specified amount. This test does
not use an AI model or require an API key.

## Test with natural language

To let an AI model choose and call the tool from a prompt:

1. Install the
   [WebMCP Model Context Tool Inspector](https://chromewebstore.google.com/detail/webmcp-model-context-tool/gbpdfapgefenggkahomfgkhfehlcenpd)
   Chrome extension.
2. Create a Gemini API key in
   [Google AI Studio](https://aistudio.google.com/apikey).
3. Open the extension while this demo is the active tab.
4. Select **Set Gemini API key** and enter the key.
5. Send a prompt such as:

   ```text
   Increase the counter by 5.
   ```

The API key is needed only because the Inspector calls the Gemini API for its
natural-language chat. WebMCP itself does not require Gemini or an API key. Do
not add the key to this repository or to the page source.

The Inspector is an experimental developer tool and does not provide
production-grade security boundaries. Use it only on pages you trust.
