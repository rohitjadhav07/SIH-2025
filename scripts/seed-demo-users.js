import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to your .env

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const demoUsers = [
  {
    email: 'admin@swasthyachain.gov.in',
    password: 'admin123',
    name: 'System Administrator',
    role: 'admin',
    organization: 'SwasthyaChain Government',
    phone: '+91-9876543210',
    address: 'Ministry of AYUSH, New Delhi, India',
    licenseNumber: 'ADMIN-2024-001',
    certifications: ['System Administration', 'AYUSH Compliance'],
    isVerified: true,
    isActive: true
  },
  {
    email: 'regulator@ayush.gov.in',
    password: 'regulator123',
    name: 'Dr. Rajesh Kumar',
    role: 'regulator',
    organization: 'Ministry of AYUSH',
    phone: '+91-9876543211',
    address: 'AYUSH Bhawan, New Delhi, India',
    licenseNumber: 'REG-AYUSH-2024-001',
    certifications: ['AYUSH Regulatory Affairs', 'Quality Compliance'],
    isVerified: true,
    isActive: true
  },
  {
    email: 'ramesh.patel@gmail.com',
    password: 'farmer123',
    name: 'Ramesh Patel',
    role: 'farmer',
    organization: 'Patel Organic Farms',
    phone: '+91-9876543212',
    address: 'Village Kheda, Gujarat, India',
    licenseNumber: 'FARM-GUJ-2024-001',
    certifications: ['Organic Farming', 'Ayurvedic Herb Cultivation'],
    isVerified: true,
    isActive: true
  },
  {
    email: 'priya.nair@forestcoop.org',
    password: 'collector123',
    name: 'Priya Nair',
    role: 'wild_collector',
    organization: 'Kerala Forest Cooperative',
    phone: '+91-9876543213',
    address: 'Wayanad District, Kerala, India',
    licenseNumber: 'WC-KER-2024-001',
    certifications: ['Sustainable Wild Collection', 'Forest Conservation'],
    isVerified: true,
    isActive: true
  },
  {
    email: 'lab@qualitylabs.com',
    password: 'lab123',
    name: 'Dr. Suresh Sharma',
    role: 'testing_lab',
    organization: 'Quality Labs India Pvt Ltd',
    phone: '+91-9876543214',
    address: 'Industrial Area, Ahmedabad, Gujarat, India',
    licenseNumber: 'LAB-NABL-2024-001',
    certifications: ['NABL Accreditation', 'Ayurvedic Testing Standards'],
    isVerified: true,
    isActive: true
  },
  {
    email: 'manufacturing@himalaya.com',
    password: 'mfg123',
    name: 'Arun Krishnan',
    role: 'manufacturer',
    organization: 'Himalaya Drug Company',
    phone: '+91-9876543215',
    address: 'Makali, Bangalore, Karnataka, India',
    licenseNumber: 'MFG-AYUSH-KAR-2024-001',
    certifications: ['GMP Certification', 'AYUSH Manufacturing License'],
    isVerified: true,
    isActive: true
  }
];

async function seedDemoUsers() {
  console.log('🌱 Starting demo user seeding...');
  
  for (const userData of demoUsers) {
    try {
      console.log(`\n📝 Creating user: ${userData.email}`);
      
      // 1. Create auth user
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true // Auto-confirm email
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          console.log(`⚠️  User ${userData.email} already exists, skipping...`);
          continue;
        }
        throw authError;
      }

      console.log(`✅ Auth user created: ${authUser.user.id}`);

      // 2. Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          auth_user_id: authUser.user.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          organization: userData.organization,
          phone: userData.phone,
          address: userData.address,
          license_number: userData.licenseNumber,
          certifications: userData.certifications,
          is_verified: userData.isVerified,
          is_active: userData.isActive
        })
        .select()
        .single();

      if (profileError) {
        console.error(`❌ Profile creation failed for ${userData.email}:`, profileError);
        continue;
      }

      console.log(`✅ Profile created: ${profile.id}`);

      // 3. Create collector record if user is farmer or wild_collector
      if (userData.role === 'farmer' || userData.role === 'wild_collector') {
        const { error: collectorError } = await supabase
          .from('collectors')
          .insert({
            user_id: profile.id,
            collector_type: userData.role,
            location: `POINT(77.2090 28.6139)`, // Default coordinates (Delhi)
            location_address: userData.address,
            region: userData.role === 'farmer' ? 'Gujarat' : 'Kerala',
            country: 'India',
            specialization: userData.role === 'farmer' ? ['Ashwagandha', 'Turmeric'] : ['Wild Herbs', 'Forest Products'],
            experience_years: 5
          });

        if (collectorError) {
          console.error(`⚠️  Collector record creation failed for ${userData.email}:`, collectorError);
        } else {
          console.log(`✅ Collector record created`);
        }
      }

      console.log(`🎉 Successfully created complete user: ${userData.email}`);

    } catch (error) {
      console.error(`❌ Failed to create user ${userData.email}:`, error);
    }
  }

  console.log('\n🎊 Demo user seeding completed!');
  console.log('\n📋 Demo Credentials Summary:');
  demoUsers.forEach(user => {
    console.log(`${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
  });
}

// Run the seeding
seedDemoUsers()
  .then(() => {
    console.log('\n✨ All done! You can now use the demo credentials to log in.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });