const manipulateFromDatabase = (post, key, index) => {
  post.creationTime = Date.parse(post.creationDate);
  post.id = key;
  post.commentCount = 0;
  post.showBody = index === 0;
};

export {
  manipulateFromDatabase
}