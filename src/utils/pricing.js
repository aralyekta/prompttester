// Advanced pricing calculations with tier support

// TODO: Consider the cache_write_5m and cache_write_1h as input tokens for Claude.
// Claude pricing structure per million tokens
const CLAUDE_PRICING = {
  'claude-opus-4-1-20250805': {
    base_input: 15.00,
    cache_write_5m: 18.75,
    cache_write_1h: 30.00,
    cache_hits: 1.50,
    output: 75.00
  },
  'claude-opus-4-20250514': {
    base_input: 15.00,
    cache_write_5m: 18.75,
    cache_write_1h: 30.00,
    cache_hits: 1.50,
    output: 75.00
  },
  'claude-sonnet-4-20250514': {
    base_input: 3.00,
    cache_write_5m: 3.75,
    cache_write_1h: 6.00,
    cache_hits: 0.30,
    output: 15.00
  },
  'claude-3-7-sonnet-20250219': {
    base_input: 3.00,
    cache_write_5m: 3.75,
    cache_write_1h: 6.00,
    cache_hits: 0.30,
    output: 15.00
  }
};

// TODO: Consider cache_storage_per_hour and grounding_per_1k as input tokens for Gemini.
// Gemini pricing structure per million tokens
const GEMINI_PRICING = {
  'gemini-2.5-pro': {
    // Tiered pricing based on prompt size
    input: {
      under_200k: 1.25,
      over_200k: 2.50
    },
    output: {
      under_200k: 10.00,
      over_200k: 15.00
    },
    cache: {
      under_200k: 0.31,
      over_200k: 0.625
    },
    cache_storage_per_hour: 4.50,
    grounding_per_1k: 35.00  // After 1,500 free requests per day
  },
  'gemini-2.5-flash': {
    input: {
      text: 0.30,
      audio: 1.00
    },
    output: 2.50,  // Including thinking tokens
    cache: {
      text: 0.075,
      audio: 0.25
    },
    cache_storage_per_hour: 1.00,
    grounding_per_1k: 35.00,  // After 1,500 free requests per day
    live_api: {
      input_text: 0.50,
      input_audio: 3.00,
      output_text: 2.00,
      output_audio: 12.00
    }
  }
};

// OpenAI pricing (keeping existing structure)
const OPENAI_PRICING = {
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

// Calculate cost with advanced pricing tiers
export const calculateAdvancedCost = (model, usage, provider) => {
  const inputTokens = usage.prompt_tokens || usage.input_tokens || 0;
  const outputTokens = usage.completion_tokens || usage.output_tokens || 0;
  const cachedTokens = usage.prompt_tokens_details?.cached_tokens || usage.cached_tokens || 0;
  const uncachedInputTokens = inputTokens - cachedTokens;
  
  let inputCost = 0;
  let cachedCost = 0;
  let outputCost = 0;
  
  switch (provider) {
    case 'claude': {
      const pricing = CLAUDE_PRICING[model];
      if (!pricing) break;
      
      // Use base input price for uncached tokens
      inputCost = (uncachedInputTokens / 1000000) * pricing.base_input;
      // Use cache hits price for cached tokens
      cachedCost = (cachedTokens / 1000000) * pricing.cache_hits;
      outputCost = (outputTokens / 1000000) * pricing.output;
      break;
    }
    
    case 'gemini': {
      const pricing = GEMINI_PRICING[model];
      if (!pricing) break;
      
      if (model === 'gemini-2.5-pro') {
        // Determine tier based on total input tokens
        const isOver200k = inputTokens > 200000;
        inputCost = (uncachedInputTokens / 1000000) * 
          (isOver200k ? pricing.input.over_200k : pricing.input.under_200k);
        cachedCost = (cachedTokens / 1000000) * 
          (isOver200k ? pricing.cache.over_200k : pricing.cache.under_200k);
        outputCost = (outputTokens / 1000000) * 
          (isOver200k ? pricing.output.over_200k : pricing.output.under_200k);
      } else {
        // Gemini 2.5 Flash - assume text input
        inputCost = (uncachedInputTokens / 1000000) * pricing.input.text;
        cachedCost = (cachedTokens / 1000000) * pricing.cache.text;
        outputCost = (outputTokens / 1000000) * pricing.output;
      }
      break;
    }
    
    case 'openai': {
      const pricing = OPENAI_PRICING[model];
      if (!pricing) break;
      
      inputCost = (uncachedInputTokens / 1000000) * pricing.input;
      cachedCost = (cachedTokens / 1000000) * pricing.cached;
      outputCost = (outputTokens / 1000000) * pricing.output;
      break;
    }
  }
  
  return {
    inputCost,
    cachedCost,
    outputCost,
    totalCost: inputCost + cachedCost + outputCost,
    inputTokens: uncachedInputTokens,
    cachedTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    // Additional metadata
    metadata: {
      provider,
      model,
      tier: inputTokens > 200000 ? 'over_200k' : 'under_200k'
    }
  };
};

// Export pricing data for display purposes
export const getPricingInfo = (model, provider) => {
  switch (provider) {
    case 'claude':
      return CLAUDE_PRICING[model];
    case 'gemini':
      return GEMINI_PRICING[model];
    case 'openai':
      return OPENAI_PRICING[model];
    default:
      return null;
  }
};