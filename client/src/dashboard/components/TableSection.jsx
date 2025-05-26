export default function TableSection({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto min-h-screen">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  )
}
