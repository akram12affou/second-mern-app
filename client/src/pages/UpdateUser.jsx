import React, { useState }  from 'react'
import avatar from '../images/userAvatar.png'
import { useContext } from 'react'
import '../styles/UpdateUser.scss'
import { useGetUserInfo } from "../hooks/getUserInfo";

import { useConvertToBase64 } from '../hooks/useConvertToBase64'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useCookies } from "react-cookie";
import { AuthContext } from '../Context/Authcontext'
function UpdateUser() {
     const userLS = useGetUserInfo();

     const navigate = useNavigate()
     const [image , setImage] = useState('')
     const [updatePassword , setUpdatePassword] = useState(false)
     const [cookie , _] = useCookies(['accestoken'])
     const {user ,loading, dispatch , error} = useContext(AuthContext)
     const [userName , setUserName] = useState(user?.username || "")
     const [password, setPassword] = useState('')
     const [newPassword , setNewPassword] = useState('')
     const [newPasswordConfirm , setNewPasswordConfirm] = useState('')
     const hanfleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await useConvertToBase64(file);
      setImage(base64)
    }
    const deleteProfileImage = async () => {
        axios.put('http://localhost:1258/auth//deleteProfileImage' , {} , { headers: {
        token: cookie.accestoken,
      }}).then(res => {
        dispatch({type:'USER_UPDATE_SUCCESS', payload : 
              res.data
            });
      })
    }
     const handleEdit = () => {
        if(newPassword !== newPasswordConfirm){
           dispatch({type:'USER_UPDATE_FAILED', payload :'password  not confirmed'});
           return;
        };
          dispatch({type:'USER_UPDATE_START'});
        axios.put(`http://localhost:1258/auth/update-user`,{
             username: userName ,
             password : password,
             newPassword ,
             updatePassword,
             image:image=='' ? user?.image : image
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
            dispatch({type:'USER_UPDATE_FAILED', payload :{err:err.response.data.message,user:userLS}});
          });
    };
  return (
    <div className='update-container'>
      {loading &&
       <h1>
          Loading ...
       </h1>
        }
        {!loading &&
        
        <>
      <img  src={user?.image || avatar} alt="" />
      <center> <svg
    width="27px"
    height="27px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    onClick={deleteProfileImage}
  >
    <title>{"ionicons-v5-e"}</title>
    <path
      d="M296,64H216a7.91,7.91,0,0,0-8,8V96h96V72A7.91,7.91,0,0,0,296,64Z"
      style={{
        fill: "none",
      }}
    />
    <path d="M432,96H336V72a40,40,0,0,0-40-40H216a40,40,0,0,0-40,40V96H80a16,16,0,0,0,0,32H97L116,432.92c1.42,26.85,22,47.08,48,47.08H348c26.13,0,46.3-19.78,48-47L415,128h17a16,16,0,0,0,0-32ZM192.57,416H192a16,16,0,0,1-16-15.43l-8-224a16,16,0,1,1,32-1.14l8,224A16,16,0,0,1,192.57,416ZM272,400a16,16,0,0,1-32,0V176a16,16,0,0,1,32,0ZM304,96H208V72a7.91,7.91,0,0,1,8-8h80a7.91,7.91,0,0,1,8,8Zm32,304.57A16,16,0,0,1,320,416h-.58A16,16,0,0,1,304,399.43l8-224a16,16,0,1,1,32,1.14Z" />
  </svg></center>
   
       <code>change you profile picture :</code>
       <input  
          type="file"
          lable="Image"
          name="image"
          accept='.jpeg, .png, .jpg'
          onChange={hanfleFileUpload}
          />
       <label htmlFor="">username : </label>
       <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
       <label htmlFor="">password : </label>
       <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
       <br />
       <button onClick={() => setUpdatePassword(!updatePassword)}>updatePassword</button> 
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
        </>
      
        }

    </div>
  )
}

export default UpdateUser