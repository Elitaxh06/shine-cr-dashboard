import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    socios: []
}

const partnerSlice = createSlice(
    {
        name: "DatosPartnerRedux",
        initialState,
        reducers:{
            setPartner: (state, action) => {
                state.socios = action.payload
            }
        }
    }
)

export const { setPartner } = partnerSlice.actions
export default partnerSlice.reducer