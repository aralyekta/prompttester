// LLM Client handlers using official SDKs
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { convertRoleForProvider } from './providers';

// Initialize clients (will be created with API keys when needed)
let openaiClient = null;
let anthropicClient = null;
let geminiClient = null;

// OpenAI handler
export const runOpenAI = async (scenario, apiKey) => {
  if (!openaiClient || openaiClient.apiKey !== apiKey) {
    openaiClient = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for browser usage
    });
  }

  // Convert messages - OpenAI now uses 'developer' role instead of 'system'
  const messages = scenario.messages
    .filter(msg => msg.content.trim() !== '')
    .map(msg => ({
      ...msg,
      role: msg.role === 'system' ? 'developer' : msg.role
    }));

  const requestBody = {
    model: scenario.model,
    messages: messages
  };

  // Don't include temperature for GPT-5 models
  if (!scenario.model.startsWith('gpt-5')) {
    requestBody.temperature = parseFloat(scenario.temperature);
  }

  try {
    const response = await openaiClient.chat.completions.create(requestBody);
    
    return {
      content: response.choices[0]?.message?.content || '',
      usage: response.usage,
      model: response.model,
      raw: response
    };
  } catch (error) {
    throw new Error(error.message || 'OpenAI API request failed');
  }
};

// Anthropic/Claude handler
export const runClaude = async (scenario, apiKey) => {
  if (!anthropicClient || anthropicClient.apiKey !== apiKey) {
    anthropicClient = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for browser usage
    });
  }

  // Convert messages for Claude
  const messages = scenario.messages
    .filter(msg => msg.content.trim() !== '')
    .map(msg => ({
      role: convertRoleForProvider(msg.role, 'claude'),
      content: msg.content
    }));

  // Extract system message if needed
  let systemMessage = '';
  const firstMessage = scenario.messages[0];
  if (firstMessage && (firstMessage.role === 'system' || firstMessage.role === 'developer')) {
    systemMessage = firstMessage.content;
    messages.shift(); // Remove the system message from messages array
  }

  const requestBody = {
    model: scenario.model,
    messages: messages,
    max_tokens: 4096,
    temperature: parseFloat(scenario.temperature)
  };

  // Add system message if exists
  if (systemMessage) {
    requestBody.system = systemMessage;
  }

  try {
    const response = await anthropicClient.messages.create(requestBody);
    
    // Convert Claude response to our format
    const content = response.content
      ?.map(block => block.text || '')
      .join('') || '';
    
    return {
      content: content,
      usage: {
        prompt_tokens: response.usage?.input_tokens || 0,
        completion_tokens: response.usage?.output_tokens || 0,
        total_tokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0)
      },
      model: response.model,
      raw: response
    };
  } catch (error) {
    throw new Error(error.message || 'Claude API request failed');
  }
};

// Google Gemini handler
export const runGemini = async (scenario, apiKey) => {
  if (!geminiClient || geminiClient.apiKey !== apiKey) {
    geminiClient = new GoogleGenerativeAI(apiKey);
  }

  // Get the model
  const model = geminiClient.getGenerativeModel({ 
    model: scenario.model,
    generationConfig: {
      temperature: parseFloat(scenario.temperature),
      maxOutputTokens: 4096,
    }
  });

  // Convert messages for Gemini
  const history = [];
  const messages = scenario.messages.filter(msg => msg.content.trim() !== '');
  
  // Build history from all messages except the last one
  for (let i = 0; i < messages.length - 1; i++) {
    const msg = messages[i];
    const role = convertRoleForProvider(msg.role, 'gemini');
    history.push({
      role: role,
      parts: [{ text: msg.content }]
    });
  }

  // The last message is the prompt
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) {
    throw new Error('At least one message is required');
  }

  try {
    // Start a chat with history
    const chat = model.startChat({ history });
    
    // Send the last message
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const content = response.text();
    
    // Get usage metadata if available
    const usage = {
      prompt_tokens: result.response.usageMetadata?.promptTokenCount || 0,
      completion_tokens: result.response.usageMetadata?.candidatesTokenCount || 0,
      total_tokens: result.response.usageMetadata?.totalTokenCount || 0
    };
    
    return {
      content: content,
      usage: usage,
      model: scenario.model,
      raw: result
    };
  } catch (error) {
    throw new Error(error.message || 'Gemini API request failed');
  }
};

// Main run function that routes to the appropriate handler
export const runLLM = async (scenario, apiKey, provider) => {
  switch (provider) {
    case 'openai':
      return runOpenAI(scenario, apiKey);
    case 'claude':
      return runClaude(scenario, apiKey);
    case 'gemini':
      return runGemini(scenario, apiKey);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};