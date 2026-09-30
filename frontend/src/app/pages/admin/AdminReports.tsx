import { Download, TrendingUp, FileText, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', prescriptions: 450, users: 120, doctors: 35 },
  { month: 'Feb', prescriptions: 520, users: 145, doctors: 38 },
  { month: 'Mar', prescriptions: 580, users: 168, doctors: 40 },
  { month: 'Apr', prescriptions: 610, users: 195, doctors: 42 },
  { month: 'May', prescriptions: 650, users: 220, doctors: 43 },
  { month: 'Jun', prescriptions: 702, users: 258, doctors: 45 },
];

export function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">System performance and statistics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-green-600 text-sm font-medium">+8%</span>
          </div>
          <p className="text-sm text-gray-600">Total Prescriptions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">702</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-600" />
            <span className="text-green-600 text-sm font-medium">+15%</span>
          </div>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">258</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-green-600 text-sm font-medium">+5%</span>
          </div>
          <p className="text-sm text-gray-600">Active Doctors</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-orange-600" />
            <span className="text-green-600 text-sm font-medium">+12%</span>
          </div>
          <p className="text-sm text-gray-600">Avg. Daily Prescriptions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Prescription Trends (6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="prescriptions" stroke="#3B82F6" strokeWidth={2} name="Prescriptions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#10B981" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Doctor Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="doctors" stroke="#8B5CF6" strokeWidth={2} name="Doctors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
