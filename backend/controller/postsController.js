import postsData from '../model/data.js';
const list = postsData;



const getPosts = (req, res) => {
    if (list.length > 0) {
        res.json(list);
    } else {
        res.json([])
    }
}

const getPost = (req, res) => {
    const id = req.params.id;
    const post = list.find((post) => post.id == id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send(`Post with id ${id} not found`);
    }
}

const createPost = (req, res) => {
    const post = req.body;
    post.id = list.length > 0 ? Math.max(...list.map(post => post.id)) + 1 : 1;
    console.log(post);

    if (typeof post.upvotes !== 'number' || !post.date || !post.username || !post.title || !post.description) {
        res.status(404).send('Invalid post parameters provided');
        return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
        res.status(404).send("Invalid date format. Date must be in the format YYYY-MM-DD.");
        return;
    }

    const date = new Date(post.date);
    if (isNaN(date.getTime())) {
        res.status(404).send('Invalid date provided');
        return;
    }

    if (date > new Date()) {
        res.status(404).send('Invalid date provided');
        return;
    }

    if (date.getFullYear() < 2022) {
        res.status(404).send('Invalid year provided');
        return;
    }

    list.push(post);
    res.json(post);
}

const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = list.findIndex(post => post.id == id);
    const post = list.find((post) => post.id == id);

    if (postIndex !== -1) {
        const updatedPost = req.body;

        if (typeof updatedPost.id !== 'number' || typeof updatedPost.upvotes !== 'number' || !updatedPost.date || !updatedPost.username || !updatedPost.title || !updatedPost.description) {
            res.status(404).send('Invalid post parameters provided');
            return
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(updatedPost.date)) {
            res.status(404).send("Invalid date format. Date must be in the format YYYY-MM-DD.");
            return;
        }
    
        const date = new Date(updatedPost.date);
        if (isNaN(date.getTime())) {
            res.status(404).send('Invalid date provided');
            return;
        }
    
        if (date > new Date()) {
            res.status(404).send('Invalid date provided');
            return;
        }
        if (date.getFullYear() < 2022) {
            res.status(404).send('Invalid year provided');
            return;
        }
    

        list[postIndex] = updatedPost;
        res.json(updatedPost);
    } else {
        res.status(404).send(`Post with id ${id} not found`);
    }
}

const deletePost = (req, res) => {
    const id = req.params.id;
    const post = list.find((post) => post.id == id);
    const postIndex = list.findIndex(post => post.id == id);
    if (postIndex !== -1) {
        list.splice(postIndex, 1);
        res.json(post);
    } else {
        res.status(404).send(`Post with id ${id} not found`);
    }
}

export default { getPosts, getPost, createPost, updatePost, deletePost };
