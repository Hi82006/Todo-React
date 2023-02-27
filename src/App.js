import React, { useMemo, useRef, useEffect, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import Myinput from "./components/UI/Input/Myinput";
import Postform from "./components/Postform";
import Myselect from "./components/UI/select/Myselect";
import Postfilter from "./components/Postfilter";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./components/hooks/usePosts";
import axios from "axios";
import PostServise from "./components/API/PostServise";

function App() {
    const [posts, setPosts] = useState ([
      // {id: 1, title: 'Javascript', body: 'Description'},
      // {id: 2, title: 'Javascript 2', body: 'Description'},
      // {id: 3, title: 'Javascript 3', body: 'Description'}
    ])

  const[filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModaL] = useState(false);
  const sortedAndSearchPosts = usePosts(posts,filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts()
  }, []);

  async function fetchPosts(){
    setIsPostsLoading(true);
    setTimeout(async() => {
      const posts = await PostServise.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 1000)
  }
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModaL(false)
   }

   const removePost =(post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
   }
   const removeAll = () =>{
    setPosts([])
   }
  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>
        загрузить
      </MyButton>
      <MyButton onClick={removeAll}>
        Удалить всё
      </MyButton>
      <MyButton style={{marginTop: 30}} onClick={()=> setModaL(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModaL}>
      <Postform create={createPost}/>
      </MyModal>
      <hr style={{margin: "15px 0"}}></hr>
      <Postfilter 
        filter={filter} 
        setFilter={setFilter}
      />
      {isPostsLoading
      ?<h1 style = {{margin: "15px 0"}}>Идет закрузка...</h1>
      :<PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS"/>
      }
     </div>
  );
}

export default App;
