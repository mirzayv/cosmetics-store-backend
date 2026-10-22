import "express-session";
export interface T {
  [key: string]: any;
}
declare module "express-session" {
  interface SessionData {
    member: any;
  }
}

/* export function test() {} */
