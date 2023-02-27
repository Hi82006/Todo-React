import React from 'react';
import Myinput from './UI/Input/Myinput';
import MyButton from './UI/Button/MyButton';
import { useState } from "react";

const Postform = ({create}) => {
    const [post, setPost] = useState({title:'', body:''})

    const addNewPost = (e) =>{
        e.preventDefault()
          
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title:'', body:''})
        
    
       }
    return (
        <form>
        {/* упарвляемый компонент */}
          <Myinput
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
            type="text" 
            placeholder="Название поста"
          />
          {/* неуправлямемый или неконтролируемый компонент */}
          {/* <Myinput
            ref={bodyInputRef}
            type="text" placeholder="Описание"/> */}
            <Myinput
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            type="text" placeholder="Описание"/>
          <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    );
}

export default Postform;
