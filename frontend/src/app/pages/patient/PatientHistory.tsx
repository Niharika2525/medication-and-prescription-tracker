import { Calendar, FileText } from 'lucide-react';

const historyData = [
  { id: 1, date: '2026-03-01', type: 'Prescription', description: 'Lisinopril 10mg prescribed', doctor: 'Dr. Sarah Johnson' },
  { id: 2, date: '2026-02-15', type: 'Appointment', description: 'Regular check-up completed', doctor: 'Dr. Sarah Johnson' },
  { id: 3, date: '2026-02-01', type: 'Prescription', description: 'Metformin 500mg prescribed', doctor: 'Dr. Sarah Johnson' },
  { id: 4, date: '2026-01-20', type: 'Refill', description: 'Atorvastatin refill approved', doctor: 'Dr. Sarah Johnson' },
  { id: 5, date: '2026-01-15', type: 'Prescription', description: 'Aspirin 81mg prescribed', doctor: 'Dr. Sarah Johnson' },
];

export function PatientHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
        <p className="text-gray-600 mt-1">View your prescription and appointment history</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {historyData.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.description}</h3>
                    <p className="text-sm text-gray-600">{item.doctor}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                </div>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
