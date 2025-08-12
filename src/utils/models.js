// Model configurations with multi-provider support
import { getProviderByModel } from './providers';
import { calculateAdvancedCost } from './pricing';

export const isGpt5Model = (model) => {
  return model && model.startsWith('gpt-5');
};

export const calculateCost = (model, usage) => {
  // Get provider for the model
  const provider = getProviderByModel(model);
  const providerId = provider?.id || 'openai';
  
  // Use the advanced pricing calculator
  return calculateAdvancedCost(model, usage, providerId);
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