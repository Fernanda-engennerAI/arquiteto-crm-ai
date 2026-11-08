// Erro de aplicação com status HTTP e código estável.
// O código é o que o front-end usa para decidir o que mostrar.
export class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
