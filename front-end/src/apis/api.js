import "../config/custom_request";
import axios from 'axios';
import config from '../config';

class Api {

    // Menu
    static get_menu() {
        const url = `${config.api.menu}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
        })
        // .catch(function (thrown) {
        //     if (axios.isCancel(thrown)) {
        //         console.log('Request canceled', thrown.message);
        //     } else {
        //         // handle error
        //     }
        // });

    }
    static get_banner_movies() {
        const url = `${config.api.movie}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                is_banner: 1,
                limit:5
            }
        })
    }
    static get_hot_movies() {
        const url = `${config.api.movie}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                is_hot: 1,
                limit:20
            }
        })
    }
    static get_recommend_movies() {
        const url = `${config.api.movie_recommend}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {}
        })

    }
    static get_hot_retail_movies() {
        const url = `${config.api.movie}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                is_hot: 1,
                limit:20,
                cat_slug:'phim-le'
            }
        })

    }
    static get_hot_series_movies() {
        const url = `${config.api.movie}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                is_hot: 1,
                limit:20,
                cat_slug:'phim-bo'
            }
        })

    }
    static get_detail_movie(id,slug) {
        const url = `${config.api.movie_detail}/${id}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                slug: slug,
            }
        })
    }
    static get_linkplay_movie(mov_id,episode) {
        const url = `${config.api.movie_detail}/${mov_id}/link/${episode}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {}
        })
    }

    static get_movie_filter(tags,limit,page) {
        
        if(Array.isArray(tags)){
            let tags_str = '';
            for (let i = 0; i < tags.length; i++) {
                tags_str+= (i < tags.length-1) ? `${tags[i]},` : tags[i];
            }
            tags = tags_str
        }
        const url = `${config.api.movie_filter_tags}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                tags:tags,
                limit:limit,
                page:page
            }
        })
    }

    static get_movie_search(keyword , page) {

        const url = `${config.api.movie}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {
                name:keyword,
                page:page
            }
        })
    }
    static user_login(email,password) {
        const url = `${config.api.user_login}`;

        return axios({
            method: 'post',
            url: url,
            data: {
                email:email,
                password:password,
            },
            params: {}
        })
    }

    static user_register(email,password,name) {
        const url = `${config.api.user_register}`;

        return axios({
            method: 'post',
            url: url,
            data: {
                name:name,
                email:email,
                password:password,
                
            },
            params: {}
        })
    }

    static user_login_fb(access_token) {
        const url = `${config.api.user_login_fb}`;

        return axios({
            method: 'post',
            url: url,
            data: {
                access_token:access_token
            },
            params: {}
        })
    }
    static user_get_status_login() {
        const url = `${config.api.user_get_status_login}`;

        return axios({
            method: 'get',
            url: url,
            data: {},
            params: {}
        })
    }
    static get_comment(mov_id,limit,page) {
        const url = `${config.api.get_comment}/${mov_id}/get_comment`;
        return axios({
            method: 'get',
            url: url,
            data: {
                
            },
            params: {
                page:page,
                limit:limit,
            }
        })
    }
    static user_comment(mov_id,content,reply_id) {        
        if(!reply_id) reply_id = 0;
        const url = `${config.api.user_comment}`;
        let data = {
            mov_id:mov_id,
            content:content
        };
        if(reply_id != 0){
            data.reply_id = reply_id;
        }
        return axios({
            method: 'post',
            url: url,
            data: data,
            params: {}
        })
    }
    static user_end_time_episode(episode_id,time_current) {
        const url = `${config.api.user_end_time_episode}`;
        let data = {
            episode_id:episode_id,
            time_current:time_current
        };
        return axios({
            method: 'post',
            url: url,
            data: data,
            params: {}
        })
    }
    

    

    

    


}

// Export component
export default Api;