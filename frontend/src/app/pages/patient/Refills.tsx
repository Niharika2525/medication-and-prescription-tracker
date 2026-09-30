import { useState } from 'react';
import { Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/Modal';

export function Refills() {
  const { medications, refillRequests, addRefillRequest, updateRefillRequest } = useData();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMedicationId, setSelectedMedicationId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const handleRequestRefill = () => {
    if (selectedMedicationId) {
      const medication = medications.find(m => m.id === selectedMedicationId);
      if (medication) {
        addRefillRequest({
          medicationId: medication.id,
          medicationName: medication.name,
          requestDate: new Date().toISOString().split('T')[0],
          status: 'Pending',
          notes,
        });
        setShowRequestModal(false);
        setSelectedMedicationId(null);
        setNotes('');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Denied':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'Approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'Denied':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Refill Requests</h1>
          <p className="text-gray-600 mt-1">Request and track medication refills</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus className="w-5 h-5" />
          Request Refill
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pending Requests</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {refillRequests.filter(r => r.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Approved This Month</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {refillRequests.filter(r => r.status === 'Approved').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Available Medications</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{medications.length}</p>
        </div>
      </div>

      {/* Refill Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {refillRequests.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No refill requests yet</p>
              <button
                onClick={() => setShowRequestModal(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Request your first refill
              </button>
            </div>
          ) : (
            refillRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.medicationName}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Requested on {request.requestDate}</p>
                    {request.notes && (
                      <p className="text-sm text-gray-600 mt-2">Note: {request.notes}</p>
                    )}
                  </div>
                  {request.status === 'Pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => updateRefillRequest(request.id, 'Approved')}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve (Demo)
                      </button>
                      <button
                        onClick={() => updateRefillRequest(request.id, 'Denied')}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Deny (Demo)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Request Refill Modal */}
      {showRequestModal && (
        <Modal
          isOpen={showRequestModal}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedMedicationId(null);
            setNotes('');
          }}
          title="Request Medication Refill"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Medication *
              </label>
              <select
                value={selectedMedicationId || ''}
                onChange={(e) => setSelectedMedicationId(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a medication...</option>
                {medications.map((med) => (
                  <option key={med.id} value={med.id}>
                    {med.name} {med.dosage} - {med.refillsLeft} refills left
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any notes about your refill request..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Your refill request will be reviewed by your doctor. You'll be notified once it's been approved or denied.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleRequestRefill}
                disabled={!selectedMedicationId}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Request
              </button>
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedMedicationId(null);
                  setNotes('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
