import { Mail, Phone, Briefcase, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    email: 'sarah.johnson@med.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Dr, Suite 100',
    isPrimary: true,
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    email: 'michael.chen@med.com',
    phone: '+1 (555) 234-5678',
    address: '456 Health Plaza, Floor 3',
    isPrimary: false,
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Davis',
    specialty: 'Family Medicine',
    email: 'emily.davis@med.com',
    phone: '+1 (555) 345-6789',
    address: '789 Clinic Road, Building A',
    isPrimary: false,
    available: false,
  },
];

export function Doctors() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    reason: ''
  });

  const handleScheduleAppointment = (doctor) => {
    if (!doctor.available) return;
    setSelectedDoctor(doctor);
    setShowAppointmentForm(true);
  };

  const submitAppointment = () => {
    alert(`Appointment scheduled with ${selectedDoctor.name} for ${appointmentForm.date} at ${appointmentForm.time}`);
    setShowAppointmentForm(false);
    setSelectedDoctor(null);
    setAppointmentForm({ date: '', time: '', reason: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Doctors</h1>
        <p className="text-gray-600 mt-1">Your healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-xs ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
              {doctor.isPrimary && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Primary
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{doctor.address}</span>
              </div>
            </div>

            <button 
              onClick={() => handleScheduleAppointment(doctor)}
              disabled={!doctor.available}
              className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                doctor.available 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {doctor.available ? 'Schedule Appointment' : 'Currently Unavailable'}
            </button>
          </div>
        ))}
      </div>

      {/* Appointment Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Schedule Appointment</h3>
              <button 
                onClick={() => setShowAppointmentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">Doctor: <span className="font-medium">{selectedDoctor?.name}</span></p>
              <p className="text-sm text-gray-600">Specialty: <span className="font-medium">{selectedDoctor?.specialty}</span></p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
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
    </div>
  );
}
