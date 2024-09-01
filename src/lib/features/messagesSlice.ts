// lib/features/messages/messagesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageNotification {
  name: string;
  count: number;
  message: string;
}

interface MessagesState {
  notifications: MessageNotification[];
}

const initialState: MessagesState = {
  notifications: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageNotification: (state, action: PayloadAction<{ name: string; count: number }>) => {
      const { name, count } = action.payload;
      const existingNotification = state.notifications.find(notif => notif.name === name);

      if (existingNotification) {
        existingNotification.count += count;
        existingNotification.message = `${name} sent you a new message`;
      } else {
        state.notifications.push({
          name,
          count,
          message: `${name} sent you a new message`,
        });
      }
    },
    clearMessageNotifications: (state, action: PayloadAction<{ name: string }>) => {
      state.notifications = state.notifications.filter(notif => notif.name !== action.payload.name);
    },
    resetNotificationCount: (state, action: PayloadAction<{ name: string }>) => {
      const existingNotification = state.notifications.find(notif => notif.name === action.payload.name);
      if (existingNotification) {
        existingNotification.count = 0;
      }
    },
  },
});

export const { addMessageNotification, clearMessageNotifications, resetNotificationCount } = messagesSlice.actions;
export default messagesSlice.reducer;
