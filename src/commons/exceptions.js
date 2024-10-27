class ServerError extends Error {
    constructor(msg, code = 500) {
        super(msg)
        this.name = 'ServerError'
        this.code = code
    }
}

class ClientError extends Error {
    constructor(msg, code = 400) {
        super(msg)
        this.name = 'ClientError'
        this.code = code
    }
}

export { ServerError, ClientError }