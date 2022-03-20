export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Message = IDL.Record({
    'msg' : IDL.Text,
    'time' : Time,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'currentAuthorTimeline' : IDL.Func([IDL.Text], [IDL.Vec(Message)], []),
    'follow' : IDL.Func([IDL.Text], [], []),
    'follows' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'get_name' : IDL.Func([], [IDL.Opt(IDL.Text)], []),
    'post' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'posts' : IDL.Func([Time], [IDL.Vec(Message)], ['query']),
    'set_name' : IDL.Func([IDL.Text], [], []),
    'timeline' : IDL.Func([], [IDL.Vec(Message)], []),
  });
};
export const init = ({ IDL }) => { return []; };
