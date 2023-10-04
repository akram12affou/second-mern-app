import { createContext,useReducer } from "react";

const initialState = {
    posts : []
};

export const PostContext = createContext(initialState);

const PostReducer = (state, action) => {
    switch (action.type) {
      case "ADD_POST":
        return {
           posts:[...posts , action.payload]
        };
      default:
        return state;
    }
};

export const PostContextProvider = ({children}) => {
 
const [state , dispatch] = useReducer(PostReducer,initialState);

    const value = {
            posts : state.posts ,
            dispatch
    }  

    return  <PostContext.Provider value={value}>
              {children}
            </PostContext.Provider>
}