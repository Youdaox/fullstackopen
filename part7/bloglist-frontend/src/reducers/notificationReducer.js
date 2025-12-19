import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

export const addNotification = (message, time, type) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
