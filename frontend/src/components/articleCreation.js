import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Card } from '@mui/material';
import { observer } from 'mobx-react';
import store from '../store/store';

const ArticleCreateForm = observer(() => {
    const navigate = useNavigate();

    const create = async (event)=>{
        event.preventDefault();
        let form = event.target;

        let article = {title: form.title.value, content: form.content.value}
        let response = await store.createArticle(article);
        
        if (response.ok){
            let json = await response.json();
            let slug = json.slug;
            await store.getArticles();
            navigate(`/articles/${slug}`);
        }
    }

    return (
        <>
            <Card size={"small"} style={{ maxWidth: 750, margin: "auto", marginBottom: 15 }}>
                <Box sx={{ padding: 2 }} component="form" onSubmit={create} noValidate>
                    <div className='mb-5'>
                        <Input placeholder="Title" className='d-block w-100' type="text" name='title' />
                    </div>
                    <div className='mb-5'>
                        <Input placeholder="Content" className='d-block w-100' type="textarea" name='content' />
                    </div>
                    <Button size="small" variant='outlined' type="submit">Create</Button>
                </Box>
            </Card>
        </>
    )
})

export default ArticleCreateForm;
