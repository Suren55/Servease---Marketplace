import { createSelector } from "reselect";

const initialState = {
  shown: false,
  type: "",
  title: "",
  message: "",
  options: {
    variant: "filled",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
  },
};

export const SHOW_NOTIFICATION = "@notification/SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "@notification/HIDE_NOTIFICATION";

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        shown: true,
        message: action.payload.message,
        title: action.payload.title,
        type: action.payload.type,
        options: {
          ...state.options,
          ...action.payload.options,
        },
      };
    case HIDE_NOTIFICATION:
      return { ...state, shown: false, message: "" };
    default:
      return state;
  }
};

// actions

export const showCustomNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload,
});

export const showErrorNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload: { ...payload, type: "error", title: "Error" },
});

export const showSuccessNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload: { ...payload, type: "success", title: "Success" },
});

export const showInfoNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload: { ...payload, type: "info", title: "Info" },
});

export const showWarningNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload: { ...payload, type: "warning", title: "Warning" },
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

// selectors

const selectNotificationsState = (state) => {
  return state.notifications;
};

export const selectIsShown = createSelector(selectNotificationsState, (state) => state.shown);
export const selectOptions = createSelector(selectNotificationsState, (state) => state.options);
export const selectTitle = createSelector(selectNotificationsState, (state) => state.title);
export const selectType = createSelector(selectNotificationsState, (state) => state.type);
export const selectMessage = createSelector(selectNotificationsState, (state) => state.message);

export default notificationsReducer;
