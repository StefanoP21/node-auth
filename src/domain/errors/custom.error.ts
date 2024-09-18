export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  static unauthorized(message: string): CustomError {
    return new CustomError(401, message);
  }

  static forbidden(message: string): CustomError {
    return new CustomError(403, message);
  }

  static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  static conflict(message: string): CustomError {
    return new CustomError(409, message);
  }

  static internal(message: string): CustomError {
    return new CustomError(500, message);
  }

  static serviceUnavailable(message: string): CustomError {
    return new CustomError(503, message);
  }

  static custom(statusCode: number, message: string): CustomError {
    return new CustomError(statusCode, message);
  }
}
