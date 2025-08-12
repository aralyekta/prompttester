// Provider configurations for multi-LLM support

export const PROVIDERS = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { value: 'gpt-4o', label: 'GPT-4o', supportedRoles: ['user', 'assistant', 'developer'] },
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini', supportedRoles: ['user', 'assistant', 'developer'] },
      { value: 'gpt-4o-nano', label: 'GPT-4o Nano', supportedRoles: ['user', 'assistant', 'developer'] },
      { value: 'gpt-5', label: 'GPT-5', supportedRoles: ['user', 'assistant', 'developer'] },
      { value: 'gpt-5-mini', label: 'GPT-5 Mini', supportedRoles: ['user', 'assistant', 'developer'] },
      { value: 'gpt-5-nano', label: 'GPT-5 Nano', supportedRoles: ['user', 'assistant', 'developer'] }
    ],
    supportsTemperature: (model) => !model.startsWith('gpt-5'),
    apiKeyPlaceholder: 'sk-...',
    apiKeyLabel: 'OpenAI API Key',
    roleMapping: { system: 'developer' }, // Map system to developer for backward compatibility
    defaultRole: 'user'
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    models: [
      { value: 'claude-opus-4-1-20250805', label: 'Claude Opus 4.1', supportedRoles: ['user', 'assistant'] },
      { value: 'claude-opus-4-20250514', label: 'Claude Opus 4', supportedRoles: ['user', 'assistant'] },
      { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4', supportedRoles: ['user', 'assistant'] },
      { value: 'claude-3-7-sonnet-20250219', label: 'Claude Sonnet 3.7', supportedRoles: ['user', 'assistant'] }
    ],
    supportsTemperature: () => true,
    apiKeyPlaceholder: 'sk-ant-...',
    apiKeyLabel: 'Claude API Key',
    roleMapping: { 
      system: 'user', // System messages become user messages
      developer: 'user' // Developer messages also become user
    },
    defaultRole: 'user'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    models: [
      { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', supportedRoles: ['user', 'model'] },
      { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', supportedRoles: ['user', 'model'] }
    ],
    supportsTemperature: () => true,
    apiKeyPlaceholder: 'AIza...',
    apiKeyLabel: 'Gemini API Key',
    roleMapping: { 
      assistant: 'model', // Assistant becomes model
      system: 'user', // System becomes user
      developer: 'user' // Developer becomes user
    },
    defaultRole: 'user'
  }
};

// Get provider by model
export const getProviderByModel = (model) => {
  for (const [providerId, provider] of Object.entries(PROVIDERS)) {
    if (provider.models.some(m => m.value === model)) {
      return { ...provider, id: providerId };
    }
  }
  return null;
};

// Get all models grouped by provider
export const getGroupedModels = () => {
  const groups = [];
  for (const [providerId, provider] of Object.entries(PROVIDERS)) {
    groups.push({
      label: provider.name,
      options: provider.models.map(model => ({
        ...model,
        provider: providerId
      }))
    });
  }
  return groups;
};

// Get available roles for a model
export const getAvailableRoles = (model) => {
  const provider = getProviderByModel(model);
  if (!provider) return ['user', 'assistant', 'system'];
  
  const modelConfig = provider.models.find(m => m.value === model);
  return modelConfig?.supportedRoles || ['user'];
};

// Convert role for provider
export const convertRoleForProvider = (role, providerId) => {
  const provider = PROVIDERS[providerId];
  if (!provider || !provider.roleMapping) return role;
  
  return provider.roleMapping[role] || role;
};

// Get display name for converted role
export const getRoleDisplayInfo = (originalRole, model) => {
  const provider = getProviderByModel(model);
  if (!provider || !provider.roleMapping) return { role: originalRole, converted: false };
  
  const convertedRole = provider.roleMapping[originalRole];
  if (convertedRole && convertedRole !== originalRole) {
    return { 
      role: originalRole, 
      converted: true, 
      convertedTo: convertedRole,
      providerName: provider.name
    };
  }
  
  return { role: originalRole, converted: false };
};

// Check if temperature is supported for a model
export const isTemperatureSupported = (model) => {
  const provider = getProviderByModel(model);
  if (!provider) return true;
  
  return provider.supportsTemperature(model);
};

// Validate if all required API keys are present
export const validateApiKeys = (scenarios, apiKeys) => {
  const requiredProviders = new Set();
  
  scenarios.forEach(scenario => {
    const provider = getProviderByModel(scenario.model);
    if (provider) {
      requiredProviders.add(provider.id);
    }
  });
  
  const missingKeys = [];
  for (const providerId of requiredProviders) {
    if (!apiKeys[providerId]?.trim()) {
      missingKeys.push(PROVIDERS[providerId].name);
    }
  }
  
  return missingKeys;
};

// Get required providers for current scenarios
export const getRequiredProviders = (scenarios) => {
  const providers = new Set();
  
  scenarios.forEach(scenario => {
    const provider = getProviderByModel(scenario.model);
    if (provider) {
      providers.add(provider.id);
    }
  });
  
  return Array.from(providers).map(id => PROVIDERS[id]);
};