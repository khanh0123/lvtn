import MovieAction from "./movie";
import MenuAction from "./menu";
import queryString from 'query-string';

const init_data_home = (obj) => {    
    
    if (obj) {   
        return Promise.all([
            MovieAction.get_home_movies().then(res => {
                obj.store.dispatch(res)
            }),
            MenuAction.get_menu().then(res => {                
                obj.store.dispatch(res)
            }),
            
        ])     
    }
}
const init_data_page_info = (obj) => {    
    
    
    
    if (obj) {   
        let { id,slug } = obj.request.params;
        
        return MovieAction.get_detail_movie(id,slug).then(res => {
            obj.store.dispatch(res)
        })
    }
}
const init_data_page_detail = (obj) => {    
    
    
    if (obj) {   
        let { id,slug } = obj.request.params;
        
        return Promise.all([
            MovieAction.get_detail_movie(id,slug).then(res => {
                obj.store.dispatch(res)
            }),
            
        ])     
    }
}
const init_data_page_filter = (obj) => {        
    
    if (obj) {   
        
        let { tag_1,tag_2,tag_3 } = obj.request.params;
        let { fullPath } = obj.request;
        let regex = /.(\?.*)$/;
        let result_test = regex.exec(fullPath);
        let search = '';
        if(result_test && result_test.length > 1) search = result_test[1];
        let tags = [];
        if (tag_1 != undefined) tags.push(tag_1);
        if (tag_2 != undefined) tags.push(tag_2);
        if (tag_3 != undefined) tags.push(tag_3);
        let { page } = queryString.parse(search);
        page = !page ? 1 : parseInt(page);        
        
        return Promise.all([
            MovieAction.get_movie_filter(tags, 12, page).then(res => {                
                obj.store.dispatch(res)
            }),
            
        ])     
    }
}

const init_data_page_search = (obj) => {            
    
    if (obj) {   
        
        let { fullPath } = obj.request;
        let regex = /.(\?.*)$/;
        let result_test = regex.exec(fullPath);
        let search = '';
        if(result_test && result_test.length > 1) search = result_test[1];
        
        let { page , q } = queryString.parse(search);        
        page = !page ? 1 : parseInt(page);
        
        return q !== '' ? Promise.all([
            MovieAction.get_movie_search(q,page).then(res => {                
                obj.store.dispatch(res)
            }),
            
        ]) : null;    
    }
}

module.exports = {
    init_data_home,
    init_data_page_info,
    init_data_page_detail,
    init_data_page_filter,
    init_data_page_search,
};