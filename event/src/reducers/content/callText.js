const initialState = {
  functionCall: false,
  functionValue: '',
  operationHash: '',
  functionType: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CALL_FUNCTION':
      console.log("IN SAVE_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);
      return {
        ...state,
        functionCall: true,
        functionValue: action.state.functionValue,
        functionType: action.state.functionType,
      }

    case 'FUNCTION_CALLED':
      console.log("IN SAVE_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);
      return {
        ...state,
        functionCall: false,
        operationHash: action.state.operationId,
        functionValue: '',
        functionType: '',
      }

    case 'REFRESH_OPERATION':
      console.log("IN SAVE_ACCOUNT");
      console.log("PAYLOAD", action);
      console.log("STATE", state);
      return {
        ...state,
        functionCall: false,
        functionValue: '',
        operationHash: '',
        functionType: '',
      }

    default:
      return state;
  }
}