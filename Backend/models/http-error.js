class HttpError extends Error {
    constructor(message, errcode) {
        super(message); //Add a message property
        this.code = errcode;
    }
}

module.exports = HttpError;