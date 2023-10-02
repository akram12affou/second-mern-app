import React, { useState }  from 'react'
import avatar from '../images/userAvatar.png'
import { useContext } from 'react'
import '../styles/UpdateUser.scss'
import { AuthContext } from '../Context/Authcontext'
function UpdateUser() {
     const {user} = useContext(AuthContext)
     const [userName , setUserName] = useState(user.username)
     const [password, setPassword] = useState('')
     const [newPassword , setNewPassword] = useState('')
     const [newPasswordConfirm , setNewPasswordConfirm] = useState('')
     const [error , setError] = useState('f')
    const handleEdit = () => {
        console.log(userName);
        console.log(password);
        console.log(newPassword);
        console.log(newPasswordConfirm)
    }
  return (
    <div className='update-container'>
       <img  src={user.image || avatar} alt="" />
       <label htmlFor="">username : </label>
       <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
       <label htmlFor="">password : </label>
       <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
       <br />
       <label htmlFor="">New password : </label>
       <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
       <br />
       <label htmlFor="">Confirm your password : </label>
       <input type="text" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
       <br />
       <span style={{'color' : 'red'}}>{error}</span>
      <button onClick={handleEdit}>update</button>
    </div>
  )
}

export default UpdateUser