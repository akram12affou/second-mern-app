import { createContext,useReducer } from "react";
import { useGetUserInfo } from "../hooks/getUserInfo";
import { useEffect } from "react";
const user = useGetUserInfo();

const initialState = {
    loading : false,
    error : null,
    user : JSON.parse(user) || null
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
            loading : true,
            error : null,
            user : null
        };
      case "LOGIN_SUCCES":
        return {
            loading : false,
            error : null,
            user : action.payload
        };
      case "LOGIN_FAILED":
          return{
            loading : false,
            error : action.payload,
            user : null
          }
      case "LOGOUT":
        window.localStorage.removeItem('user')
        return{
            loading : false,
            error : null,
            user : null
        }
      case "USER_UPDATE_SUCCESS":
        return{
            loading : false,
            error : null,
            user : action.payload
        }
      case "USER_UPDATE_START":
        return{
            loading : true,
            error : null,
            user : null
        }
      case 'USER_UPDATE_FAILED':
        return{
          loading : false,
          error : action.payload.err,
          user :  JSON.parse(action.payload.user)
      }
      default:
        return state;
    }
  };

export const AuthContextProvider = ({children}) => {
 
const [state , dispatch] = useReducer(AuthReducer,initialState);

  useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
  },[state.user]);

    const value = {
            loading : state.loading ,
            user : state.user ,
            error : state.error ,
            dispatch
    }  

    return  <AuthContext.Provider value={value}>
              {children}
            </AuthContext.Provider>
}