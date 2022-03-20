import List "mo:base/List";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
actor {
//    public type Message = Text;
   public type Message = {
       text: Text;
       time: Time.Time;
       author: Text;
   };

   public type Author = {
       authorName: Text;
   };


   public type Microblog = actor {
       follow: shared(Principal) -> async ();
       follows: shared query () -> async [Principal];
    //    follow: shared(Text) -> async ();
    //    follows: shared query () -> async [Text];
       post: shared (Text) -> async ();
       posts: shared query (Time.Time) -> async [Message];
    //    timeline : shared (Time.Time) -> async [Message];
    timeline : shared () -> async [Message];
       set_name: shared (Text) -> async ();
       get_name: shared query () -> async Text;
       currentAuthorTimeline : shared (Text) -> async [Message];
   };
   
   var authorName : Text = "";
   public shared func set_name(name: Text) : async () {
      authorName := name;
   };
   
    public shared func get_name() : async ?Text { 
       ?authorName;
   };

  var followed : List.List<Principal> = List.nil();
//  var followed : List.List<Text> = List.nil();


   public shared func follow(id: Principal) : async () {
    // public shared func follow(id: Text) : async () {
       followed := List.push(id, followed);
   };

   public shared query func follows() : async [Principal] {
    // public shared query func follows() : async [Text] {
      List.toArray(followed)  
   };

    var messages : List.List<Message> = List.nil();

   public shared (msg) func post(opt: Text, text: Text, author: Text) : async () {
       assert(opt == "123456");
       var information = {
            text = text;
            time = Time.now();
            author = author;
       };
    //    messages := List.push(text, messages)
     messages := List.push<Message>(information, messages);

   };

   public shared query func posts(since: Time.Time) : async [Message] {
        List.toArray(List.filter<Message>(messages, func({time}) = time >= since ));
        // List.toArray(messages)
   };

   public shared func timeline() : async [Message] {
       var all : List.List<Message> = List.nil();

       for (id in Iter.fromList(followed)) {
           let canister : Microblog = actor(Principal.toText(id));
        // let canister : Microblog = actor(id);
           let msgs = await canister.posts(1);
           for (msg in Iter.fromArray(msgs)) {
               all := List.push(msg, all)
           }
       };

       List.toArray(all);
   };

    public shared func currentAuthorTimeline(canisterId: Text) : async [Message] {
       var all : List.List<Message> = List.nil();

       for (id in Iter.fromList(followed)) {
           let canister : Microblog = actor(Principal.toText(id));
        // let canister : Microblog = actor(id);
        assert(canisterId == canister);
           let msgs = await canister.posts(1);
           for (msg in Iter.fromArray(msgs)) {
               all := List.push(msg, all)
           }
       };

       List.toArray(all);
   };

};
