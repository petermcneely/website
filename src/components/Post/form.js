import React from 'react';

import { withFirebase } from '../Firebase';
import { manipulateFromDatabase, hyphenate } from './util';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  title: '',
  description: '',
  body: '',
  loading: true,
  error: false,
};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...INITIAL_STATE, 
      urlTitle: props.match.params.urlTitle, 
    };
  }

  componentDidMount = async () => {
    await this.loadDetail();
  }

  loadDetail = async () => {
    var { urlTitle } = this.state;
    if (urlTitle) {
      try {
        const val = (await this.props.firebase
        .post(urlTitle)
        .once('value')).val();
        
        if (val !== null) {
          for (var singleKey in val) {
            var post = val[singleKey];
            manipulateFromDatabase(post, singleKey);
            this.setState({ 
              id: post.id,
              title: post.title,
              description: post.description,
              body: post.body,
              loading: false,
             });
            break;
          }
        }
        else {
          this.setState({ loading: false, error: { message: 'Unable to find that post' }});
        }
      }
      catch (error) {
        this.setState({ loading: false, error })
      }
    }
    else {
      this.setState({ loading: false });
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const { title, description, body, urlTitle, id } = this.state;
    const post = {
      id,
      title,
      description,
      body,
      creationDate: new Date().toDateString(),
      urlTitle: hyphenate(title),
    };
    try {
      if (urlTitle) {
        await this.props.firebase.updatePost(post);
      }
      else {
        post.draft = true;
        await this.props.firebase.createPost(post);
      }
      this.props.history.push(ROUTES.HOME);
    }
    catch (error) {
      this.setState({ error });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  render = () => {
    var { error, urlTitle, title, body, description, loading } = this.state;
    return <div className="container">
      {error && error.message && <div className="text-danger">{error.message}</div>}
      {!loading && <form className="form form-default" onSubmit={this.onSubmit}>
          <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                className="form-control"
                type="text"
                onChange={this.onChange}
                value={title}
                required />
          </div>
          <div className="form-group">
              <label>Description</label>
              <input
                name="description"
                className="form-control"
                type="text"
                onChange={this.onChange}
                value={description}
                required />
          </div>
          <div className="form-group">
              <label>Body</label>
              <textarea
                name="body"
                rows="8"
                className="form-control"
                onChange={this.onChange}
                value={body}
                required></textarea>
          </div>
          <button type="submit" className="btn btn-success">
            {urlTitle ? 'Update' : 'Submit'}
          </button>
      </form>}
    </div>;
  }
}

export default withFirebase(PostForm);