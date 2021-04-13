module.exports = {
    EMAIL: new RegExp(/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/),
    PASSWORD: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,}$/),
    PHONE: new RegExp(/^[\d+()-]*$/),
    NAME: new RegExp(/^[a-zA-Z]+$/),
};
