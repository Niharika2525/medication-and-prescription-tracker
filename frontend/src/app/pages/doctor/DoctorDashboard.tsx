import { Users, FileText, Clock, TrendingUp, Calendar, AlertCircle, X, Check, Send, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useState } from 'react';

interface Patient {
  id: number;
  name: string;
  lastVisit: string;
  status: string;
  email: string;
  phone: string;
  medications: string[];
}

interface Appointment {
  id: number;
  patient: string;
  time: string;
  type: string;
  date?: string;
  reason?: string;
}

interface Prescription {
  id: number;
  patient: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  date: string;
  status: string;
  completed?: boolean;
  completedDate?: string;
}

const statsData = [
  { name: 'Jan', prescriptions: 45 },
  { name: 'Feb', prescriptions: 52 },
  { name: 'Mar', prescriptions: 48 },
  { name: 'Apr', prescriptions: 61 },
  { name: 'May', prescriptions: 55 },
  { name: 'Jun', prescriptions: 67 },
];

const recentPatients = [
  { id: 1, name: 'John Smith', lastVisit: '2026-03-05', status: 'Active', email: 'john.smith@email.com', phone: '+1-555-0101', medications: ['Lisinopril 10mg', 'Metformin 500mg'] },
  { id: 2, name: 'Emma Wilson', lastVisit: '2026-03-04', status: 'Active', email: 'emma.wilson@email.com', phone: '+1-555-0102', medications: ['Aspirin 81mg'] },
  { id: 3, name: 'Michael Brown', lastVisit: '2026-03-03', status: 'Follow-up', email: 'michael.brown@email.com', phone: '+1-555-0103', medications: ['Lisinopril 10mg'] },
  { id: 4, name: 'Sarah Davis', lastVisit: '2026-03-02', status: 'Active', email: 'sarah.davis@email.com', phone: '+1-555-0104', medications: ['Metformin 500mg'] },
];

const upcomingAppointments = [
  { id: 1, patient: 'John Smith', time: '10:00 AM', type: 'Check-up', date: '2026-03-12', reason: 'Regular check-up and medication review' },
  { id: 2, patient: 'Emma Wilson', time: '11:30 AM', type: 'Follow-up', date: '2026-03-12', reason: 'Follow up on blood pressure medication' },
  { id: 3, patient: 'Michael Brown', time: '2:00 PM', type: 'Consultation', date: '2026-03-12', reason: 'Discuss medication side effects' },
];

export function DoctorDashboard() {
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });
  const [patientMedications, setPatientMedications] = useState<Record<number, Prescription[]>>({});

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleSendPrescription = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPrescriptionForm(true);
  };

  const submitPrescription = () => {
    if (!selectedPatient) return;
    
    const newPrescription: Prescription = {
      id: Date.now(),
      patient: selectedPatient.name,
      medication: prescriptionForm.medication,
      dosage: prescriptionForm.dosage,
      frequency: prescriptionForm.frequency,
      duration: prescriptionForm.duration,
      instructions: prescriptionForm.instructions,
      date: new Date().toISOString(),
      status: 'active'
    };

    // Update patient medications
    setPatientMedications(prev => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), newPrescription]
    }));

    setShowPrescriptionForm(false);
    setSelectedPatient(null);
    setPrescriptionForm({
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
    alert(`Prescription sent to ${selectedPatient.name} successfully!`);
  };

  const handleMarkMedicationCompleted = (patientId: number, medicationId: number) => {
    setPatientMedications(prev => ({
      ...prev,
      [patientId]: prev[patientId]?.map((med: Prescription) => 
        med.id === medicationId ? { ...med, completed: true, completedDate: new Date().toISOString() } : med
      ) || []
    }));
  };
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">248</p>
              <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prescriptions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">67</p>
              <p className="text-sm text-green-600 mt-2">↑ 8% this month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
              <p className="text-sm text-blue-600 mt-2">3 remaining</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              <p className="text-sm text-orange-600 mt-2">Requires attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prescriptions Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Prescription Trends</h2>
              <p className="text-sm text-gray-600">Last 6 months</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="prescriptions" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        patient.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button 
                      onClick={() => handleViewDetails(patient)}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {showPatientDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Patient Details</h3>
              <button 
                onClick={() => setShowPatientDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name: <span className="font-medium">{selectedPatient.name}</span></p>
                <p className="text-sm text-gray-600">Email: <span className="font-medium">{selectedPatient.email}</span></p>
                <p className="text-sm text-gray-600">Phone: <span className="font-medium">{selectedPatient.phone}</span></p>
                <p className="text-sm text-gray-600">Last Visit: <span className="font-medium">{selectedPatient.lastVisit}</span></p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Current Medications:</p>
                <div className="space-y-2">
                  {selectedPatient.medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{med}</span>
                      <button 
                        onClick={() => handleSendPrescription(selectedPatient)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Send Prescription
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPatientDetails(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleSendPrescription(selectedPatient)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Form Modal */}
      {showPrescriptionForm && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Prescription</h3>
              <button 
                onClick={() => setShowPrescriptionForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">Patient: <span className="font-medium">{selectedPatient.name}</span></p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medication</label>
                <input
                  type="text"
                  value={prescriptionForm.medication}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, medication: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter medication name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  value={prescriptionForm.dosage}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, dosage: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10mg, 500mg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <input
                  type="text"
                  value={prescriptionForm.frequency}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, frequency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Twice daily, Once daily"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={prescriptionForm.duration}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 30 days, 3 months"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  value={prescriptionForm.instructions}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, instructions: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Special instructions for taking this medication"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPrescriptionForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitPrescription}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
