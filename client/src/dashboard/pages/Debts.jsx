import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Debts = () => {
  const { debtsEvents } = useSelector((state) => state.deposit);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    proof: ''
  });

  const handleDateClick = (arg) => {
    setFormData({
      date: arg.dateStr,
      amount: '',
      proof: ''
    });
    setIsOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', formData);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={debtsEvents}
        dateClick={handleDateClick}
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center z-72">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 uppercase">Add Deposit</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proof</label>
                <input
                  type="text"
                  name="proof"
                  value={formData.proof}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn px-4 py-2 bg-red-600 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                 SEND 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Debts;
