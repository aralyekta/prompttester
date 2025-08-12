# PromptTester

Test and compare LLM prompts across OpenAI, Claude, and Gemini with real-time cost tracking.

## Features

- **Multi-Provider**: OpenAI (GPT-4/5), Claude (Opus/Sonnet), Gemini (Pro/Flash)
- **Batch Testing**: Run multiple scenarios simultaneously
- **Cost Tracking**: Real-time pricing with token usage
- **Comparison Mode**: Side-by-side response comparison
- **Import/Export**: Share scenarios as JSON

## Quick Start

```bash
npm install
npm start
```

1. Add your API keys
2. Create test scenarios
3. Run and compare results

## How It Works

The app uses official SDKs to connect directly to each provider. It automatically handles role conversion between different APIs (e.g., OpenAI's "developer" → Claude's "user") and calculates costs based on each provider's pricing structure.

## License

MIT