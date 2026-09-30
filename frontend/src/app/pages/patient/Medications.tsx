import { useState } from 'react';
import { Search, Pill, Clock, Calendar, FileText } from 'lucide-react';

const medicationsData = [
  {
    id: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    time: '8:00 AM',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2026-01-15',
    refillsLeft: 2,
    pillsLeft: 25,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    time: '8:00 AM, 8:00 PM',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2026-02-01',
    refillsLeft: 3,
    pillsLeft: 48,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    time: '10:00 PM',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2025-12-10',
    refillsLeft: 1,
    pillsLeft: 15,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    time: '9:00 AM',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2025-11-01',
    refillsLeft: 5,
    pillsLeft: 80,
    status: 'Active',
  },
];

export function Medications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMed, setSelectedMed] = useState<number | null>(null);

  const filteredMedications = medicationsData.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Medications</h1>
        <p className="text-gray-600 mt-1">View and manage your active prescriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active Medications</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{medicationsData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Daily Doses</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">6</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Refills Needed</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">2</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Medications List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMedications.map((med) => (
          <div
            key={med.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{med.name}</h3>
                  <p className="text-gray-600">{med.dosage}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {med.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{med.frequency} - {med.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>Prescribed by {med.prescribedBy}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Since {med.startDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
              <div>
                <p className="text-sm text-gray-600">Pills Remaining</p>
                <p className="font-semibold text-gray-900">{med.pillsLeft} pills</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Refills Left</p>
                <p className="font-semibold text-gray-900">{med.refillsLeft}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMed(med.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
                Request Refill
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Medication Details Modal */}
      {selectedMed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Medication Details</h2>
                <button
                  onClick={() => setSelectedMed(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              {(() => {
                const med = medicationsData.find(m => m.id === selectedMed);
                if (!med) return null;
                return (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Pill className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-gray-600">{med.dosage}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Frequency</p>
                        <p className="font-medium text-gray-900">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium text-gray-900">{med.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prescribed By</p>
                        <p className="font-medium text-gray-900">{med.prescribedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-medium text-gray-900">{med.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pills Remaining</p>
                        <p className="font-medium text-gray-900">{med.pillsLeft}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Refills Left</p>
                        <p className="font-medium text-gray-900">{med.refillsLeft}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
                      <p className="text-gray-600 text-sm">Take with food. Avoid alcohol.</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
