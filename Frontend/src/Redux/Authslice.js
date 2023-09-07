import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  token:localStorage.getItem('token')?? ''
  
};

export const Authslice = createSlice({
    name: 'auth',
    initialState, // Corrected from 'initialstate'
    reducers: {
      setLogin: (state, action) => {
        state.token = action.payload.userToken;
        localStorage.setItem('token',action.payload.userToken)
      },
      setLogout: (state) => {
        state.token = null;
        localStorage.removeItem('token')
      },
    
  
  
    }
  });
  
  export const { setLogin, setLogout} = Authslice.actions;
  export default Authslice.reducer;
  