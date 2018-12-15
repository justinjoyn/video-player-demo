export const actionCreator = type => payload => ({ type, payload });

//Handle API responses
export const handleResponse = (response, successHandler, failureHandler) => {
  if (response.status === 200) {
    return successHandler(response.data);
  } else {
    return failureHandler(response);
  }
};
