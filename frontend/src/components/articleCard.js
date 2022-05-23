import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import store from '../store/store';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ArticleCard({ article }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: "100%" }}>
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
            {/* <CardMedia
                component="img"
                height="194"
                image="put do kartinki esli on est"
                alt="Paella dish"
            /> */}
            <CardContent>
                <div variant="body2" color="text.secondary">
                    <div dangerouslySetInnerHTML={{ __html: article.content.slice(0, 200) }} style={{ marginBottom: 5 }}></div>
                    <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" size="small">View Article</Button>
                    </Link>
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="rating">
                    <UpgradeIcon />
                    <span>&nbsp;{article.rating}</span>
                </IconButton>
                <IconButton aria-label="views">
                    <RemoveRedEyeOutlinedIcon />
                    <span>&nbsp;{article.views_num}</span>
                </IconButton>
                {
                    store.user.token ?
                        <>
                            <IconButton aria-label="uprate">
                                <ThumbUpOutlinedIcon />
                            </IconButton>
                            <IconButton aria-label="downrate">
                                <ThumbDownOutlinedIcon />
                            </IconButton>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </> : null
                }


                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{article.content}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
