import React, { useRef } from "react";
import { useEffect, useState } from "react";
import PostServise from "../components/API/PostServise";
import { useFetching } from "../components/hooks/useFetching";
import { useObserver } from "../components/hooks/useObserver";
import { usePosts } from "../components/hooks/usePosts";
import Postfilter from "../components/Postfilter";
import Postform from "../components/Postform";
import PostList from "../components/PostList";
import MyButton from "../components/UI/Button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Paginataion from "../components/UI/pagination/paginataion";
import Myselect from "../components/UI/select/Myselect";
import "../styles/App.css";
import { getPagesCount } from "../utils/pages";


function Posts() {
    const [posts, setPosts] = useState ([
    ])
  const[filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModaL] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page,setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts,filter.sort, filter.query);
  const lastElement = useRef();
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page)=>{
    const response = await PostServise.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totatCount = response.headers['x-total-count']
      setTotalPages(getPagesCount(totatCount, limit));
  });
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page +1)
  })
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModaL(false)
   }

   const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
   }
   const changePage = (page) => {
    setPage(page)
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
      <Myselect
        value={limit}
        onChange={value => setLimit(value)}
        defualtValue= "Количество элементов на странице"
        option={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'}
        ]}
      />
      {postError &&  
        <h1>Произошла ошибка {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS"/>
      <div ref={lastElement} style={{height: 20, background: "red"}}/>
      {isPostsLoading &&
        <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
      }
        
      <Paginataion page={page}
      changePage={changePage}
      totalPages={totalPages}/>
     </div>
  );
}

export default Posts;