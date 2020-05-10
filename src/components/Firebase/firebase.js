import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { manipulateForDatabase } from '../Post';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.database = app.database();
    }

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();

    post = url => this.database
        .ref('posts')
        .orderByChild('urlTitle')
        .equalTo(url);
    posts = () => this.database.ref('posts');
    validate = async post => {
        const existingPost = (await this.post(post.urlTitle).once('value')).val();
        if (existingPost && (!post.id || Object.keys(existingPost)[0] !== post.id)) {
            throw new Error('A post with that url already exists');
        }
    }
    updatePost = async post => {
        await this.validate(post);
        let updates = {};
        const newPost = manipulateForDatabase(post);
        updates[`/posts/${post.id}`] = newPost;
        await this.database.ref().update(updates);
    }
    deletePost = async post => {
        await this.database.ref(`/posts/${post.id}`).remove();
    }
    createPost = async post => {
        await this.validate(post);
        const newPost = manipulateForDatabase(post);
        await this.database.ref("posts").push(newPost);
    }

    comments = () => this.database.ref('comments');
}

export default Firebase;