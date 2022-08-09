const getPostId = () =>{
    const urlParams = new URLSearchParams(location.search);

    const id = urlParams.get('id');

    return id;
}


//---------------------------------------------------------------------------------


const loadPost = async(id)=>{
    const response = await fetch(`http://localhost:3000/vehicles/${id}`);
    const data = await response.json();

    const containerPostElement = document.getElementById('container-post');

    const postElement = createPostElement(data);

    containerPostElement.append(postElement);
}

const createPostElement = (element) =>{
    const template = document.getElementById('post-template');

    const postElement = document.importNode(template.content, true);

    const postItems = postElement.querySelectorAll('span');

    loadTitle(element.model);

    postItems[0].innerText = element.id;
    postItems[1].innerText = element.userId;
    postItems[2].innerText = element.model;
    postItems[3].innerText = element.year;
    postItems[4].innerText = element.engine;
    postItems[5].innerText = element.gear;
    postItems[6].innerText = element.onSale;
    postItems[7].innerText = element.rent;
    postItems[8].innerText = element.value;

    if(element.userId == sessionId){

        const deleteBtn = postElement.getElementById('btn-delete-post');

        deleteBtn.hidden = false;
    }

    return postElement;
}


//------------------------------------------------------------------------


const loadTitle = (title) =>{
    const postTitle = document.getElementById('post-title');
    const postTitleHead = document.getElementById('post-title-head');

    postTitle.innerHTML = title;
    postTitleHead.innerHTML = title;
}

const getSessionId = async () =>{
    const response = await fetch('http://localhost:3000/auth/get');

    const data = await response.json();

    const sessionId = data.id;

    return sessionId;
}


//-----------------------------------------------------------------------------------


const loadLikeState = async (id)=>{

    const response = await fetch(`http://localhost:3000/likes/${id}`);

    const data = await response.json();
    console.log(id);
    console.log(data.state);

    const postLike = document.getElementById('btn-like');

    
    postLike.disabled = false;
    
    if(data.state){
        postLike.innerHTML = "Like";
    }else{
        postLike.innerHTML = "Unlike";
    }

}




//--------------------------------------------------------------------------------


const loadComments = async (id) => {
    const response = await fetch(`http://localhost:3000/comments/${id}`);
    const datas = await response.json();

    datas.forEach(element => {
        const containerCommentsElement = document.getElementById('container-comments');

        const commentElement = createCommentElement(element);

        containerCommentsElement.append(commentElement);
    })

    

}

const createCommentElement = (element) =>{
    const template = document.getElementById('comment-template');

    const commentElement = document.importNode(template.content, true);

    const commentItems = commentElement.querySelectorAll('span');

    commentItems[0].innerHTML = element.id;
    commentItems[1].innerHTML = element.userId;
    commentItems[2].innerHTML = element.text;

    if(element.userId == sessionId){
        const deleteBtn = commentElement.getElementById('btn-delete-comment');

        deleteBtn.hidden = false; 
    }

    return commentElement;
}

const postComment = async () =>{
    const id = getPostId();

    const commentContentElement = document.getElementById('comment-content');

    const comment = {
        vehicleId: id,
        text: commentContentElement.value
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(comment)
    }

    const response = await fetch(`http://localhost:3000/comments/`, init);
    const data = await response.json();

    console.log(data)
}


//----------------------------------------------------------------------------------------


let sessionId;

window.onload= async () =>{
    sessionId = await getSessionId();

    const id = getPostId();

    loadPost(id);
    loadLikeState(id);
    loadComments(id);

    const btnAddComment = document.getElementById('btn-add-comment');
    btnAddComment.onclick = postComment;
}

