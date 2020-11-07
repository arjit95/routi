export type Reply = {
  status?: number;
  message?: Buffer | string | Record<string, unknown>;
  headers?: { [key: string]: string };
};
