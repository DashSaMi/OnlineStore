// Load from .env.local instead of .env
require('dotenv').config({ path: '.env.local' });  // <-- This is the key change

const testConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {
      response_type: "code",
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    }
  }
};

console.log("Environment Variables Loaded from .env.local:");
console.log("1. NEXTAUTH_URL:", process.env.NEXTAUTH_URL || "❌ Missing");
console.log("2. GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Present" : "❌ Missing");
console.log("3. GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Present (hidden)" : "❌ Missing");