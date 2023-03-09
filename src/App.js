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
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./components/hooks/useFetching";
import { getPagesArray, getPagesCount } from "./utils/pages";


function App() {
    const [posts, setPosts] = useState ([
      // {id: 1, title: 'Javascript', body: 'Description'},
      // {id: 2, title: 'Javascript 2', body: 'Description'},
      // {id: 3, title: 'Javascript 3', body: 'Description'}
    ])

  const[filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModaL] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page,setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts,filter.sort, filter.query);

  let pagesArray = getPagesArray(totalPages)
  console.log(totalPages)
 console.log(pagesArray)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page)=>{
    const response = await PostServise.getAll(limit, page);
      setPosts(response.data);
      const totatCount = response.headers['x-total-count']
      setTotalPages(getPagesCount(totatCount, limit));
  })
  useEffect(() => {
    fetchPosts(limit, page)
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModaL(false)
   }

   const removePost =(post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
   }
   const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
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
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {isPostsLoading
      ?<div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
      :<PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS"/>
      }
      <div className="page__wrapper"></div>
      {pagesArray.map(p =>
        <span
        onClick={() => changePage(p)}
        key={p}
        className={page === p ?
           'page page__curent' 
           : 'page'}>
            {p}
            </span>
      )}
     </div>
  );
}

export default App;