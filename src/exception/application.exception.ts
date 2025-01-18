import { ErrorMessages } from '../common/enums/error.messages';
import { HttpStatus } from '../common/enums/http.status';
import { ErrorCodes } from '../common/enums/error.codes';

export class ApplicationException extends Error {
    code?: ErrorCodes;
    status?: HttpStatus;

    constructor(status: HttpStatus, message?: string, code?: ErrorCodes) {
        super(message || ErrorMessages.UnknownApplicationError);
        this.code = code || ErrorCodes.BAD_REQUEST;
        this.status = status;
    }

    public static badRequest(message: string = ErrorMessages.BadRequest): ApplicationException {
        return new ApplicationException(HttpStatus.BadRequest, message, ErrorCodes.BAD_REQUEST);
    }

    public static serverSideError(message?: string): ApplicationException {
        return new ApplicationException(HttpStatus.IternalServerError, message, ErrorCodes.SERVER_SIDE_ERROR);
    }

    public static wrapError(error?: Error): ApplicationException {
        if (error instanceof ApplicationException) {
            return error;
        }

        return ApplicationException.serverSideError(error?.message);
    }
}
