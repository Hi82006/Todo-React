import React from 'react';
import Myselect from './UI/select/Myselect';
import Myinput from './UI/Input/Myinput';

const Postfilter = ({filter, setFilter}) => {
    return (
        <div>
            <Myinput
                placeholder='поиск'
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <Myselect 
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defualtValue="Сортировка"
                option={[
                {value: 'title', name: 'по названию'},
                {value: 'body', name: 'по описанию'}
                ]}
                
            />
        </div>
    );
}

export default Postfilter;
