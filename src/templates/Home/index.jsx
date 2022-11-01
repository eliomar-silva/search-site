import { Component } from "react";

import "./styles.css";

import { Posts } from "../../Posts";
import { loadPost } from "../../utils/load-posts";
import { Button } from "../../components/button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: "",
  };
  timeoutUpdate = null;
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhoto = await loadPost();
    this.setState({
      posts: postsAndPhoto.slice(page, postsPerPage),
      allPosts: postsAndPhoto,
    });
  };

  loadMorePost = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handlerChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPost = searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className={"container"}>
        <div className="search-container">
          {searchValue && <h1>Search Value: {searchValue}</h1>}
          <TextInput searchValue={searchValue} onChange={this.handlerChange} />
        </div>

        {filteredPost.length > 0 && <Posts posts={filteredPost} />}
        {filteredPost.length === 0 && <p>Não existe poster</p>}
        {!searchValue && (
          <div className="button-container">
            <Button
              text="Load more post"
              onClick={this.loadMorePost}
              disabled={noMorePosts}
            />
          </div>
        )}
      </section>
    );
  }
}

// function Home() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
