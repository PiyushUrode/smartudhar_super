import React, { useState, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { Search, Edit2, Trash2, Download, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';

const initialPending = [
  { date: '2025-03-01', amount: 25000, overdue: false },
  { date: '2025-04-01', amount: 40000, overdue: true },
  { date: '2025-05-01', amount: 15000, overdue: false },
  { date: '2025-06-01', amount: 50000, overdue: true },
  { date: '2025-07-01', amount: 22000, overdue: false },
];

const T3TotalPending = () => {
  const [records, setRecords] = useState(initialPending);
  const [searchText, setSearchText] = useState('');
  const [overdueFilter, setOverdueFilter] = useState('all');

  const filtered = useMemo(() => {
    return records
      .filter((r) => {
        if (searchText) {
          const dt = dayjs(r.date).format('YYYY-MM-DD');
          return (
            dt.includes(searchText) ||
            r.amount.toString().includes(searchText)
          );
        }
        return true;
      })
      .filter((r) => {
        if (overdueFilter === 'yes') return r.overdue;
        if (overdueFilter === 'no') return !r.overdue;
        return true;
      });
  }, [records, searchText, overdueFilter]);

  const totalPending = useMemo(
    () => records.reduce((sum, r) => sum + r.amount, 0),
    [records]
  );
  const overdueCount = useMemo(
    () => records.filter((r) => r.overdue).length,
    [records]
  );

  const handleDelete = (idx) => {
    setRecords((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleEdit = (idx) => {
    alert('Edit placeholder for record ' + idx);
  };

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen font-interR">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-interSb bg-clip-text text-transparent bg-gradient-to-r from-bluecol to-purple-600 flex items-center gap-1">
              <AlertCircle size={24} /> Total Pending History
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Outstanding credits with overdue alerts. Search, filter, and manage entries below.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <input
                placeholder="Search date or amount"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 pr-3 py-2 border rounded-md text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-bluecol"
              />
              <Search className="absolute top-2 left-3 text-gray-400" size={16} />
            </div>
            <select
              value={overdueFilter}
              onChange={(e) => setOverdueFilter(e.target.value)}
              className="border px-3 py-2 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="yes">Overdue</option>
              <option value="no">Not Overdue</option>
            </select>
            <div className="flex gap-2">
              <CSVLink
                data={filtered.map((r) => ({
                  Date: dayjs(r.date).format('YYYY-MM-DD'),
                  Amount: r.amount,
                  Overdue: r.overdue ? 'Yes' : 'No',
                }))}
                filename="total-pending.csv"
                className="flex items-center gap-1 bg-bluecol text-white px-4 py-2 rounded-md text-sm"
              >
                <Download size={16} /> Export CSV
              </CSVLink>
              <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                <Download size={16} /> PDF
              </button>
              <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                JSON
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-customCard p-5 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="text-sm text-gray-500">Total Pending</div>
            <div className="text-xl font-interSb">₹{totalPending.toLocaleString()}</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Overdue Count</div>
            <div className="text-xl font-interSb">{overdueCount}</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Latest Entry</div>
            <div className="text-xl font-interSb">
              {records[records.length - 1]
                ? dayjs(records[records.length - 1].date).format('YYYY-MM-DD')
                : '—'}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-customCard p-5 overflow-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-interSb">Pending Records</h4>
          </div>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[#F6F8FA] text-gray-600">
              <tr>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-right px-4 py-2">Amount (₹)</th>
                <th className="text-center px-4 py-2">Overdue</th>
                <th className="text-center px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{dayjs(row.date).format('YYYY-MM-DD')}</td>
                  <td className="px-4 py-3 text-right">
                    ₹{row.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        row.overdue
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {row.overdue ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(idx)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Edit2 size={16} className="text-bluecol" />
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default T3TotalPending;
