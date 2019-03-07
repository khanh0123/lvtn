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

    

    


}

// Export component
export default Api;