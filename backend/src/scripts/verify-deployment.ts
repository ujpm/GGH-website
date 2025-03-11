import axios from 'axios';

const BACKEND_URL = 'https://backendggh.vercel.app';
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
    return true;
  } catch (error: any) {
    console.error(`❌ ${endpoint} - Error:`, error.message);
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
