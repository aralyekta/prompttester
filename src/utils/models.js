// Model configurations - Last updated: August 9, 2025

export const AVAILABLE_MODELS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'gpt-4o-nano', label: 'GPT-4o Nano' },
  { value: 'gpt-5', label: 'GPT-5' },
  { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
  { value: 'gpt-5-nano', label: 'GPT-5 Nano' }
];

// Pricing per 1M tokens
const PRICING = {
  'gpt-5': {
    input: 1.25,
    cached: 0.125,
    output: 10.00
  },
  'gpt-5-mini': {
    input: 0.25,
    cached: 0.025,
    output: 2.00
  },
  'gpt-5-nano': {
    input: 0.05,
    cached: 0.005,
    output: 0.40
  },
  'gpt-4o': {
    input: 2.50,
    cached: 1.25,
    output: 10.00
  },
  'gpt-4o-mini': {
    input: 0.15,
    cached: 0.075,
    output: 0.60
  },
  'gpt-4o-nano': {
    input: 0.15,
    cached: 0.075,
    output: 0.60
  }
};

export const isGpt5Model = (model) => {
  return model && model.startsWith('gpt-5');
};

export const calculateCost = (model, usage) => {
  const modelPricing = PRICING[model] || PRICING['gpt-4o-mini'];
  
  // Extract token counts from usage object
  const inputTokens = usage.prompt_tokens || 0;
  const outputTokens = usage.completion_tokens || 0;
  const cachedTokens = usage.prompt_tokens_details?.cached_tokens || 0;
  const uncachedInputTokens = inputTokens - cachedTokens;
  
  // Calculate costs per million tokens
  const inputCost = (uncachedInputTokens / 1000000) * modelPricing.input;
  const cachedCost = (cachedTokens / 1000000) * modelPricing.cached;
  const outputCost = (outputTokens / 1000000) * modelPricing.output;
  
  return {
    inputCost,
    cachedCost,
    outputCost,
    totalCost: inputCost + cachedCost + outputCost,
    inputTokens: uncachedInputTokens,
    cachedTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens
  };
};

export const formatCost = (cost) => {
  if (cost === 0) return '$0.00';
  if (cost < 0.000001) return '<$0.000001';
  if (cost < 0.001) return `$${cost.toFixed(6)}`;
  if (cost < 0.01) return `$${cost.toFixed(4)}`;
  return `$${cost.toFixed(2)}`;
};

export const formatTokens = (tokens) => {
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}k`;
  }
  return tokens.toString();
};