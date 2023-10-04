import { createContext,useReducer } from "react";

const initialState = {
    posts : [],
    savedPosts:[]
};

export const PostContext = createContext(initialState);

const PostReducer = (state, action) => {
    switch (action.type) {
      case "UPLOAD":
        return {
           posts : action.payload,
           savedPosts: state.savedPosts
        };
      case "UPLOAD_SAVED_POSTS":
        return {
          savedPosts : action.payload,
          posts : state.posts
        };
      case "ADD_POST":
        return {
           posts:[...state.posts , action.payload]
        };
      case "DELETE_POST":         
        return {
           posts:state.posts.filter(e =>{return action.payload !== e._id})
        };
      case "DELETE_SAVED_POST":   
        return {
          savedPosts : state.savedPosts.filter(e =>{return action.payload !== e._id}),
          posts : state.posts   
        };
      default:
        return state;
    }
};

export const PostContextProvider = ({children}) => {
 
const [state , dispatch] = useReducer(PostReducer,initialState);

    const value = {
            posts : state.posts ,
            savedPosts : state.savedPosts,
            dispatch
    }  

    return  <PostContext.Provider value={value}>
              {children}
            </PostContext.Provider>
}