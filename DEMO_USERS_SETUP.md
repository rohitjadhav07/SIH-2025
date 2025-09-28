# Demo Users Setup Guide

## 🎯 Goal
Create the demo users from the login form in your Supabase database so they can actually log in and use the system.

## 📋 Demo Credentials to Create

| Role | Email | Password | Name |
|------|-------|----------|------|
| Admin | admin@swasthyachain.gov.in | admin123 | System Administrator |
| Regulator | regulator@ayush.gov.in | regulator123 | Dr. Rajesh Kumar |
| Farmer | ramesh.patel@gmail.com | farmer123 | Ramesh Patel |
| Wild Collector | priya.nair@forestcoop.org | collector123 | Priya Nair |
| Testing Lab | lab@qualitylabs.com | lab123 | Dr. Suresh Sharma |
| Manufacturer | manufacturing@himalaya.com | mfg123 | Arun Krishnan |

## 🚀 Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Create Auth Users
1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication → Users**
3. Click **"Add User"** for each demo user:

**For each user, enter:**
- **Email**: (from table above)
- **Password**: (from table above)
- **Email Confirm**: ✅ Check this box
- **Auto Confirm User**: ✅ Check this box

### Step 2: Get User IDs
After creating each auth user, note down their **User ID** (UUID format like `550e8400-e29b-41d4-a716-446655440000`)

### Step 3: Create User Profiles
1. Go to **Database → SQL Editor**
2. Run this SQL (replace the UUIDs with actual ones from Step 2):

```sql
-- Insert user profiles (replace UUIDs with actual ones)
INSERT INTO user_profiles (
  auth_user_id, email, name, role, organization, phone, address, 
  license_number, certifications, is_verified, is_active
) VALUES 
-- Admin User (replace 'ADMIN_UUID_HERE' with actual UUID)
(
  'ADMIN_UUID_HERE',
  'admin@swasthyachain.gov.in',
  'System Administrator',
  'admin',
  'SwasthyaChain Government',
  '+91-9876543210',
  'Ministry of AYUSH, New Delhi, India',
  'ADMIN-2024-001',
  ARRAY['System Administration', 'AYUSH Compliance'],
  true,
  true
),
-- Regulator User (replace 'REGULATOR_UUID_HERE' with actual UUID)
(
  'REGULATOR_UUID_HERE',
  'regulator@ayush.gov.in',
  'Dr. Rajesh Kumar',
  'regulator',
  'Ministry of AYUSH',
  '+91-9876543211',
  'AYUSH Bhawan, New Delhi, India',
  'REG-AYUSH-2024-001',
  ARRAY['AYUSH Regulatory Affairs', 'Quality Compliance'],
  true,
  true
),
-- Continue for all other users...
```

### Step 4: Create Collector Records
For farmer and wild collector users, also run:

```sql
-- Create collector records
INSERT INTO collectors (
  user_id, collector_type, location, location_address, region, country, 
  specialization, experience_years
) 
SELECT 
  up.id,
  up.role,
  ST_GeomFromText('POINT(72.5714 23.0225)', 4326),
  up.address,
  CASE 
    WHEN up.role = 'farmer' THEN 'Gujarat'
    ELSE 'Kerala'
  END,
  'India',
  CASE 
    WHEN up.role = 'farmer' THEN ARRAY['Ashwagandha', 'Turmeric']
    ELSE ARRAY['Wild Herbs', 'Forest Products']
  END,
  5
FROM user_profiles up 
WHERE up.role IN ('farmer', 'wild_collector');
```

## 🚀 Method 2: Using the Seeding Script

### Prerequisites
1. Get your **Supabase Service Role Key**:
   - Go to **Settings → API**
   - Copy the **service_role** key (not the anon key)

2. Add to your `.env` file:
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Run the Script
```bash
# Install dependencies
npm install

# Run the seeding script
npm run seed-demo-users
```

## ✅ Verification

After creating the users, test each login:

1. Go to your app login page
2. Try logging in with each demo credential
3. Verify you can access the appropriate dashboard for each role

### Expected Results:
- **Admin**: Full system access, user management
- **Regulator**: Compliance monitoring, user approval
- **Farmer**: Herb collection interface
- **Wild Collector**: Forest collection tracking
- **Testing Lab**: Quality testing workflows
- **Manufacturer**: Product formulation and QR generation

## 🔧 Troubleshooting

### Issue: "Invalid login credentials"
- **Solution**: Make sure the auth user was created in Supabase Auth
- **Check**: Email and password match exactly

### Issue: "Account not verified"
- **Solution**: Set `is_verified = true` in user_profiles table
- **SQL**: `UPDATE user_profiles SET is_verified = true WHERE email = 'user@example.com';`

### Issue: "User profile not found"
- **Solution**: Make sure user_profiles record exists with correct `auth_user_id`
- **Check**: The `auth_user_id` matches the UUID from Supabase Auth

### Issue: RLS Policy Errors
- **Solution**: Temporarily disable RLS or use service role key
- **SQL**: `ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;` (re-enable after seeding)

## 🎉 Success!

Once all demo users are created, your SwasthyaChain app will have:
- ✅ Working login for all demo credentials
- ✅ Role-based dashboards and features
- ✅ Complete user profiles with proper permissions
- ✅ Ready for SIH demonstration

**Your demo environment is now fully functional! 🚀**