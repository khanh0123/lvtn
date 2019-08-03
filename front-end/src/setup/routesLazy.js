import React, { lazy } from 'react';
import config from "../config";
const Home = lazy(() => import('../components/home/Home'));
const InfoMovie = lazy(() => import('../components/details/Info'));
const Detail = lazy(() => import('../components/details/Detail'));
const Filters = lazy(() => import('../components/filters/Filters'));
const Search = lazy(() => import('../components/search/Search'));
const NotFound = lazy(() => import('../components/notfound/Notfound'));

module.exports = {
    routeslazy: [
        {
            path: config.path.home,
            component: Home,
            exact: true,
            name:'home',
        },
        {
            path: config.path.info,
            component: InfoMovie,
            exact: true,
            name:'info',

        },
        {
            path: config.path.detail,
            component: Detail,
            exact: true,
            name:'detail',
        },
        {
            path: config.path.search,
            component: Search,
            exact: true,
            name:'search',
        },
        {
            path: config.path.filter,
            component: Filters,
            exact: true,
            name:'filter',
        }, 
        {
            path: "*",
            component: NotFound,
        }
    ]

} 