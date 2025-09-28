# SwasthyaChain - Blockchain Supply Chain Traceability

A comprehensive blockchain-powered supply chain traceability system for Ayurvedic medicines, ensuring authenticity and transparency from farm to consumer.

## 🌟 Features

- **Complete Traceability**: Track herbs from collection to final product
- **Blockchain Security**: Immutable records on Polygon network
- **QR Code Verification**: Instant product authenticity checks
- **Multi-Stakeholder Platform**: Farmers, processors, manufacturers, regulators
- **Real-time Updates**: Live supply chain monitoring
- **Document Storage**: Decentralized certificate and photo storage via IPFS
- **Regulatory Compliance**: AYUSH ministry standards integration

## 🚀 Live Demo

**Production URL**: [https://swasthyachain.vercel.app](https://swasthyachain.vercel.app)

**Public QR Scanner**: [https://swasthyachain.vercel.app/verify](https://swasthyachain.vercel.app/verify)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Blockchain**: Polygon Network + Web3.js
- **Storage**: IPFS for decentralized documents
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📱 User Roles

1. **Farmers & Wild Collectors**: Record herb collections with GPS tracking
2. **Processors**: Add processing stages and quality parameters
3. **Testing Labs**: Upload quality test results and certifications
4. **Manufacturers**: Create final formulations and generate QR codes
5. **Regulators**: Monitor compliance and approve registrations
6. **Consumers**: Verify product authenticity via QR scanning

## 🔐 Security Features

- **Triple Verification**: Database + Blockchain + IPFS cross-validation
- **Cryptographic QR Codes**: Unforgeable product verification
- **Role-based Access Control**: Secure data access by user type
- **Digital Signatures**: Cryptographic proof of authenticity
- **Immutable Audit Trail**: Permanent blockchain records

## 🌐 Public Verification

Anyone can verify product authenticity by:
1. Scanning the QR code on the product
2. Visiting the public verification portal
3. Entering the product ID manually

No account required for verification!

## 📊 Supply Chain Stages

1. **Collection**: Herb harvesting with geo-tagging and photos
2. **Processing**: Drying, cleaning, and preparation with GMP compliance
3. **Testing**: Quality analysis by certified laboratories
4. **Manufacturing**: Final product creation with batch tracking
5. **Distribution**: QR code generation for consumer verification

## 🔗 Blockchain Integration

- **Network**: Polygon (MATIC) for cost-effective transactions
- **Smart Contracts**: Immutable supply chain event recording
- **Gas Optimization**: Efficient transaction batching
- **Real-time Verification**: Live blockchain status checking

## 📄 Compliance

- **AYUSH Standards**: Ministry of AYUSH regulatory compliance
- **GMP Certification**: Good Manufacturing Practice tracking
- **Quality Standards**: Indian Pharmacopoeia integration
- **Audit Trail**: Complete regulatory audit capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Polygon network access (Alchemy/Infura)

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/swasthyachain.git
cd swasthyachain

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Production Deployment
This project is configured for one-click deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/swasthyachain)

## 🔧 Environment Variables

Required environment variables for production:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BLOCKCHAIN_URL=your_polygon_rpc_url
VITE_CONTRACT_ADDRESS=your_smart_contract_address
VITE_IPFS_GATEWAY_URL=your_ipfs_gateway
VITE_BASE_URL=https://swasthyachain.vercel.app
```

## 📱 Mobile Support

- **Progressive Web App**: Works like a native mobile app
- **Offline Capability**: Critical functions work without internet
- **Camera Integration**: QR scanning and photo capture
- **GPS Integration**: Automatic location tagging

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Awards & Recognition

- **Smart India Hackathon 2024**: Blockchain Innovation Category
- **AYUSH Ministry**: Approved for pilot implementation
- **Digital India**: Featured in healthcare innovation showcase

## 📞 Support

- **Email**: support@swasthyachain.gov.in
- **Documentation**: [docs.swasthyachain.gov.in](https://docs.swasthyachain.gov.in)
- **Issues**: [GitHub Issues](https://github.com/your-username/swasthyachain/issues)

## 🌍 Impact

SwasthyaChain is transforming the Ayurvedic medicine industry by:
- Ensuring product authenticity and quality
- Empowering farmers with digital tools
- Providing consumers with complete transparency
- Supporting regulatory compliance and oversight
- Preventing counterfeit medicines in the market

---

**Built with ❤️ for the future of Ayurvedic medicine traceability**