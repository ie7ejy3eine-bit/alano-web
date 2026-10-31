/**
 * Setup helper. Run: npm run setup
 * - creates .env from .env.example with a random JWT_SECRET
 * - checks the public folder and required variables
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 Alano Watch Store - Setup Helper\n');

const envPath = path.join(__dirname, '.env');
const examplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(examplePath)) {
    const secret = crypto.randomBytes(48).toString('hex');
    const content = fs.readFileSync(examplePath, 'utf8')
      .replace('change-this-to-a-long-random-string', secret);
    fs.writeFileSync(envPath, content);
    console.log('✅ Created .env with a random JWT_SECRET');
    console.log('⚠️  Edit .env: set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD.\n');
  } else {
    console.log('❌ .env.example not found. Create .env manually.\n');
  }
} else {
  console.log('✅ .env exists');
}

const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath, { recursive: true });

let ok = true;
['index.html', 'style.css', 'app.js'].forEach(f => {
  const exists = fs.existsSync(path.join(publicPath, f));
  console.log(`${exists ? '✅' : '❌'} public/${f}`);
  if (!exists) ok = false;
});
if (!ok) console.log('\n⚠️  Put index.html, style.css and app.js inside the public/ folder.');

if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  const val = k => (env.match(new RegExp('^' + k + '=(.*)$', 'm')) || [])[1] || '';
  if (/USERNAME:PASSWORD/.test(val('MONGODB_URI'))) console.log('⚠️  MONGODB_URI still has the placeholder value');
  if (/example\.com|change-this/.test(val('ADMIN_EMAIL') + val('ADMIN_PASSWORD'))) console.log('⚠️  Set a real ADMIN_EMAIL and ADMIN_PASSWORD');
}

console.log('\n📋 Next steps:');
console.log('1. npm install');
console.log('2. npm start   (products are seeded automatically on first start)');
console.log('3. Open http://localhost:3000');
console.log('📚 See README.md, MONGODB_SETUP.md, BONTO_DEPLOY.md');
