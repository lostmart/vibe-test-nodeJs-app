const UITestingAgent = require('./UITestingAgent');

async function demonstrateAgent() {
  const agent = new UITestingAgent();
  
  console.log('🚀 UI Testing Agent Demonstration\n');
  
  console.log('1. Running all tests...');
  await agent.runAllTests();
  
  console.log('\n2. Testing specific endpoints...');
  await agent.testEndpoint('GET', '/api/users');
  await agent.testEndpoint('GET', '/api/products');
  await agent.testEndpoint('GET', '/api/books');
  
  console.log('\n3. Running tests with coverage...');
  await agent.runTestsWithCoverage();
  
  console.log('\n✨ UI Testing Agent demonstration complete!');
}

if (require.main === module) {
  demonstrateAgent();
}

module.exports = demonstrateAgent;