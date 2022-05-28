import { makeAutoObservable, runInAction } from "mobx";
import { csrftoken } from "./csrf_token";

const API = process.env.REACT_APP_API;

class Store {
    user = {
        favorites: [],
        token: "",
    }
    articles = []

    constructor() {
        makeAutoObservable(this);
        runInAction(() => {
            let localUser = localStorage.getItem("user");
            this.user = localUser ? JSON.parse(localUser) : {};

            let localArticles = localStorage.getItem("articles");
            this.articles = localArticles ? JSON.parse(localArticles) : [];
        });
    }

    async authenticate(credentials) {
        let authStatus = false;
        await fetch(`${API}/account/auth-token/`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            // mode: 'same-origin',
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.user["token"] = data.token
                    localStorage.setItem("user", JSON.stringify(this.user));
                    authStatus = this.user["token"] ? true : false;
                })

            });
        return authStatus;
    }

    logout() {
        this.user = { favorites: [], token: "" };
        localStorage.setItem("user", JSON.stringify(this.user));
    }

    addToFavorites(articleSlug) {
        fetch(`${API}/news/articles/${articleSlug}/add_to_favorite/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.getUserFavorites();
                })
            });
    }

    removeFromFavorites(articleSlug) {
        fetch(`${API}/news/articles/${articleSlug}/remove_from_favorite/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.getUserFavorites();
                })
            });
    }

    getUserFavorites() {
        fetch(`${API}/account/favorite-articles/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.user["favorites"] = data.constructor === Array ? data : []
                    localStorage.setItem("user", JSON.stringify(this.user));
                })
            });
    }

    isInFavorites(article) {
        if ("favorites" in this.user) {
            return this.user.favorites.some(element => element.id === article.id)
        }
        return false;
    }

    async getArticles() {
        let rStatus = false;
        await fetch(`${API}/news/articles/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
            .then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.articles = data
                    localStorage.setItem("articles", JSON.stringify(this.articles));
                    rStatus = true
                });
            });
        return rStatus;
    }


    async createArticle(article) {
        return await fetch(`${API}/news/articles/`, {
            method: 'POST',
            body: JSON.stringify(article),
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        });
    }

    
    uprateArticle(articleSlug) {
        fetch(`${API}/news/articles/${articleSlug}/uprate/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.getArticles();
                    this.getUserFavorites();
                })
            });
    }

    downrateArticle(articleSlug) {
        fetch(`${API}/news/articles/${articleSlug}/downrate/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.getArticles();
                    this.getUserFavorites();
                })
            });
    }

    removeRateArticle(articleSlug) {
        fetch(`${API}/news/articles/${articleSlug}/remove_rate/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'JWT ' + this.user.token,
            },
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.getArticles();
                    this.getUserFavorites();
                })
            });
    }

    sortArticleBy(attr) {
        this.articles.sort((a, b) => a[attr] - b[attr]);
    }

    async hasUserRate(articleSlug) {
        let rStatus = false;
        if (this.user.token) {
            await fetch(`${API}/news/articles/${articleSlug}/has_user_rate/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json; charset=utf8",
                    'Accept': 'application/json',
                    'X-CSRFToken': csrftoken,
                    'Authorization': 'JWT ' + this.user.token,
                },
            }).then(res => res.json()).then(stat => rStatus = stat);
        }
        return rStatus;
    }

    increaseViewNum(articleSlug) {
        fetch(`${API}/news/articles/${articleSlug}/increase_view_num/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        }).then(res => res.json()).then(data => {
            runInAction(() => {
                this.getArticles();
            });
        });
    }
}

const store = new Store();

export default store;
