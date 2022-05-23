import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import store from '../store/store';


const ArticleDetails = observer(() => {
    const { slug } = useParams();
    const [userRate, setUserRate] = useState(0);

    const article = store.articles.find(item => item.slug == slug)
    const isArticleInFavs = store.isInFavorites(article);
    const isInFavColor = isArticleInFavs ? "error" : "action";

    const hasUpRate = userRate > 0 ? "info" : "action";
    const hasDownRate = userRate < 0 ? "info" : "action";

    useEffect(() => {
        async function fetchData() {
            let res = await store.hasUserRate(article.slug);
            setUserRate(res);
        }
        fetchData();
    });

    const handleFavorite = (e) => {
        e.preventDefault();
        if (isArticleInFavs) {
            store.removeFromFavorites(article.slug);;
        } else {
            store.addToFavorites(article.slug)
        }
    }

    const downrateArticle = () => {
        if (userRate >= 0) {
            store.downrateArticle(article.slug);
        } else{
            store.removeRateArticle(article.slug);
        }
    }

    const uprateArticle = () => {
        if (userRate <= 0){
            store.uprateArticle(article.slug);
        }else{
            store.removeRateArticle(article.slug);
        }
    }


    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, }}>
            <Card sx={{ maxWidth: "100%", minWidth: "70%" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {article.author[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={<strong>{article.title}</strong>}
                    subheader={new Date(article.date).toDateString()}
                />
                <CardContent>
                    <div variant="body2" color="text.secondary">
                        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" size="small">Go Home</Button>
                        </Link>
                    </div>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="rating">
                        <BarChartIcon />
                        <span>&nbsp;{article.rating}</span>
                    </IconButton>
                    <IconButton aria-label="views">
                        <RemoveRedEyeOutlinedIcon />
                        <span>&nbsp;{article.views_num}</span>
                    </IconButton>
                    {
                        store.user.token ?
                            <>
                                <IconButton aria-label="uprate" onClick={uprateArticle}>
                                    <ThumbUpOutlinedIcon color={hasUpRate} />
                                </IconButton>
                                <IconButton aria-label="downrate" onClick={downrateArticle}>
                                    <ThumbDownOutlinedIcon color={hasDownRate} />
                                </IconButton>
                                <IconButton aria-label="add to favorites" onClick={handleFavorite}>
                                    <FavoriteIcon color={isInFavColor} />
                                </IconButton>
                            </> : null
                    }
                </CardActions>
            </Card>
        </Grid>

    );
});

export default ArticleDetails;
