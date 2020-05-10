import React from 'react';

import { withFirebase } from '../Firebase';
import { manipulateFromDatabase } from './util';

class PostDetailBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      post: {},
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

  render = () => {
    return (
      <h1>{this.state.post.title}</h1>
    );
  }
};

export default withFirebase(PostDetailBase);
