// import React , {  lazy } from 'react';
import Home from "../components/Home";
import InfoMovie from "../components/details/Info";
import Detail from "../components/details/Detail";
import Filters from "../components/filters/Filters";
import Search from "../components/filters/Search";
import NotFound from "../components/Notfound/";

// const Home = lazy(() => import('../components/home/home'));
// const Detail = lazy(() => import('../components/details/detail'));
// const InfoMovie = lazy(() => import('../components/details/info'));
// const NotFound = lazy(() => import('../components/notfound/notfound'));
export default [
    {
        path:"/",
        component:Home,
        exact:true
    },
    {
        path:"/phim/:id([0-9]+)/:slug",
        component:InfoMovie,
        exact:true
        
    },
    {
        path:"/phim/:id([0-9]+)/:slug/xem-phim",
        component:Detail,
        exact:true
    },{
        path:"/tim-kiem",
        component:Search,
        exact:true
    },
    {
        path:"/:tag_1([a-zA-Z-]+)?/:tag_2([a-zA-Z-]+)?/:tag_3([a-zA-Z-]+)?",
        component:Filters,
        exact:false
    },
    // {
    //     path:"/:tag_1/:tag_2",
    //     component:Filters,
    //     exact:false
    // },
    // {
    //     path:"/:tag_1/:tag_2/:tag_3",
    //     component:Filters,
    //     exact:false
    // },
    {
        path: '*',
        component: NotFound,
        exact:false
    }
]