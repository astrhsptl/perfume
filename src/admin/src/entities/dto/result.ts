export class Result<T> {
  private error: string | null = null;
  private success: string | null = null;
  private data: T | null = null;

  setResult(value: T, success: string) {
    this.data = value;
    this.success = success;
    return this;
  }

  setError(error: string) {
    this.data = null;
    this.error = error;
    return this;
  }

  get result(): {
    data: T | null;
    comment: string;
  } {
    if (!this.data) {
      return {
        data: null,
        comment: <string>this.error,
      };
    }

    return {
      data: this.data,
      comment: <string>this.success,
    };
  }

  get isError(): boolean {
    return this.error !== null;
  }
}
