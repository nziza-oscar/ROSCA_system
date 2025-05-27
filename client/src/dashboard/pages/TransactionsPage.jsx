import { Search } from 'lucide-react';
import { useState } from 'react';

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState('deposits');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  // Mock data
  const depositData = [
    { id: 1, amount: 1000, date: '2025-05-20', currency: 'FRW', status: 'approved' },
    { id: 2, amount: 2000, date: '2025-05-21', currency: 'FRW', status: 'approved' },
  ];

  const withdrawalData = [
    { id: 1, amount: 500, date: '2025-05-22', currency: 'FRW', status: 'pending' },
    { id: 2, amount: 1000, date: '2025-05-23', currency: 'FRW', status: 'approved' },
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 bg-navy-900 py-4 px-3 rounded">
        <div>
            <h1 className="text-2xl font-bold text-white uppercase" translate='no'>Ishimwe Samwel</h1>
            <p className='text-white'>Account Balance: <b>30,000 FRW</b></p>
        </div>
        <form className="flex items-center gap-4">
          <div>
            <label className="text-xs text-white pb-1 block">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 text-sm bg-white text-xs outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-white pb-1 block">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 text-sm bg-white text-xs outline-none"
            />
          </div>
          <button className='btn bg-green-600 self-end cursor-pointer '><Search size={16}/></button>
        </form>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4">
        <nav className="flex gap-4">
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === 'deposits'
                ? 'border-green-600 text-green-600 font-semibold'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('deposits')}
          >
           Amount Deposits
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === 'withdrawals'
                ? 'border-green-600 text-green-600 font-semibold'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('withdrawals')}
          >
            Withdrew Amounts 
          </button>
        </nav>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Currency</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'deposits' ? depositData : withdrawalData).map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.currency}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2 capitalize">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
