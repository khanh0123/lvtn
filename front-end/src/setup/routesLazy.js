import React, { lazy } from 'react';
const HomeC = lazy(() => import('../components/Home/Home'));
const InfoMovieC = lazy(() => import('../components/Details/Info'));
const DetailC = lazy(() => import('../components/Details/Detail'));
const FiltersC = lazy(() => import('../components/Filters/Filters'));
const SearchC = lazy(() => import('../components/Filters/Search'));
const NotFoundC = lazy(() => import('../components/Notfound/Notfound'));

module.exports = {
    routeslazy: [
        {
            path:"/",
            component:HomeC,
        },{
            path:"/phim/:id([0-9]+)/:slug",
            component:InfoMovieC,
        },{
            path:"/phim/:id([0-9]+)/:slug/xem-phim",
            component:DetailC,
        },{
            path:"/tim-kiem",
            component:SearchC,
        },{
            path:"/:tag_1([a-zA-Z-]+)?/:tag_2([a-zA-Z-]+)?/:tag_3([a-zA-Z-]+)?",
            component:FiltersC,
        },{
            path:"*",
            component:NotFoundC,
        },
    ]    

} 