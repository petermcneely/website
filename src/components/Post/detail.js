import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { manipulateFromDatabase } from './util';
import * as ROUTES from '../../constants/routes';

class PostDetailBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      post: undefined,
      loading: true,
      error: null,
    }
  }

  componentDidMount = async () => {
    await this.loadDetail();
  }

  loadDetail = async () => {
    var { id } = this.state;
    try {
      const val = (await this.props.firebase
      .post(id)
      .once('value')).val();

      if (val !== null) {
        for (var singleKey in val) {
          var post = val[singleKey];
          manipulateFromDatabase(post, singleKey);
          this.setState({ post });
          break;
        }
      }
    }
    catch (error) {
      this.setState({ loading: false, error })
    }
  }

  shouldShow = (authUser) => {
    var { post } = this.state;
    return post && (!!authUser || !post.draft);
  }

  publishPost = async () => {
    var { post } = this.state;
    post.draft = false;
    try {
      await this.props.firebase.updatePost(post);
      this.props.history.push(ROUTES.HOME);
    }
    catch (error) {
      this.setState({ error });
    }
  }
  
  deletePost = async () => {
    var { post } = this.state;
    try {
      await this.props.firebase.deletePost(post);
      this.props.history.push(ROUTES.HOME);
    }
    catch (error) {
      this.setState({ error });
    }
  }

  render = () => {
    var { post, id, error } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => this.shouldShow(authUser) ?
          <div className="container">
            <div>{error && error.message && <p className="text-danger">{error.message}</p>}</div>
            <div className="post">
              <h3 className="post-header">
                {post.title}
                {!!authUser &&
                  <span className="pull-right">
                    {post.draft &&
                      <button className="btn btn-success" onClick={this.publishPost}>Publish</button>
                    }
                    <Link to={`/post-form/${id}`} className="btn btn-info">Edit Post</Link>
                    <button className="btn btn-danger" onClick={this.deletePost} type="button">Delete Post</button>
                  </span>}
              </h3>
              <em>{post.description}</em>
              <span className="pull-right">{post.creationDate}</span>
              <div className="post-body" dangerouslySetInnerHTML={{__html: post.body}} />
            </div>
          </div> :
          <div className="container">
            <p>A post with that title does not exist!</p>
          </div>
        }
      </AuthUserContext.Consumer>
    );
  }
};

export default withFirebase(PostDetailBase);
