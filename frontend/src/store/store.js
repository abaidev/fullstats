import { makeAutoObservable, runInAction } from "mobx";
import { csrftoken } from "./csrf_token";

const API = process.env.REACT_APP_API;

class Store {
    user = {}
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
                authStatus = this.user["token"] ? true : false;
            });
        return authStatus;
    }

    logout() {
        this.user = {};
        localStorage.setItem("user", JSON.stringify(this.user));
    }

    getUserFavorites() {
        fetch(`${API}/account/details/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            // mode: 'same-origin',
        }).then(res => res.json())
            .then(data => {
                runInAction(() => {
                    this.user = { ...this.user, ...data }
                    localStorage.setItem("user", JSON.stringify(this.user));
                })
            });
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

    

    async addArticleToFav() {

    }

    async rateArticle(rate){

    }

}

const store = new Store();

export default store;
