import { useState } from 'react';
import { Search, Calendar, Download, FileText } from 'lucide-react';

const historyData = [
  {
    id: 1,
    date: '2026-03-05',
    patient: 'John Smith',
    action: 'Prescription Created',
    medication: 'Lisinopril 10mg',
    details: 'New prescription for blood pressure management',
  },
  {
    id: 2,
    date: '2026-03-04',
    patient: 'Emma Wilson',
    action: 'Prescription Renewed',
    medication: 'Metformin 500mg',
    details: 'Refill approved for 3 months',
  },
  {
    id: 3,
    date: '2026-03-03',
    patient: 'Michael Brown',
    action: 'Prescription Modified',
    medication: 'Atorvastatin 20mg',
    details: 'Dosage adjusted from 10mg to 20mg',
  },
  {
    id: 4,
    date: '2026-03-02',
    patient: 'Sarah Davis',
    action: 'Prescription Created',
    medication: 'Amoxicillin 500mg',
    details: 'Antibiotic for respiratory infection',
  },
  {
    id: 5,
    date: '2026-03-01',
    patient: 'Robert Johnson',
    action: 'Prescription Completed',
    medication: 'Prednisone 10mg',
    details: 'Treatment course completed successfully',
  },
  {
    id: 6,
    date: '2026-02-28',
    patient: 'John Smith',
    action: 'Patient Visit',
    medication: '-',
    details: 'Routine check-up and blood pressure monitoring',
  },
  {
    id: 7,
    date: '2026-02-27',
    patient: 'Emma Wilson',
    action: 'Lab Results Reviewed',
    medication: '-',
    details: 'HbA1c levels within target range',
  },
];

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = 
      item.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Simple date filtering
    const today = new Date();
    const itemDate = new Date(item.date);
    let matchesDate = true;
    
    if (dateFilter === 'today') {
      matchesDate = itemDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = itemDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = itemDate >= monthAgo;
    }
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescription History</h1>
          <p className="text-gray-600 mt-1">View all prescription activities and patient interactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          <Download className="w-5 h-5" />
          Export History
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Activities</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{historyData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">67</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Prescriptions</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">52</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Patient Visits</p>
          <p className="text-3xl font-bold text-green-600 mt-2">15</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* History Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-6">
            {filteredHistory.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.action.includes('Created') ? 'bg-blue-100' :
                    item.action.includes('Renewed') ? 'bg-green-100' :
                    item.action.includes('Modified') ? 'bg-yellow-100' :
                    item.action.includes('Completed') ? 'bg-gray-100' :
                    'bg-purple-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      item.action.includes('Created') ? 'text-blue-600' :
                      item.action.includes('Renewed') ? 'text-green-600' :
                      item.action.includes('Modified') ? 'text-yellow-600' :
                      item.action.includes('Completed') ? 'text-gray-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  {index < filteredHistory.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.action}</h3>
                      <p className="text-sm text-gray-600">{item.patient}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {item.medication !== '-' && (
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {item.medication}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
