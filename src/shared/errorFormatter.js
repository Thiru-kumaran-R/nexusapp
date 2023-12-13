export function getAxiosErrorMessage(error){
    // console.error(error)
    //console.log(error.code)
    let errorMessage = 'An error occurred';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || 'Server responded with an error';
    } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server';
    } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
    }

    return errorMessage;
}