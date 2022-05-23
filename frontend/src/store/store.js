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
                this.user["token"] = data.token
                localStorage.setItem("user", JSON.stringify(this.user));
                authStatus = this.user["token"] ? true : false;
            });
        return authStatus;
    }

    logout() {
        this.user = {favorites: [], token: ""};
        localStorage.setItem("user", JSON.stringify(this.user));
    }

    addToFavorites(articleSlug){
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

    removeFromFavorites(articleSlug){
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
                    this.user["favorites"] = data
                    localStorage.setItem("user", JSON.stringify(this.user));
                })
            });
    }

    isInFavorites(article){
        return this.user.favorites.some((element, index, array)=>{return element.id === article.id})
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


    async rateArticle(rate){

    }

}

const store = new Store();

export default store;
