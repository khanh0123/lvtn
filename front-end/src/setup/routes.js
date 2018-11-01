import React , {  lazy } from 'react';
// import Home from "../components/home";
// import InfoMovie from "../components/details/info";
// import Detail from "../components/details/detail";
import NotFound from "../components/notfound/";

const Home = lazy(() => import('../components/home/home'));
const Detail = lazy(() => import('../components/details/detail'));
const InfoMovie = lazy(() => import('../components/details/info'));
// const NotFound = lazy(() => import('../components/notfound/notfound'));
export default [
    {
        path:"/",
        component:Home,
    },
    {
        path:"/phim/:slug-:id",
        component:InfoMovie,
    },
    {
        path:"/phim/:slug-:id/xem-phim",
        component:Detail,
    },
    {
        path: '*',
        component: NotFound
    }
]