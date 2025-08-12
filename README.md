# PromptTester

![PromptTester](./img/example.png)

A modern React application for testing OpenAI API prompts with multiple scenarios, real-time cost tracking, and advanced comparison features.

## Features

### Core Functionality
- **Multiple Scenarios**: Create and manage unlimited test scenarios
- **Multi-Message Conversations**: Support for complex conversation flows with role selection (User, Assistant, Developer)
- **Model Selection**: Support for all OpenAI models including GPT-4o, GPT-4o-mini, and GPT-5 variants
- **Temperature Control**: Fine-tune response creativity (automatically hidden for GPT-5 models)
- **Batch Execution**: Run all scenarios simultaneously or individually
- **Request Cancellation**: Stop running requests at any time

### Navigation & UI
- **Google Docs-style Sidebar**: Resizable navigation panel with scenario overview
- **Dark/Light Theme**: Professional theme switcher with modern design
- **Collapsible Sections**: Organize complex scenarios with collapsible UI elements
- **Status Indicators**: Visual feedback for loading, success, and error states
- **Floating Action Buttons**: Quick access to add scenarios and run/cancel all

### Cost Tracking & Analytics
- **Real-time Cost Calculation**: Track costs per request and total session cost
- **Token Usage Display**: Monitor input, output, and cached token consumption
- **Response Time Metrics**: Measure API response times for performance analysis
- **Pricing Support**: Accurate pricing for all models including cached token rates

### Advanced Features
- **Scenario Comparison**: Side-by-side comparison of responses from different scenarios
- **Export/Import**: Save and load scenario configurations as JSON
- **Scenario Duplication**: Quickly duplicate existing scenarios for variations
- **Smooth Navigation**: Click-to-navigate between scenarios with smooth scrolling

## Usage
```bash
npm install
npm start
```

## Setup
1. Enter your OpenAI API key
2. Create or import scenarios
3. Configure model, temperature, and messages for each scenario
4. Run individual scenarios or execute all at once
5. Compare responses and track costs

## Configuration

### Message Roles
- **User**: Standard user input
- **Assistant**: AI assistant responses
- **Developer**: System-level instructions

### Supported Models
- GPT-4o and GPT-4o-mini
- GPT-5-preview and GPT-5-turbo (temperature parameter automatically excluded)
- Custom model pricing with cached token support

## Export Format
Scenarios export as JSON including:
- Model and temperature settings
- Complete message history with roles
- Scenario descriptions
- All configuration parameters

## Keyboard Shortcuts
- Click scenario in sidebar to navigate
- Hover effects on all interactive elements
- Responsive design for various screen sizes