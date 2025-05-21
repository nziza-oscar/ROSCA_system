export default function ActivitiesTable() {
  // Sample data - in a real app, this would come from an API or props
  const activities = [
    { id: 1, user: "John Doe", action: "Created a new account", time: "2 hours ago" },
    { id: 2, user: "Admin", action: "Updated system settings", time: "5 hours ago" },
    { id: 3, user: "Jane Smith", action: "Made a deposit", time: "1 day ago" },
    { id: 4, user: "Robert Johnson", action: "Updated profile", time: "2 days ago" },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Names</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td className="px-6 py-4 whitespace-nowrap">{activity.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{activity.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
