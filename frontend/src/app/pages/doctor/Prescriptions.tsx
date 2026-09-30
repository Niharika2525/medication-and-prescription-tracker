import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { Prescription } from '../../context/DataContext';

export function Prescriptions() {
  const { prescriptions, updatePrescription, deletePrescription } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewPrescription, setViewPrescription] = useState<Prescription | null>(null);
  const [editPrescription, setEditPrescription] = useState<Prescription | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prescription.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (prescription: Prescription) => {
    setEditPrescription({ ...prescription });
  };

  const handleSaveEdit = () => {
    if (editPrescription) {
      updatePrescription(editPrescription.id, editPrescription);
      setEditPrescription(null);
    }
  };

  const handleDelete = (id: number) => {
    deletePrescription(id);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage all patient prescriptions</p>
        </div>
        <Link
          to="/doctor/prescriptions/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus className="w-5 h-5" />
          New Prescription
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active Prescriptions</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {prescriptions.filter(p => p.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Expiring Soon</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">3</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient or medication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-medium">
                          {prescription.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {prescription.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {prescription.medication}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.dosage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{prescription.startDate}</div>
                    <div>to {prescription.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.refills} remaining
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        prescription.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setViewPrescription(prescription)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(prescription)}
                        className="text-gray-600 hover:text-gray-700 p-1"
                        title="Edit prescription"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteId(prescription.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Delete prescription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewPrescription && (
        <Modal
          isOpen={!!viewPrescription}
          onClose={() => setViewPrescription(null)}
          title="Prescription Details"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Patient</label>
                <p className="text-gray-900 mt-1">{viewPrescription.patient}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <p className="mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    viewPrescription.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {viewPrescription.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Medication</label>
                <p className="text-gray-900 mt-1">{viewPrescription.medication}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Dosage</label>
                <p className="text-gray-900 mt-1">{viewPrescription.dosage}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Frequency</label>
                <p className="text-gray-900 mt-1">{viewPrescription.frequency}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Refills Remaining</label>
                <p className="text-gray-900 mt-1">{viewPrescription.refills}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Start Date</label>
                <p className="text-gray-900 mt-1">{viewPrescription.startDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">End Date</label>
                <p className="text-gray-900 mt-1">{viewPrescription.endDate}</p>
              </div>
            </div>
            {viewPrescription.instructions && (
              <div>
                <label className="text-sm font-medium text-gray-600">Instructions</label>
                <p className="text-gray-900 mt-1">{viewPrescription.instructions}</p>
              </div>
            )}
            {viewPrescription.notes && (
              <div>
                <label className="text-sm font-medium text-gray-600">Internal Notes</label>
                <p className="text-gray-900 mt-1">{viewPrescription.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {editPrescription && (
        <Modal
          isOpen={!!editPrescription}
          onClose={() => setEditPrescription(null)}
          title="Edit Prescription"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
                <input
                  type="text"
                  value={editPrescription.medication}
                  onChange={(e) => setEditPrescription({ ...editPrescription, medication: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                <input
                  type="text"
                  value={editPrescription.dosage}
                  onChange={(e) => setEditPrescription({ ...editPrescription, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editPrescription.startDate}
                  onChange={(e) => setEditPrescription({ ...editPrescription, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={editPrescription.endDate}
                  onChange={(e) => setEditPrescription({ ...editPrescription, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                <input
                  type="number"
                  value={editPrescription.refills}
                  onChange={(e) => setEditPrescription({ ...editPrescription, refills: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editPrescription.status}
                  onChange={(e) => setEditPrescription({ ...editPrescription, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              <textarea
                value={editPrescription.instructions || ''}
                onChange={(e) => setEditPrescription({ ...editPrescription, instructions: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditPrescription(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Prescription"
        message="Are you sure you want to delete this prescription? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}