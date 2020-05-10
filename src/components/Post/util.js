import cloneDeep from 'lodash/cloneDeep';

const manipulateFromDatabase = (post, key, index) => {
  post.creationTime = Date.parse(post.creationDate);
  post.id = key;
  post.commentCount = 0;
  post.showBody = index === 0;
};

const manipulateForDatabase = (post) => {
  var newPost = cloneDeep(post);
  delete newPost.id;
  if (newPost.creationTime) delete newPost.creationTime;
  if (newPost.showBody) delete newPost.showBody;
  return newPost;
};

const hyphenate = (input) => {
  var pattern = /[ ?\\.;:&]+/g;
  if (typeof input.replace === "function") {
      var hyphenated = input.replace(pattern, "-").toLowerCase();
      return hyphenated;
  }
  return input;
};

export {
  manipulateFromDatabase,
  manipulateForDatabase,
  hyphenate,
}