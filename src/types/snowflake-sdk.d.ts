declare module 'snowflake-sdk' {
  export interface Snowflake {
    createConnection: (options: any) => any;
    execute: (options: any) => any;
  }

  export default {
    createConnection: (options: any) => ({
      connect: (callback: (err: any, conn: any) => void) => {},
      execute: (options: any) => {}
    })
  }
}
