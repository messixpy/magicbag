const ErrorToast = (toast, message) => 

toast({
    title: 'Error',
    description: message || 'an error occured',
    status: 'error',
    position: 'top',
    duration: 4000,
    isClosable: true,
}

)



export default ErrorToast