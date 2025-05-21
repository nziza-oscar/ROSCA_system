export default function TransactionsTable() {
  // Sample data - in a real app, this would come from an API or props
  const transactions = [
    { id: 1, user: "John Doe", amount: 1200, date: "2023-05-15", status: "Completed" },
    { id: 2, user: "Jane Smith", amount: 8500, date: "2023-05-14", status: "Pending" },
    { id: 3, user: "Robert Johnson", amount: 2000, date: "2023-05-13", status: "Completed" },
    { id: 4, user: "Emily Davis", amount: 5000, date: "2023-05-12", status: "Failed" },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="">Names</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.amount.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
