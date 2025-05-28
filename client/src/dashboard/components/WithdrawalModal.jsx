import { X } from 'lucide-react';
import { useState } from 'react';

const WithdrawalFormModal = ({loading, success,error, isOpen, onClose, onSubmit,user }) => {
  const [formData, setFormData] = useState({
    amount: '',
    proof: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
   if(success){
     setFormData({
      amount: '',
      proof: ''
    });
    onClose();
   }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-72 flex items-center justify-center bg-black/30 ">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative mx-2">
        <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-2">
             <h2 className="text-xl font-semibold uppercase">withdrawal</h2>
            <button onClick={onClose} className="btn bg-red-500 self-center text-gray-500 hover:text-red-500">
                <X size={14}/>
            </button>
        
        </div>
        {
            user.balance == 0 ? <div className='bg-red-100 py-6 flex items-center justify-center font-bold'>
                <h4>You have Insufficient Amount ({user.balance}FRW)</h4>
            </div>  : (
                <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>

          {success && <div className='success text-xs'>{success}</div>}
          {error && <div className='error text-xs'>{error}</div>}
        


            <div className="flex gap-2">
                <div className='w-full'>
                    <label className='label'>Account Name: </label>
                    <input type='text' name='client_name' readOnly value={user.user.name} className='input text-xs bg-gray-100'/>
                </div>
                <div className='w-full'>
                    <label className='label'>Account Phone: </label>
                    <input type='text' name='client_name' readOnly value={user.user.phone} className='input text-xs bg-gray-100'/>
                </div>

            </div>

         <div>
            <label className="label">Account Balance</label>
            <input
              type="number"
              name="amount"
              value={user.balance}
              readOnly
              className="input text-xs bg-gray-100"
            />
          </div>

          <div>
            <label className="label">Amount money</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min={1000}
              max={user.balance}
              required
              className="input text-xs "
              placeholder='amount to withdraw...'
            />
          </div>

         

          <div>
            <label className="label">Proof URL</label>
            <input
              type="file"
              name="proof"
              onChange={(e)=> setFormData({...formData, proof: e.currentTarget.files[0]})}
              className="input text-xs"
            />
          </div>

          


          <button disabled={loading} type="submit" className="btn w-full text-white py-2 rounded bg-navy-900">
            {loading ? "Processing..":"Withdrawal"}
          </button>
        </form>
            )
        }
      </div>
    </div>
  );
};

export default WithdrawalFormModal;
