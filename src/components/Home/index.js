import React from 'react';

import { PostListItem, manipulateFromDatabase } from '../Post';
import { withFirebase } from '../Firebase';

class HomePageBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      loading: true,
      error: null,
    }
  }

  render = () => {
    const { error, loading, posts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    }
    else if (loading) {
      return <div>Loading...</div>
    }
    else {
      return (
        <div className="container">
          {posts.map((p, i) => {
            return (
              <PostListItem key={i} post={p}/>
            );
          })}
        </div>
      );
    }
  }
  
  componentDidMount = async () => {
    await this.loadPosts();
  }

  loadPosts = async () => {
    try {
      const val = (await this.props.firebase
        .posts()
        .orderByChild('creationDate')
        .once('value')).val();
      
      const posts = val ? Object.keys(val).reverse().map((k, i) => {
        manipulateFromDatabase(val[k], k, i);
        return val[k];
      }) : null;

      this.setState({ loading: false, posts });
    }
    catch (error) {
      this.setState({ loading: false, error });
    }
  }
}

export default withFirebase(HomePageBase);