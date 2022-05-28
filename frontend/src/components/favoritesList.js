import React from 'react';
import { observer } from 'mobx-react';
import store from '../store/store';
import ArticleCard from './articleCard';

const FavoritesList = observer(() => {
    return (
        <div className='container w-50'>
            {
                store.user.favorites ?
                    store.user.favorites.map(article =>
                        <div className="mb-3" key={article.id}>
                            <ArticleCard article={article} />
                        </div>
                    ) :
                    null
            }
        </div>
    )
});

export default FavoritesList;
