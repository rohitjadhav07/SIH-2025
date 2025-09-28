import React from 'react';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Package2, Shield, MapPin, Zap, Database, Link } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeCollectors: 0,
    herbsCollected: 0,
    blockchainTransactions: 0,
    ipfsDocuments: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get collectors count
      const { count: collectorsCount } = await supabase
        .from('collectors')
        .select('*', { count: 'exact', head: true });

      // Get total herbs collected
      const { data: collections } = await supabase
        .from('herb_collections')
        .select('quantity');
      
      const totalHerbs = collections?.reduce((sum, col) => sum + col.quantity, 0) || 0;

      // Get blockchain transactions count
      const { count: txCount } = await supabase
        .from('blockchain_transactions')
        .select('*', { count: 'exact', head: true });

      // Get IPFS documents count
      const { count: ipfsCount } = await supabase
        .from('ipfs_documents')
        .select('*', { count: 'exact', head: true });

      setStats({
        activeCollectors: collectorsCount || 0,
        herbsCollected: Math.round(totalHerbs),
        blockchainTransactions: txCount || 0,
        ipfsDocuments: ipfsCount || 0,
      });

      // Get recent activity
      const { data: recentCollections } = await supabase
        .from('herb_collections')
        .select(`
          collection_id,
          herb_name,
          created_at,
          collectors (
            user_profiles (name)
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      const activity = recentCollections?.map(col => ({
        type: 'collection',
        herb: col.herb_name,
        collector: col.collectors?.user_profiles?.name || 'Unknown',
        time: new Date(col.created_at).toLocaleString(),
        id: col.collection_id,
      })) || [];

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { 
      label: 'Active Collectors', 
      value: stats.activeCollectors.toLocaleString(), 
      change: '+12%', 
      icon: Users, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Herbs Collected (kg)', 
      value: stats.herbsCollected.toLocaleString(), 
      change: '+8%', 
      icon: Package2, 
      color: 'text-green-600' 
    },
    { 
      label: 'Blockchain Transactions', 
      value: stats.blockchainTransactions.toLocaleString(), 
      change: '+25%', 
      icon: Database, 
      color: 'text-purple-600' 
    },
    { 
      label: 'IPFS Documents Stored', 
      value: stats.ipfsDocuments.toLocaleString(), 
      change: '+18%', 
      icon: Link, 
      color: 'text-indigo-600' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SwasthyaChain Dashboard</h2>
        <div className="text-sm text-gray-600">
          Welcome, {user?.name} ({user?.role})
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Zap className="h-4 w-4 text-green-500" />
          <span>Real-time tracking active</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Supply Chain Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'collection' ? 'bg-blue-500' :
                      activity.type === 'processing' ? 'bg-orange-500' :
                      activity.type === 'quality' ? 'bg-green-500' : 'bg-purple-500'
                    }`} />
                    <span className="font-medium text-gray-900">
                      {activity.herb || activity.product || 'Unknown'}
                    </span>
                    <span className="text-gray-600">
                      {(activity as any).collector || (activity as any).stage || (activity as any).result || (activity as any).batch || 'N/A'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 ml-5">
                    {activity.location} • {activity.time}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'collection' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'processing' ? 'bg-orange-100 text-orange-800' :
                    activity.type === 'quality' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Network Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Network Health</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Nodes</span>
              <span className="text-sm font-medium text-gray-900">12/12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Latest Block</span>
              <span className="text-sm font-medium text-gray-900">#45,892</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Block Time</span>
              <span className="text-sm font-medium text-gray-900">2.3s</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">IPFS Storage Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="text-sm font-medium text-gray-900">2.4 TB / 10 TB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pinned Files</span>
              <span className="text-sm font-medium text-gray-900">12,456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Gateway Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};