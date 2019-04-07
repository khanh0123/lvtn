import React, { lazy } from 'react';
const Home = lazy(() => import('../components/Home/Home'));
const InfoMovie = lazy(() => import('../components/Details/Info'));
const Detail = lazy(() => import('../components/Details/Detail'));
const Filters = lazy(() => import('../components/Filters/Filters'));
const Search = lazy(() => import('../components/Search/Search'));
const NotFound = lazy(() => import('../components/Notfound/Notfound'));

module.exports = {
    routeslazy: [
        {
            path: "/",
            component: Home,
            exact: true
        },
        {
            path: "/phim/:id([0-9]+)/:slug([a-z0-9-]+)",
            component: InfoMovie,
            exact: true

        },
        {
            path: "/phim/:id([0-9]+)/:slug([a-z0-9-]+)/xem-phim",
            component: Detail,
            exact: true
        },
        {
            path: "/tim-kiem",
            component: Search,
            exact: true
        },
        {
            path: "/:tag_1([a-z-]+)?/:tag_2([a-z-]+)?/:tag_3([a-z-]+)?",
            component: Filters,
            exact: false
        }, 
        {
            path: "*",
            component: NotFound,
        }
    ]

} 