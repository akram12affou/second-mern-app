import React, { useState }  from 'react'
import avatar from '../images/userAvatar.png'
import { useContext } from 'react'
import '../styles/UpdateUser.scss'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useCookies } from "react-cookie";
import { AuthContext } from '../Context/Authcontext'
function UpdateUser() {
     const navigate = useNavigate()
     const [updatePassword , setUpdatePassword] = useState(false)
     const [cookie , _] = useCookies(['accestoken'])
     const {user , dispatch , error} = useContext(AuthContext)
     const [userName , setUserName] = useState(user?.username || "")
     const [password, setPassword] = useState('')
     const [newPassword , setNewPassword] = useState('')
     const [newPasswordConfirm , setNewPasswordConfirm] = useState('')
     const handleEdit = () => {
        if(newPassword !== newPasswordConfirm){
            setError('password  not confirmed')
            return;
        }
        dispatch({type:'USER_UPDATE_START'});
        axios.put(`http://localhost:1258/auth/update-user`,{
             username: userName ,
             password : password,
             newPassword ,
        },{
            headers: {
              token: cookie.accestoken,
            },
          }).then(res => {
            
            dispatch({type:'USER_UPDATE_SUCCESS', payload : 
              res.data
            });
            navigate('/');
          }).catch(err => {
            dispatch({type:'USER_UPDATE_FAILED', payload :err.response.data.message});
          });
        
    };
  return (
    <div className='update-container'>
       <img  src={user?.image || avatar} alt="" />
       <code>change you profile picture :</code>
       <input  
          type="file"
          lable="Image"
          name="image"
          accept='.jpeg, .png, .jpg'
          />
       <label htmlFor="">username : </label>
       <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
       <label htmlFor="">password : </label>
       <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
       {/* <br />
       <button onClick={() => setUpdatePassword(!updatePassword)}>updatePassword</button> */}
       <br />
       {updatePassword &&
       <>
        <label htmlFor="">New password : </label>
       <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
       <br />
       <label htmlFor="">Confirm your new password : </label>
       <input type="text" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
       <br />
       </>
       }
        
      <button onClick={handleEdit}>update</button>
      <br />
      <span style={{'color' : 'red' , 'fontSize' : '0.9rem'}}>{error} </span>
    </div>
  )
}

export default UpdateUser