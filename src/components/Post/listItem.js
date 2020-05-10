import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import Chevron from '../Chevron';

class PostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBody: props.post.showBody,
      title: props.post.title,
      url: props.post.urlTitle,
      description: props.post.description,
      creationDate: props.post.creationDate,
      commentCount: props.post.commentCount,
      draft: props.post.draft,
      body: props.post.body,
    };
  }

  toggleShowBody = () => {
    this.setState({showBody: !this.state.showBody});
  }

  render = () => {
    const {
      title,
      url,
      description,
      creationDate,
      commentCount,
      draft,
      showBody,
      body } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (!!authUser || !draft) &&
          (<div className='post clearfix'>
            <h3 className='post-header'>
              <Link to={`posts/${url}`}>
                {title}&nbsp;
                <span className="badge">{commentCount}</span>
              </Link>
              <Chevron down={showBody} onToggle={this.toggleShowBody} />
            </h3>
            <em>{description}</em>
            <span className="pull-right">{creationDate}</span>
            {showBody && <div
              className="post-body"
              dangerouslySetInnerHTML={{__html: body}}/>}
          </div>)
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default PostListItem;
