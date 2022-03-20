import type { Principal } from '@dfinity/principal';
export interface Message { 'msg' : string, 'time' : Time, 'author' : string }
export type Time = bigint;
export interface _SERVICE {
  'currentAuthorTimeline' : (arg_0: string) => Promise<Array<Message>>,
  'follow' : (arg_0: string) => Promise<undefined>,
  'follows' : () => Promise<Array<string>>,
  'get_name' : () => Promise<[] | [string]>,
  'post' : (arg_0: string, arg_1: string, arg_2: string) => Promise<undefined>,
  'posts' : (arg_0: Time) => Promise<Array<Message>>,
  'set_name' : (arg_0: string) => Promise<undefined>,
  'timeline' : () => Promise<Array<Message>>,
}
