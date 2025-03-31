import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/app/_type/user'

interface UserState {
    user: User | null;
  }
  
  // Define the initial state using that type
  const initialState: UserState = {
    user: null,
  }
  
  export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            console.log(action.payload)
        }     
    },
  })
  
  export const { setUserDetails } = userSlice.actions
  
  export default userSlice.reducer;

  