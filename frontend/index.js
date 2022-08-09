const loadPosts = async()=>{
    const response = await fetch('http://localhost:3000/vehicles');
    const datas = await response.json();

    datas.forEach(element => {
        const containerPostsElement = document.getElementById('container-posts');

        const postElement = createPostElement(element);

        containerPostsElement.append(postElement);
    });
}

const createPostElement = (element) =>{
    const template = document.getElementById('post-view-template');

    const postElement = document.importNode(template.content, true);

    const postItems = postElement.querySelectorAll('span');

    postItems[0].innerText = element.id;
    postItems[1].innerText = element.userId;
    postItems[2].innerText = element.model;
    postItems[3].innerText = element.year;
    postItems[4].innerText = element.engine;
    postItems[5].innerText = element.gear;
    postItems[6].innerText = element.onSale;
    postItems[7].innerText = element.rent;
    postItems[8].innerText = element.value;

    const link = createLinkOpenPost(element.id);

    const btn = postElement.getElementById('btn-open-post');

    btn.setAttribute('onclick', link);

    return postElement;
}

const createLinkOpenPost = (id) =>{
    const address = 'post.html' + '?id=' + id + '"';

    const link = 'location.href="' + address;

    return link;
}

window.onload =async ()=> {
    loadPosts();
}