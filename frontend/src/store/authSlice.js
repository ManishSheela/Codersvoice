import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
      isAuth: false,
      user: null,
      otp: {
          phone: "",
          hash : ""
      }
  },
  reducers: {
    setAuth: (state,action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      },
      setOtp: (state, action) => {
          const { phone, hash } = action.payload;
          state.otp.phone = phone;
           state.otp.hash = hash;
        
      }
  },
});
export const { setAuth,setOtp} = authSlice.actions;

export default authSlice.reducer;
