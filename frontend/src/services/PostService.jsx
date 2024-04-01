const onDeleteClick = (postList, setPostList, postToDelete) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (userConfirmed) {
        const updatedPostList = postList.filter(post => post.id !== postToDelete.id);
        setPostList(updatedPostList);
    }
}

const onAddPost = (postList, setPostList, newPost) => {
    const newPostList = [...postList];
    newPostList.push(newPost);
    setPostList(newPostList);
}

const onPostUpdate = (postList, setPostList, updatedPost, id) => {
    const newPostList = [...postList];
    const index = newPostList.findIndex(post => post.id == id);
    newPostList[index] = updatedPost;
    setPostList(newPostList);
}


export { onDeleteClick, onAddPost, onPostUpdate};