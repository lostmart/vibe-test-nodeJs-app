class UITestingAgent {
  constructor() {
    this.testResults = [];
    this.coverage = {};
  }

  async runAllTests() {
    console.log('🧪 Running UI/ API Tests...\n');
    
    try {
      const { execSync } = require('child_process');
      const output = execSync('npm test', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('✅ All tests completed successfully!');
      console.log(output);
      
      return {
        success: true,
        output: output,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.log('❌ Tests failed');
      console.log(error.stdout || error.message);
      
      return {
        success: false,
        output: error.stdout || error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async runSpecificTest(testFile) {
    console.log(`🧪 Running specific test: ${testFile}\n`);
    
    try {
      const { execSync } = require('child_process');
      const output = execSync(`npm test -- ${testFile}`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log(`✅ ${testFile} completed successfully!`);
      console.log(output);
      
      return {
        success: true,
        testFile: testFile,
        output: output,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.log(`❌ ${testFile} failed`);
      console.log(error.stdout || error.message);
      
      return {
        success: false,
        testFile: testFile,
        output: error.stdout || error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async runTestsWithCoverage() {
    console.log('📊 Running tests with coverage...\n');
    
    try {
      const { execSync } = require('child_process');
      const output = execSync('npm test -- --coverage', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('✅ Tests with coverage completed!');
      console.log(output);
      
      return {
        success: true,
        coverage: true,
        output: output,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.log('❌ Tests with coverage failed');
      console.log(error.stdout || error.message);
      
      return {
        success: false,
        coverage: true,
        output: error.stdout || error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  generateTestReport(results) {
    const report = {
      summary: {
        totalTests: results.length,
        passed: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        generatedAt: new Date().toISOString()
      },
      details: results
    };

    return report;
  }

  async testEndpoint(method, endpoint, data = null) {
    console.log(`🔍 Testing ${method} ${endpoint}...`);
    
    try {
      let response;
      
      switch (method.toUpperCase()) {
        case 'GET':
          response = await global.request.get(endpoint);
          break;
        case 'POST':
          response = await global.request.post(endpoint).send(data);
          break;
        case 'PUT':
          response = await global.request.put(endpoint).send(data);
          break;
        case 'DELETE':
          response = await global.request.delete(endpoint);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      console.log(`✅ ${method} ${endpoint} - Status: ${response.status}`);
      
      return {
        method,
        endpoint,
        status: response.status,
        body: response.body,
        success: response.status >= 200 && response.status < 300
      };
    } catch (error) {
      console.log(`❌ ${method} ${endpoint} - Error: ${error.message}`);
      
      return {
        method,
        endpoint,
        error: error.message,
        success: false
      };
    }
  }
}

module.exports = UITestingAgent;