# SwasthyaChain Production Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Production ready deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: Click "New Project" → Import from GitHub
3. **Select Repository**: Choose your SwasthyaChain repository
4. **Configure Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Set Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key

# Blockchain Configuration  
VITE_BLOCKCHAIN_URL=https://polygon-mainnet.g.alchemy.com/v2/your_api_key
VITE_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D0C9e3e0C8b0e9e0

# IPFS Configuration
VITE_IPFS_GATEWAY_URL=https://gateway.pinata.cloud/ipfs/
VITE_IPFS_API_URL=https://api.pinata.cloud/pinning/

# Application Configuration
VITE_APP_NAME=SwasthyaChain
VITE_BASE_URL=https://your-project.vercel.app
VITE_ENVIRONMENT=production

# Security Keys (Generate new ones for production)
VITE_QR_SECRET_KEY=your_secure_random_key_here
VITE_CRYPTO_SECRET_KEY=your_secure_crypto_key_here
```

### Step 4: Deploy

1. Click **Deploy** in Vercel
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## 🔧 Production Setup Checklist

### Supabase Production Setup

1. **Create Production Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project for production
   - Note down the URL and anon key

2. **Run Database Migrations**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login to Supabase
   supabase login

   # Link to your production project
   supabase link --project-ref your-project-ref

   # Push migrations to production
   supabase db push
   ```

3. **Configure RLS Policies**:
   - Ensure Row Level Security is enabled
   - Test all authentication flows
   - Verify user permissions

### Blockchain Production Setup

1. **Polygon Mainnet Setup**:
   - Get Alchemy or Infura API key for Polygon Mainnet
   - Deploy smart contracts to mainnet (if using real blockchain)
   - Update contract addresses in environment variables

2. **IPFS Production Setup**:
   - Set up Pinata account for production IPFS
   - Configure API keys and gateways
   - Test file upload and retrieval

### Domain Configuration

1. **Custom Domain** (Optional):
   - In Vercel Dashboard → Project → Settings → Domains
   - Add your custom domain (e.g., swasthyachain.gov.in)
   - Configure DNS records as instructed

2. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - Verify HTTPS is working correctly

## 🔒 Security Checklist

### Environment Variables
- [ ] All sensitive keys are in environment variables
- [ ] No hardcoded secrets in code
- [ ] Production keys are different from development
- [ ] QR secret keys are cryptographically secure

### Application Security
- [ ] Content Security Policy headers configured
- [ ] HTTPS enforced for all connections
- [ ] Input validation on all forms
- [ ] SQL injection protection via Supabase RLS
- [ ] XSS protection enabled

### Blockchain Security
- [ ] Smart contracts audited (if using real blockchain)
- [ ] Private keys securely managed
- [ ] Transaction signing properly implemented
- [ ] Gas limit protections in place

## 📊 Monitoring & Analytics

### Performance Monitoring
1. **Vercel Analytics**:
   - Enable in Vercel Dashboard → Project → Analytics
   - Monitor page load times and user interactions

2. **Error Tracking** (Optional):
   - Set up Sentry for error monitoring
   - Add Sentry DSN to environment variables

### Application Monitoring
1. **Supabase Monitoring**:
   - Monitor database performance
   - Check API usage and limits
   - Set up alerts for high usage

2. **Blockchain Monitoring**:
   - Monitor transaction success rates
   - Track gas usage and costs
   - Set up alerts for failed transactions

## 🚀 Performance Optimization

### Build Optimization
- [x] Code splitting configured in Vite
- [x] Chunk size optimization
- [x] Tree shaking enabled
- [x] Minification enabled

### Runtime Optimization
- [x] Lazy loading for components
- [x] Image optimization
- [x] Caching strategies implemented
- [x] Bundle size monitoring

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Setup
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🧪 Testing in Production

### Functional Testing
1. **User Registration & Login**:
   - Test all user roles
   - Verify email confirmations
   - Check permission systems

2. **Supply Chain Flow**:
   - Test herb collection recording
   - Verify processing stage updates
   - Check formulation creation
   - Test QR code generation

3. **Public Verification**:
   - Test QR code scanning
   - Verify blockchain lookups
   - Check IPFS document access
   - Test public verification portal

### Performance Testing
1. **Load Testing**:
   - Test with multiple concurrent users
   - Verify database performance
   - Check API response times

2. **Mobile Testing**:
   - Test on various mobile devices
   - Verify camera functionality
   - Check GPS integration
   - Test offline capabilities

## 📱 Mobile App Considerations

### Progressive Web App (PWA)
- [x] Service worker configured
- [x] Offline functionality
- [x] App manifest included
- [x] Mobile-optimized interface

### Mobile Features
- [x] Camera integration for QR scanning
- [x] GPS location capture
- [x] Photo upload optimization
- [x] Touch-friendly interface

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check TypeScript errors

2. **Environment Variable Issues**:
   - Ensure all required variables are set
   - Check variable names (VITE_ prefix required)
   - Verify values are correct

3. **Supabase Connection Issues**:
   - Verify URL and keys are correct
   - Check RLS policies
   - Ensure database is accessible

4. **Blockchain Connection Issues**:
   - Verify RPC URL is working
   - Check contract addresses
   - Ensure network is correct (mainnet vs testnet)

### Support Resources
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)

## 🎉 Go Live Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Smart contracts deployed (if applicable)
- [ ] Domain configured and SSL working
- [ ] All user flows tested
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Backup and recovery plan in place
- [ ] Team access configured
- [ ] Documentation updated

**Congratulations! SwasthyaChain is now live in production! 🚀**