import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

export function NewPrescription() {
  const navigate = useNavigate();
  const { patients, addPrescription } = useData();
  const [formData, setFormData] = useState({
    patient: '',
    medication: '',
    dosage: '',
    frequency: 'once-daily',
    duration: '',
    refills: '0',
    instructions: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPatient = patients.find(p => p.id === formData.patient);
    if (!selectedPatient) return;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(formData.duration));

    addPrescription({
      patientId: formData.patient,
      patient: selectedPatient.name,
      medication: formData.medication,
      dosage: formData.dosage,
      frequency: formData.frequency,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'Active',
      refills: parseInt(formData.refills),
      instructions: formData.instructions,
      notes: formData.notes,
    });

    navigate('/doctor/prescriptions');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/doctor/prescriptions')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Prescription</h1>
          <p className="text-gray-600 mt-1">Create a new prescription for your patient</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Selection */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Patient *
            </label>
            <select
              required
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a patient...</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </div>

          {/* Medication Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medication Name *
            </label>
            <input
              type="text"
              required
              value={formData.medication}
              onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
              placeholder="e.g., Lisinopril 10mg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosage *
            </label>
            <input
              type="text"
              required
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              placeholder="e.g., 1 tablet"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency *
            </label>
            <select
              required
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="once-daily">Once daily</option>
              <option value="twice-daily">Twice daily</option>
              <option value="three-times">Three times daily</option>
              <option value="four-times">Four times daily</option>
              <option value="as-needed">As needed</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (days) *
            </label>
            <input
              type="number"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Refills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Refills
            </label>
            <select
              value={formData.refills}
              onChange={(e) => setFormData({ ...formData, refills: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="0">No refills</option>
              <option value="1">1 refill</option>
              <option value="2">2 refills</option>
              <option value="3">3 refills</option>
              <option value="4">4 refills</option>
              <option value="5">5 refills</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="e.g., Take with food, avoid alcohol"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Internal Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Internal Notes (not visible to patient)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any internal notes..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Save className="w-5 h-5" />
            Create Prescription
          </button>
          <button
            type="button"
            onClick={() => navigate('/doctor/prescriptions')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}