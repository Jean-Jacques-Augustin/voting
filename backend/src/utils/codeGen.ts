const generateVerificationCode = () => {
    const min = 100000; // Minimum value (inclusif)
    const max = 999999; // Maximum value (inclusif)
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default generateVerificationCode;