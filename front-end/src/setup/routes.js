import Home from "../components/home";
import InfoMovie from "../components/details/info";
import Detail from "../components/details/detail";
import NotFound from "../components/notfound/";
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
        path: '**',
        component: NotFound
    }
]