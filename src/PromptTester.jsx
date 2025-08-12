import React, { useState, useRef, useEffect } from 'react';
import { theme, getThemeStyles } from './theme';
import Header from './components/Header';
import ApiKeysSection from './components/ApiKeysSection';
import ToolbarSection from './components/ToolbarSection';
import ScenarioCard from './components/ScenarioCard';
import FloatingActions from './components/FloatingActions';
import ComparisonModal from './components/ComparisonModal';
import NavigationSidebar from './components/NavigationSidebar';
import Toast from './components/Toast';
import { calculateCost } from './utils/models';
import { getProviderByModel, validateApiKeys, getRequiredProviders } from './utils/providers';
import { runLLM } from './utils/llmClients';

const PromptTester = () => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    claude: '',
    gemini: ''
  });
  const [darkMode, setDarkMode] = useState(false);
  const [comparingScenarios, setComparingScenarios] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [totalSessionCost, setTotalSessionCost] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [toast, setToast] = useState(null);
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      description: 'Scenario 1',
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'user', content: '' }
      ],
      response: null,
      loading: false,
      error: null,
      collapsed: false,
      responseCollapsed: false,
      cost: null
    }
  ]);
  
  const abortControllersRef = useRef({});
  const fileInputRef = useRef(null);
  const scenarioRefs = useRef({});

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.body.style.backgroundColor = '#fafafa';
    }
  }, [darkMode]);

  // Add Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const addScenario = () => {
    const newScenario = {
      id: Date.now(),
      description: `Scenario ${scenarios.length + 1}`,
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'user', content: '' }
      ],
      response: null,
      loading: false,
      error: null,
      collapsed: false,
      responseCollapsed: false,
      cost: null
    };
    setScenarios([...scenarios, newScenario]);
  };

  const updateScenario = (id, field, value) => {
    setScenarios(scenarios.map(scenario => {
      if (scenario.id === id) {
        const updated = { ...scenario, [field]: value };
        
        // If model changed, reset all message roles to 'user'
        if (field === 'model' && value !== scenario.model) {
          updated.messages = scenario.messages.map(msg => ({
            ...msg,
            role: 'user'
          }));
        }
        
        return updated;
      }
      return scenario;
    }));
  };

  const deleteScenario = (id) => {
    if (abortControllersRef.current[id]) {
      abortControllersRef.current[id].abort();
      delete abortControllersRef.current[id];
    }
    setScenarios(scenarios.filter(scenario => scenario.id !== id));
  };

  const duplicateScenario = (id) => {
    const scenarioToDuplicate = scenarios.find(s => s.id === id);
    if (!scenarioToDuplicate) return;

    const duplicatedScenario = {
      ...scenarioToDuplicate,
      id: Date.now(),
      description: `${scenarioToDuplicate.description} (Copy)`,
      response: null,
      loading: false,
      error: null,
      collapsed: false,
      responseCollapsed: false,
      cost: null,
      messages: scenarioToDuplicate.messages.map(msg => ({ ...msg }))
    };

    // Find the index of the scenario to duplicate
    const index = scenarios.findIndex(s => s.id === id);
    // Insert the duplicated scenario right after the original
    const newScenarios = [...scenarios];
    newScenarios.splice(index + 1, 0, duplicatedScenario);
    setScenarios(newScenarios);
  };

  const toggleScenarioCollapse = (id) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === id ? { ...scenario, collapsed: !scenario.collapsed } : scenario
    ));
  };

  const toggleResponseCollapse = (id) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === id ? { ...scenario, responseCollapsed: !scenario.responseCollapsed } : scenario
    ));
  };

  const addMessage = (scenarioId) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === scenarioId 
        ? { ...scenario, messages: [...scenario.messages, { role: 'user', content: '' }] }
        : scenario
    ));
  };

  const updateMessage = (scenarioId, messageIndex, content) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === scenarioId 
        ? {
            ...scenario,
            messages: scenario.messages.map((msg, idx) => 
              idx === messageIndex ? { ...msg, content } : msg
            )
          }
        : scenario
    ));
  };

  const updateMessageRole = (scenarioId, messageIndex, role) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === scenarioId 
        ? {
            ...scenario,
            messages: scenario.messages.map((msg, idx) => 
              idx === messageIndex ? { ...msg, role } : msg
            )
          }
        : scenario
    ));
  };

  const deleteMessage = (scenarioId, messageIndex) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === scenarioId 
        ? {
            ...scenario,
            messages: scenario.messages.filter((_, idx) => idx !== messageIndex)
          }
        : scenario
    ));
  };

  const cancelAllRequests = () => {
    Object.values(abortControllersRef.current).forEach(controller => {
      controller.abort();
    });
    abortControllersRef.current = {};
    
    setScenarios(scenarios.map(scenario => ({
      ...scenario,
      loading: false,
      error: scenario.loading ? 'Cancelled' : scenario.error
    })));
  };

  const runScenario = async (scenario, abortSignal) => {
    // Get the provider for the model
    const provider = getProviderByModel(scenario.model);
    const providerId = provider?.id || 'openai';
    const apiKey = apiKeys[providerId];
    
    // Use the SDK client to run the request
    try {
      // Create a promise that rejects on abort
      const abortPromise = new Promise((_, reject) => {
        abortSignal.addEventListener('abort', () => {
          reject(new Error('Request cancelled'));
        });
      });
      
      // Race between the LLM request and the abort signal
      const result = await Promise.race([
        runLLM(scenario, apiKey, providerId),
        abortPromise
      ]);
      
      return result;
    } catch (error) {
      if (error.message === 'Request cancelled') {
        throw { name: 'AbortError' };
      }
      throw error;
    }
  };

  const runSingleScenario = async (scenarioId) => {
    // Validate required API keys
    const scenario = scenarios.find(s => s.id === scenarioId);
    const missingKeys = validateApiKeys([scenario], apiKeys);
    if (missingKeys.length > 0) {
      setToast({
        message: `Please enter API key${missingKeys.length > 1 ? 's' : ''} for: ${missingKeys.join(', ')}`,
        type: 'error'
      });
      return;
    }

    if (abortControllersRef.current[scenarioId]) {
      abortControllersRef.current[scenarioId].abort();
    }

    if (!scenario) return;

    const abortController = new AbortController();
    abortControllersRef.current[scenarioId] = abortController;

    const startTime = Date.now();

    setScenarios(prev => prev.map(s => 
      s.id === scenarioId 
        ? { ...s, loading: true, response: null, error: null, responseTime: null, cost: null }
        : s
    ));

    try {
      const result = await runScenario(scenario, abortController.signal);
      const responseTime = Date.now() - startTime;
      
      // Calculate cost
      let cost = null;
      if (result.usage) {
        cost = calculateCost(scenario.model, result.usage);
        setTotalSessionCost(prev => prev + cost.totalCost);
      }
      
      setScenarios(prev => prev.map(s => 
        s.id === scenarioId 
          ? { ...s, loading: false, response: result, error: null, responseTime, cost }
          : s
      ));
    } catch (error) {
      if (error.name !== 'AbortError') {
        setScenarios(prev => prev.map(s => 
          s.id === scenarioId 
            ? { ...s, loading: false, response: null, error: error.message, responseTime: null, cost: null }
            : s
        ));
      }
    } finally {
      delete abortControllersRef.current[scenarioId];
    }
  };

  const runAllScenarios = async () => {
    // Validate all required API keys
    const missingKeys = validateApiKeys(scenarios, apiKeys);
    if (missingKeys.length > 0) {
      setToast({
        message: `Please enter API key${missingKeys.length > 1 ? 's' : ''} for: ${missingKeys.join(', ')}`,
        type: 'error'
      });
      return;
    }

    cancelAllRequests();

    setScenarios(scenarios.map(scenario => ({
      ...scenario,
      loading: true,
      response: null,
      error: null,
      cost: null
    })));

    const promises = scenarios.map(async (scenario) => {
      const abortController = new AbortController();
      abortControllersRef.current[scenario.id] = abortController;
      const startTime = Date.now();

      try {
        const result = await runScenario(scenario, abortController.signal);
        const responseTime = Date.now() - startTime;
        
        // Calculate cost
        let cost = null;
        if (result.usage) {
          cost = calculateCost(scenario.model, result.usage);
        }
        
        if (!abortControllersRef.current[scenario.id]) {
          return { id: scenario.id, response: null, error: 'Cancelled', skip: true };
        }
        return { id: scenario.id, response: result, error: null, responseTime, cost };
      } catch (error) {
        if (error.name === 'AbortError') {
          return { id: scenario.id, response: null, error: 'Cancelled', skip: true };
        }
        return { id: scenario.id, response: null, error: error.message, responseTime: null, cost: null };
      } finally {
        if (abortControllersRef.current[scenario.id]) {
          delete abortControllersRef.current[scenario.id];
        }
      }
    });

    promises.forEach(promise => {
      promise.then(result => {
        if (result.skip) return;
        
        setScenarios(prev => prev.map(scenario => 
          scenario.id === result.id 
            ? { ...scenario, loading: false, response: result.response, error: result.error, responseTime: result.responseTime, cost: result.cost }
            : scenario
        ));
        
        // Update total session cost
        if (result.cost) {
          setTotalSessionCost(prev => prev + result.cost.totalCost);
        }
      });
    });
  };

  const exportScenarios = () => {
    const exportData = {
      scenarios: scenarios.map(({ id, description, model, temperature, messages }) => ({
        id,
        description,
        model,
        temperature,
        messages
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-scenarios-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importScenarios = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.scenarios && Array.isArray(data.scenarios)) {
          setScenarios(data.scenarios.map(scenario => ({
            ...scenario,
            id: scenario.id || Date.now() + Math.random(),
            response: null,
            loading: false,
            error: null,
            collapsed: false,
            responseCollapsed: false
          })));
        }
      } catch (error) {
        setToast({
          message: 'Failed to import scenarios. Please check the file format.',
          type: 'error'
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleCancelScenario = (scenarioId) => {
    if (abortControllersRef.current[scenarioId]) {
      abortControllersRef.current[scenarioId].abort();
      delete abortControllersRef.current[scenarioId];
      setScenarios(prev => prev.map(s => 
        s.id === scenarioId 
          ? { ...s, loading: false, response: null, error: 'Cancelled', cost: null }
          : s
      ));
    }
  };

  const handleToggleCompare = (scenarioId) => {
    setComparingScenarios(prev => {
      const isAlreadyComparing = prev.includes(scenarioId);
      let newComparing;
      
      if (isAlreadyComparing) {
        // Remove from comparison
        newComparing = prev.filter(id => id !== scenarioId);
      } else {
        // Add to comparison (max 2)
        newComparing = [...prev, scenarioId].slice(-2);
      }
      
      // Auto-show modal when 2 scenarios are selected
      if (newComparing.length === 2) {
        setShowComparisonModal(true);
      }
      
      return newComparing;
    });
  };

  const themeStyles = getThemeStyles(darkMode);
  const hasRunningScenarios = scenarios.some(s => s.loading);

  const handleNavigateToScenario = (scenarioId, scrollToResponse = false) => {
    const element = scenarioRefs.current[scenarioId];
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      // If scrolling to response, expand the scenario and response if collapsed
      if (scrollToResponse) {
        setScenarios(prev => prev.map(s => 
          s.id === scenarioId 
            ? { ...s, collapsed: false, responseCollapsed: false }
            : s
        ));
      }
    }
  };

  const containerStyles = {
    minHeight: '100vh',
    background: themeStyles.background.primary,
    padding: `${theme.spacing['4xl']} ${theme.spacing['5xl']}`,
    paddingLeft: sidebarCollapsed ? `calc(50px + ${theme.spacing['5xl']})` : `calc(${sidebarWidth}px + ${theme.spacing['5xl']})`,
    fontFamily: theme.typography.fontFamily.sans,
    transition: 'padding 0.3s ease'
  };

  const scenariosContainerStyles = {
    maxWidth: '1200px',
    margin: '0 auto 100px'
  };

  return (
    <>
      <NavigationSidebar
        scenarios={scenarios}
        onNavigate={handleNavigateToScenario}
        darkMode={darkMode}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        totalCost={totalSessionCost}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
        onRunScenario={runSingleScenario}
        onCancelScenario={handleCancelScenario}
        onRunAll={runAllScenarios}
        onCancelAll={cancelAllRequests}
        hasRunningScenarios={hasRunningScenarios}
      />
      <div style={containerStyles}>
      <Header 
        darkMode={darkMode} 
        onToggleTheme={() => setDarkMode(!darkMode)} 
      />
      
      <ApiKeysSection 
        apiKeys={apiKeys}
        onApiKeyChange={(providerId, value) => setApiKeys(prev => ({...prev, [providerId]: value}))}
        requiredProviders={getRequiredProviders(scenarios)}
        darkMode={darkMode}
      />

      <ToolbarSection
        onExport={exportScenarios}
        onImportClick={() => fileInputRef.current.click()}
        scenarioCount={scenarios.length}
        darkMode={darkMode}
        fileInputRef={fileInputRef}
      />
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importScenarios}
        style={{ display: 'none' }}
      />

      <div style={scenariosContainerStyles}>
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            ref={el => scenarioRefs.current[scenario.id] = el}
          >
            <ScenarioCard
              scenario={scenario}
            onUpdate={updateScenario}
            onDelete={deleteScenario}
            onDuplicate={duplicateScenario}
            onRun={runSingleScenario}
            onToggleCollapse={toggleScenarioCollapse}
            onToggleResponseCollapse={toggleResponseCollapse}
            onAddMessage={addMessage}
            onUpdateMessage={updateMessage}
            onDeleteMessage={deleteMessage}
            onUpdateMessageRole={updateMessageRole}
            onCancel={handleCancelScenario}
            darkMode={darkMode}
            canDelete={scenarios.length > 1}
            isComparing={comparingScenarios.includes(scenario.id)}
            onToggleCompare={handleToggleCompare}
              cost={scenario.cost}
            />
          </div>
        ))}
      </div>

      <FloatingActions
        onAddScenario={addScenario}
        onRunAll={runAllScenarios}
        onCancelAll={cancelAllRequests}
        hasRunningScenarios={hasRunningScenarios}
        darkMode={darkMode}
      />

      {showComparisonModal && (
        <ComparisonModal
          scenarios={comparingScenarios.map(id => scenarios.find(s => s.id === id)).filter(Boolean)}
          onClose={() => {
            setShowComparisonModal(false);
            setComparingScenarios([]);
          }}
          darkMode={darkMode}
        />
      )}
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          darkMode={darkMode}
        />
      )}
      </div>
    </>
  );
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  html {
    scroll-behavior: smooth;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.95; }
  }
  @keyframes progress {
    0% { width: 0%; }
    50% { width: 100%; }
    100% { width: 0%; }
  }
`;
document.head.appendChild(style);

export default PromptTester;