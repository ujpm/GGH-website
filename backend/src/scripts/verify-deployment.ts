import axios from 'axios';

const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backendggh.vercel.app'
  : 'http://localhost:5000';

console.log(`🔍 Testing backend at: ${BACKEND_URL}\n`);

const ENDPOINTS = [
  '/',                  // Health check
  '/api/auth',          // Auth routes
  '/api/content',       // Content routes
  '/api/funding'        // Funding routes
];

async function verifyEndpoint(endpoint: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}${endpoint}`);
    console.log(`✅ ${endpoint} - Status: ${response.status}`);
    if (endpoint === '/') {
      console.log(`   Response: ${JSON.stringify(response.data)}`);
    }
    return true;
  } catch (error: any) {
    console.error(`❌ ${endpoint} - Error:`, error.response?.status || error.message);
    return false;
  }
}

async function verifyDeployment() {
  console.log('🔍 Verifying backend deployment...\n');
  
  let allPassed = true;
  for (const endpoint of ENDPOINTS) {
    const passed = await verifyEndpoint(endpoint);
    allPassed = allPassed && passed;
  }

  console.log('\n📊 Deployment Status:');
  if (allPassed) {
    console.log('✨ All endpoints are responding correctly!');
  } else {
    console.log('⚠️ Some endpoints failed verification');
  }
}

verifyDeployment().catch(console.error);
