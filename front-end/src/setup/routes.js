
import Home from "../components/Home";
import InfoMovie from "../components/Details/Info";
import Detail from "../components/Details/Detail";
import Filters from "../components/Filters/Filters";
import Search from "../components/Search/Search";
import NotFound from "../components/Notfound/";

module.exports = {
    routes: [
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
        }, {
            path: "/tim-kiem",
            component: Search,
            exact: true
        },
        {
            path: "/:tag_1([a-z-]+)/:tag_2([a-z-]+)?/:tag_3([a-z-]+)?",
            component: Filters,
            exact: false
        }, {
            path: "*",
            component: NotFound,
        }
    ]
} 