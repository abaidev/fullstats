import React from 'react';
import { observer } from 'mobx-react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import store from '../store/store';
import ArticleCard from './articleCard';


const Home = observer(() => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Grid container spacing={2} style={{ maxWidth: 900, marginTop: 10 }}>
                {store.articles.length > 0 ? store.articles.map((article) => {
                    return (
                        <Grid item xs={12} key={article.id}>
                            <ArticleCard article={article}/>
                        </Grid>
                    )
                }) : null}
            
            </Grid>
        </Box>
    )
});

export default Home;