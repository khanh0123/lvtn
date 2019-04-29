import React, { lazy } from 'react';
import config from "../config";
const Home = lazy(() => import('../components/Home/Home'));
const InfoMovie = lazy(() => import('../components/Details/Info'));
const Detail = lazy(() => import('../components/Details/Detail'));
const Filters = lazy(() => import('../components/Filters/Filters'));
const Search = lazy(() => import('../components/Search/Search'));
const NotFound = lazy(() => import('../components/Notfound/Notfound'));

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