import { useState, useEffect } from 'react';
import { Users, FileText, Activity, TrendingUp, Download, Database, RefreshCw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SystemStats {
  totalUsers: number;
  totalPrescriptions: number;
  activeDoctors: number;
  systemUptime: string;
  userGrowth: number;
  prescriptionGrowth: number;
  newDoctorsThisWeek: number;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  phone?: string;
  specialty?: string;
}

const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 145 },
  { month: 'Mar', users: 168 },
  { month: 'Apr', users: 195 },
  { month: 'May', users: 220 },
  { month: 'Jun', users: 258 },
];

const prescriptionData = [
  { month: 'Jan', count: 450 },
  { month: 'Feb', count: 520 },
  { month: 'Mar', count: 580 },
  { month: 'Apr', count: 610 },
  { month: 'May', count: 650 },
  { month: 'Jun', count: 702 },
];

const userTypeData = [
  { name: 'Patients', value: 200, color: '#10B981' },
  { name: 'Doctors', value: 45, color: '#3B82F6' },
  { name: 'Admins', value: 8, color: '#8B5CF6' },
];

export function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 258,
    totalPrescriptions: 702,
    activeDoctors: 45,
    systemUptime: '99.9%',
    userGrowth: 15,
    prescriptionGrowth: 8,
    newDoctorsThisWeek: 3,
  });
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Fetch real user data from backend
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('AdminDashboard: Fetching users with token:', token);
      
      const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('AdminDashboard: Response status:', response.status);
      console.log('AdminDashboard: Response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('AdminDashboard: Fetched users:', data);
        setUsers(data.data || []);
        
        // Update stats based on real data
        const totalUsers = data.data ? data.data.length : 0;
        const doctors = data.data ? data.data.filter((u: AppUser) => u.role === 'doctor').length : 0;
        const patients = data.data ? data.data.filter((u: AppUser) => u.role === 'patient').length : 0;
        
        setStats(prev => ({
          ...prev,
          totalUsers,
          activeDoctors: doctors,
        }));
      } else {
        const errorText = await response.text();
        console.error('AdminDashboard: Failed to fetch users:', response.status, errorText);
        
        // Use fallback data
        const fallbackUsers = [
          { id: '1', name: 'Dr. Sarah Johnson', email: 'doctor@med.com', role: 'doctor', status: 'Active', createdAt: new Date().toISOString().split('T')[0] },
          { id: '2', name: 'John Smith', email: 'patient@mail.com', role: 'patient', status: 'Active', createdAt: new Date().toISOString().split('T')[0] },
          { id: '3', name: 'Admin User', email: 'admin@med.com', role: 'admin', status: 'Active', createdAt: new Date().toISOString().split('T')[0] },
        ];
        setUsers(fallbackUsers);
        setStats(prev => ({
          ...prev,
          totalUsers: fallbackUsers.length,
          activeDoctors: fallbackUsers.filter(u => u.role === 'doctor').length,
        }));
      }
    } catch (error) {
      console.error('AdminDashboard: Failed to fetch users:', error);
      
      // Use fallback data on error
      const fallbackUsers = [
        { id: '1', name: 'Dr. Sarah Johnson', email: 'doctor@med.com', role: 'doctor', status: 'Active', createdAt: new Date().toISOString().split('T')[0] },
        { id: '2', name: 'John Smith', email: 'patient@mail.com', role: 'patient', status: 'Active', createdAt: new Date().toISOString().split('T')[0] },
        { id: '3', name: 'Admin User', email: 'admin@med.com', role: 'admin', status: 'Active', createdAt: new Date().toISOString().split('T')[0] },
      ];
      setUsers(fallbackUsers);
      setStats(prev => ({
        ...prev,
        totalUsers: fallbackUsers.length,
        activeDoctors: fallbackUsers.filter(u => u.role === 'doctor').length,
      }));
    }
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      // Create comprehensive report data
      const reportData = {
        generatedAt: new Date().toISOString(),
        systemStats: stats,
        users: users,
        userGrowth: userGrowthData,
        prescriptionTrends: prescriptionData,
        userTypeDistribution: userTypeData,
      };

      // Convert to JSON and create download
      const jsonString = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `medication-tracker-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Report exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleBackupNow = async () => {
    setIsBackingUp(true);
    try {
      const response = await fetch('http://localhost:8080/api/admin/backup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Download backup file
        const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert('Backup completed successfully!');
      } else {
        throw new Error('Backup failed');
      }
    } catch (error) {
      console.error('Backup failed:', error);
      alert('Failed to create backup. Please try again.');
    } finally {
      setIsBackingUp(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and analytics</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportReport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Export Report'}
          </button>
          <button
            onClick={handleBackupNow}
            disabled={isBackingUp}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Database className="w-5 h-5" />
            {isBackingUp ? 'Backing Up...' : 'Backup Now'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              <p className="text-sm text-green-600 mt-2">↑ {stats.userGrowth}% this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Prescriptions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPrescriptions}</p>
              <p className="text-sm text-green-600 mt-2">↑ {stats.prescriptionGrowth}% this month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Doctors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeDoctors}</p>
              <p className="text-sm text-blue-600 mt-2">{stats.newDoctorsThisWeek} new this week</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">System Uptime</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.systemUptime}</p>
              <p className="text-sm text-green-600 mt-2">Excellent</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Prescription Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={prescriptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {userTypeData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }}></div>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-600">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New doctor registered</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">15 prescriptions created</p>
                <p className="text-xs text-gray-600">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">System backup completed</p>
                <p className="text-xs text-gray-600">8 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}