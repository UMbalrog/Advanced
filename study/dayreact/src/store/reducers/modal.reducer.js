import { SHOWMODAL, HIDEMODAL } from "../const/modal.const";

const initState = {
  show: false
}

export default (state = initState, action) => {
  switch(action.type){
    case SHOWMODAL:
      return {
        ...state,
        show: true
      };
    case HIDEMODAL:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}