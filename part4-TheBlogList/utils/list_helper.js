const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const mostLikeValue = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikeValue);
};

const mostBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const countBlogPerAuthor = blogs.reduce((blogPerAuthor, blog) => {
    if (!blogPerAuthor[blog.author]) {
      blogPerAuthor[blog.author] = 1;
      return blogPerAuthor;
    }
    blogPerAuthor[blog.author] += 1;
    return blogPerAuthor;
  }, {});
  const mostBlogValue = Math.max(...Object.values(countBlogPerAuthor));
  const authorWithMostBlog = Object.entries(countBlogPerAuthor).map((entry) => ({
    author: entry[0],
    blogs: entry[1],
  })).find((entry) => entry.blogs === mostBlogValue);
  return authorWithMostBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
};
