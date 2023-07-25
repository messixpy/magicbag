const SuccessToast = (toast, message) => {
    toast({
        title: 'Success',
        description: message || 'Success',
        status: 'success',
        position: 'top',
        duration: 4000,
        isClosable: true,
    })
}

export default SuccessToast