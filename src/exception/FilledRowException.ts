class FilledRowException extends Error {
    constructor(message: string) {
        super('FilledRowException: ' + message)
    }
}


export default FilledRowException