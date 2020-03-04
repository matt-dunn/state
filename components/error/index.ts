export type ErrorLike = {
    message: string;
    name?: string;
    code?: string;
    status?: number;
}

export const errorLike = (error: ErrorLike & {[index: string]: any}): ErrorLike => {
  const { stack, ...rest } = Object.getOwnPropertyNames(error).reduce((o: any, key: string) => ({ // eslint-disable-line @typescript-eslint/no-unused-vars
    [key]: error[key],
    ...o,
  }), {});

  return rest;
};
