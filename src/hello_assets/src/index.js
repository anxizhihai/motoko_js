// import { hello } from "../../declarations/hello";

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await hello.greet(name);
//   // hello.greet(name).then(res => {

//   //   button.removeAttribute("disabled");

//   // document.getElementById("greeting").innerText = res;

//   // return false;
    
//   // })

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });

import { hello } from "../../declarations/hello";

async function post() {
  let post_button = document.getElementById("post");
  let error = document.getElementById("error");
  error.innerHTML = "";
  post_button.disabled = true;
  let textarea = document.getElementById("message");
  let otp = document.getElementById("otp").value;
  let text = textarea.value;
  // author
  let authorName = document.getElementById("author").value;
  await hello.set_name(authorName);


  try {
    let author = await hello.get_name();
    console.log(author)
    await hello.post(otp, text, author[0]);
    textarea.value = "";
  } catch (error) {
    console.log(error)
    error.innerHTML = "Post Failed!";
  }
  
  post_button.disabled = false;
}

// getName
async function getNameEvent() {
  let author = await hello.get_name();
  console.log(author)
  document.getElementById("showName").innerHTML = author[0];
  
}

var num_posts = 0;
async function load_posts() {
  let posts_section = document.getElementById("posts");
  
  let posts = await hello.posts(1);
  if (num_posts == posts.length) return;
  posts_section.replaceChildren([]);
  num_posts = posts.length;
  console.log(posts)

  var str = "";
  for (var i = 0; i < posts.length; i++) {
    str += '<div class="message-box"  id="btn_' + i + '">' +

     '<div class="introduce"    >' + (i+1) + ')：' + posts[i].text + '</div>' +
     '<span>Author: ' + posts[i].author + '</span>' + 

     '<span>Time: ' + posts[i].time + '</span>' + 

     '</div>'

  }
  posts_section.innerHTML = str;


  // for (var i=0; i < posts.length; i++) {
  //   let post = document.createElement("p");
  //   post.innerText = `Message: ${posts[i].text} Author：${posts[i].author} Time: ${posts[i].time}` 
  //   posts_section.appendChild(post)
  // }
}

function getLocalTime(nS) {  
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');  
 }

var author_num_posts = 0;
// 获取关注的作者列表 followd
async function follow_posts() {
  let followd_section = document.getElementById("followd");
  
  let posts = await hello.follows();
  
  // console.log(posts)

  if (author_num_posts == posts.length) return;

  followd_section.replaceChildren([]);
  author_num_posts = posts.length;
  console.log(posts)

  var str = "";
  for (var i = 0; i < posts.length; i++) {
    str += '<div class = "followd-author-box" id="btn_' + i + '">' +

     '<p class="introduce"    >' + (i+1) + ')：' + posts[i] + '</p>' +

     '</div>'

  }
  followd_section.innerHTML = str;

  for (var i=0; i<posts.length; i++) {
    var btnName = '#btn_' + i;
    $('#followd').on("click", `${btnName}`, function (e) {
      console.log(e.target.innerText)
      followAutherCurrentMessage(e.target.innerText)
      
    })
}

}


var author_ollow_num_posts = 0;
async function followAuther() {
  let authorName = document.getElementById("show_author_message").value;
  let followd_section = document.getElementById('followd_message_lsit');
 let messageList = await hello.currentAuthorTimeline(authorName);

// let messageList = await hello.currentAuthorTimeline(authorName);

//  console.log(messageList)

//  followd_message_lsit

 if (author_ollow_num_posts == messageList.length) return;

  followd_section.replaceChildren([]);
  author_ollow_num_posts = messageList.length;
  console.log(messageList)

  var str = "";
  for (var i = 0; i < messageList.length; i++) {
    str += '<div  class="message-box" id="btn_' + i + '">' +

     '<div class="introduce"    >' + (i+1) + ')：' + messageList[i].text + '</div>' +
     '<span>Author: ' + messageList[i].author + '</span>' + 

     '<span>Time: ' + messageList[i].time + '</span>' + 

     '</div>'

  }
  followd_section.innerHTML = str;


  // for (var i=0; i < messageList.length; i++) {
  //   let post = document.createElement("p");
  //   post.innerText = `Message: ${messageList[i].text} Author: ${messageList[i].author} Time: ${messageList[i].time}` 
  //   followd_section.appendChild(post)
  // }

}


// 点击关注作者事件 author_Principal
var author_ollow_num_posts_1 = 0;
async function followAutherCurrentMessage(authorName) {
  let followd_section = document.getElementById('CurrentClickMessage');
let messageList = await hello.currentAuthorTimeline(authorName);

 if (author_ollow_num_posts_1 == messageList.length) return;

  followd_section.replaceChildren([]);
  author_ollow_num_posts_1 = messageList.length;
  console.log(messageList)

  var str = "";
  for (var i = 0; i < messageList.length; i++) {
    str += '<div  class="message-box" id="btn_' + i + '">' +

     '<div class="introduce"    >' + (i+1) + ')：' + messageList[i].text + '</div>' +
     '<span>Author: ' + messageList[i].author + '</span>' + 

     '<span>Time: ' + messageList[i].time + '</span>' + 

     '</div>'

  }
  followd_section.innerHTML = str;


  // for (var i=0; i < messageList.length; i++) {
  //   let post = document.createElement("p");
  //   post.innerText = `Message: ${messageList[i].text} Author: ${messageList[i].author} Time: ${messageList[i].time}` 
  //   followd_section.appendChild(post)
  // }

}




// 展示所有关注的作者的消息列表
var author__messge_num_posts = 0;
async function showAuthorMessage() {
  let followd_section = document.getElementById("followd_message");

  let messageList = await hello.timeline();

  
  console.log(messageList)

  if (author__messge_num_posts == messageList.length) return;

  followd_section.replaceChildren([]);
  author__messge_num_posts = messageList.length;
  console.log(messageList)

  var str = "";
  for (var i = 0; i < messageList.length; i++) {
    str += '<div class="message-box"  id="btn_' + i + '">' +

     '<div class="introduce"    >' + (i+1) + ')：' + messageList[i].text + '</div>' +
     '<span>Author: ' + messageList[i].author + '</span>' + 

     '<span>Time: ' + messageList[i].time + '</span>' + 

     '</div>'

  }
  followd_section.innerHTML = str;




  // for (var i = 0; i < messageList.length; i++) {
  //   let post = document.createElement("p");
  //   post.innerText = `Message: ${messageList[i].text} Author: ${messageList[i].author} Time: ${messageList[i].time}` 
  //   followd_section.appendChild(post)
  // }
}


function load () {
  let post_button = document.getElementById("post");
  post_button.onclick = post;

  let getName = document.getElementById("getName");
  getName.onclick = getNameEvent;
  
  let follow = document.getElementById("showAuthorMessage");
  follow.onclick = followAuther;

  // 点击查询作者的message showAuthorMessage
  // let showAuthorM = document.getElementById("showAuthorMessage");
  // showAuthorM.onclick = showAuthorMessage;


  setInterval(() => {
    showAuthorMessage();
  }, 3000);
  
  setInterval(() => {
    follow_posts();
  }, 3000);
   

  load_posts();
  setInterval(load_posts, 3000)
}

window.onload = load;