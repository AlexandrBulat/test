export default class ApiError extends Error {
    readonly code: number
    constructor(code: number, message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ApiError.name;

        this.code = code;
    }
}