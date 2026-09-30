import { Pill, Clock, AlertCircle, Calendar, Bell, TrendingUp, X, Check, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const adherenceData = [
  { day: 'Mon', taken: 100 },
  { day: 'Tue', taken: 100 },
  { day: 'Wed', taken: 75 },
  { day: 'Thu', taken: 100 },
  { day: 'Fri', taken: 100 },
  { day: 'Sat', taken: 100 },
  { day: 'Sun', taken: 100 },
];

const initialMedications = [
  { id: 1, name: 'Lisinopril 10mg', time: '8:00 AM', taken: true },
  { id: 2, name: 'Metformin 500mg', time: '8:00 AM', taken: true },
  { id: 3, name: 'Metformin 500mg', time: '8:00 PM', taken: false },
  { id: 4, name: 'Aspirin 81mg', time: '9:00 AM', taken: true },
];

const initialRefills = [
  { id: 1, medication: 'Lisinopril 10mg', daysLeft: 5, pills: 10 },
  { id: 2, medication: 'Metformin 500mg', daysLeft: 12, pills: 24 },
];

const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', available: true },
  { id: 3, name: 'Dr. Emily Davis', specialty: 'Family Medicine', available: false },
];

export function PatientDashboard() {
  const [medications, setMedications] = useState(initialMedications);
  const [refills, setRefills] = useState(initialRefills);
  const [showRefillForm, setShowRefillForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedRefill, setSelectedRefill] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors] = useState(mockDoctors);
  const [refillForm, setRefillForm] = useState({ notes: '' });
  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });

  const totalMedications = medications.length;
  const takenMedications = medications.filter(m => m.taken).length;

  const handleMarkTaken = (medId) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === medId ? { ...med, taken: true } : med
      )
    );
  };

  const handleRequestRefill = (refill) => {
    setSelectedRefill(refill);
    setShowRefillForm(true);
  };

  const submitRefillRequest = () => {
    const newRequest = {
      id: Date.now(),
      medication: selectedRefill.medication,
      notes: refillForm.notes,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };
    
    setRefills(prev => prev.map(r => 
      r.id === selectedRefill.id ? { ...r, daysLeft: 30, pills: 60 } : r
    ));
    
    setShowRefillForm(false);
    setSelectedRefill(null);
    setRefillForm({ notes: '' });
    alert('Refill request submitted successfully!');
  };

  const submitAppointment = () => {
    const doctor = doctors.find(d => d.id === parseInt(appointmentForm.doctorId));
    const newAppointment = {
      id: Date.now(),
      doctor: doctor.name,
      date: appointmentForm.date,
      time: appointmentForm.time,
      reason: appointmentForm.reason,
      status: 'scheduled'
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    setShowAppointmentForm(false);
    setAppointmentForm({ doctorId: '', date: '', time: '', reason: '' });
    alert('Appointment scheduled successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your medications and health</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Medications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
              <p className="text-sm text-blue-600 mt-2">All up to date</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{takenMedications}/{totalMedications}</p>
              <p className="text-sm text-green-600 mt-2">Medications taken</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{appointments.length}</p>
              <p className="text-sm text-purple-600 mt-2">Appointments</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Quick Actions</p>
              <button
                onClick={() => setShowAppointmentForm(true)}
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Appointment
              </button>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Medications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Today's Medications</h2>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {medications.map((med) => (
              <div
                key={med.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  med.taken
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      med.taken ? 'bg-green-600' : 'bg-gray-400'
                    }`}
                  >
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.time}</p>
                  </div>
                </div>
                {med.taken ? (
                  <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Taken
                  </span>
                ) : (
                  <button 
                    onClick={() => handleMarkTaken(med.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                  >
                    Mark Taken
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Adherence */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Weekly Adherence</h2>
              <p className="text-sm text-gray-600">This week's medication compliance</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={adherenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="taken" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-gray-900">96%</p>
            <p className="text-sm text-gray-600">Average adherence this week</p>
          </div>
        </div>
      </div>

      {/* Refills Alert */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Medications Needing Refills</h2>
            <p className="text-sm text-gray-600">Request refills before they run out</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {refills.map((refill) => (
            <div
              key={refill.id}
              className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{refill.medication}</p>
                <p className="text-sm text-gray-600">{refill.pills} pills left</p>
                <p className="text-sm font-medium text-orange-600 mt-1">
                  {refill.daysLeft} days remaining
                </p>
              </div>
              <button 
                onClick={() => handleRequestRefill(refill)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium whitespace-nowrap transition-colors"
              >
                Request Refill
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Refill Request Modal */}
      {showRefillForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Request Refill</h3>
              <button 
                onClick={() => setShowRefillForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">Medication: <span className="font-medium">{selectedRefill?.medication}</span></p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={refillForm.notes}
                onChange={(e) => setRefillForm(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Add any notes about your refill request..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowRefillForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitRefillRequest}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Schedule Appointment</h3>
              <button 
                onClick={() => setShowAppointmentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  value={appointmentForm.doctorId}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, doctorId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.filter(d => d.available).map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time...</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  value={appointmentForm.reason}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the reason for your appointment..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitAppointment}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Section */}
      {appointments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Appointments</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{apt.doctor}</p>
                  <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                  <p className="text-sm text-gray-500 mt-1">{apt.reason}</p>
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
