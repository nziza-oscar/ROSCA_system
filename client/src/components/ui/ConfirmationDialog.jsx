export default function ConfirmationDialog({ message, onConfirm, onCancel,id }) {


    return (
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/20">
        <div className="bg-slate-600 p-6 rounded shadow">
          <p className="text-md mb-4 text-white">{message}</p>
          <div className="flex justify-end space-x-2">
            <button
              className="btn bg-red-600 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="btn px-4 py-2 bg-primary text-white rounded-lg"
              onClick={()=>onConfirm(id)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }