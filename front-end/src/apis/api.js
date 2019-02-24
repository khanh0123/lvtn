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


}

// Export component
export default Api;