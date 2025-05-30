import { Edit, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfoThunk, updateUserPasswordThunk } from '../../actions/users'
import { clearSuccessError } from '../../reducers/users/authSlice'

const Settings = () => {
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const { user, loading, success, error,ploading, psuccess, perror } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    idno: '',
    position: '',
  })

  const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const handlePasswordChange = (e) => {
  const { name, value } = e.target
  setPasswords((prev) => ({
    ...prev,
    [name]: value,
  }))
}


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserInfoThunk(formData))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handlePasswordUpdate = (e)=>{
 
    e.preventDefault()
    dispatch(updateUserPasswordThunk(passwords))
 
  }



  useEffect(() => {
    if (user) {
      const dob = user.dob ? new Date(user.dob).toISOString().split('T')[0] : ''
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob,
        idno: user.idno || '',
        position: user.position || '',
      })
    }
  }, [user])



  useEffect(()=>{
      if(perror || psuccess){
        const timeout = setTimeout(()=>{
          dispatch(clearSuccessError())
        },4000)
        console.log(perror)
        return ()=> clearTimeout(timeout)
      }
  },[perror,psuccess])

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <button
          className={`btn flex items-center ${edit ? 'bg-red-600' : 'bg-purple-500'} rounded px-2 py-2 text-white`}
          onClick={() => setEdit((prev) => !prev)}
        >
          {edit ? <span>Cancel</span> : <><Edit className="w-4 h-4 mr-1" /><span>Edit</span></>}
        </button>
      </div>

      <div className="p-6 space-y-3">
        {error && <div className="border border-red-500 bg-red-50 text-sm py-2 px-3 rounded">{error}</div>}
        {loading && <div className="bg-blue-500 text-white inline-block p-2 rounded">Saving...</div>}
        {success && <div className="border border-green-500 bg-green-50 text-sm py-2 px-3 rounded capitalize">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter fullnames....' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'Enter email address....' },
              { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'Enter phone number....' },
              { label: 'Date of Birth', name: 'dob', type: 'date' },
              { label: 'ID Number', name: 'idno', type: 'text', placeholder: 'Enter your ID number' },
              { label: 'Position', name: 'position', type: 'text', placeholder: 'Enter your position' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="label">{label}</label>
                <input
                  className={`input text-sm text-gray-600 ${!edit && 'bg-gray-200'}`}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  disabled={!edit}
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={!edit}
              className={`btn flex items-center justify-center w-full lg:w-64 ${
                edit ? 'bg-primary text-purple-600 hover:text-purple-700' : 'bg-gray-200 text-gray-600'
              }`}
            >
              <Save className="w-4 h-4 mr-1" />
              <span>{loading ? 'Processing...' : 'UPDATE'}</span>
            </button>
          </div>
        </form>
      </div>

    

    <div className="p-6 mt-10 border-t border-red-200">
  <h2 className="text-lg font-semibold text-red-600 mb-4 uppercase">Change Password</h2>
  <form onSubmit={handlePasswordUpdate}>
    
    {
      psuccess && <div className='success'>{psuccess}</div>
    }
    { 
      perror && <div className='error'>{perror}</div>
    }
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="label">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          className="input text-sm text-gray-600"
          placeholder="Enter current password"
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label className="label">New Password</label>
        <input
          type="password"
          name="newPassword"
          className="input text-sm text-gray-600"
          placeholder="Enter new password"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label className="label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input text-sm text-gray-600"
          placeholder="Confirm new password"
          value={passwords.confirmPassword}
          onChange={handlePasswordChange}
        />
      </div>
    </div>

    <div className="mt-6">
      <button
        type="submit"
        className="btn w-full lg:w-64 bg-red-600 text-white hover:bg-red-700"
      >
        {ploading ? "Updating...":"Update Password"}
      </button>
    </div>
  </form>
</div>




    </div>
  )
}

export default Settings
