import { SHOWMODAL, HIDEMODAL } from "../const/modal.const";

export const show = () => ({type: SHOWMODAL});
export const hide = () => ({type: HIDEMODAL});

export const show_async = () => dispatch => {
  setTimeout(() => {
    dispatch(show())
  },2000)
};