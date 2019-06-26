import React from 'react';
import { Link } from 'react-router-dom';
import { MovieAction, LoadingAction, ServerAction } from "../../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SlideItem from "../sliders/SlideItem";
import ScrollRight from "../others/ScrollRight";
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import CreateHelmetTag from "../metaseo";


class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tags: [],
            page: 1,
            per_page: 12,
            total: 0,
            meta: [],
        }
        this._handlePageChange = this._handlePageChange.bind(this);
        this._resetDataPage = this._resetDataPage.bind(this);
        this._getTagsFromRoute = this._getTagsFromRoute.bind(this);
        this._getDataPage = this._getDataPage.bind(this);
    }



    async componentDidMount() {
        let tags = this._getTagsFromRoute(this.props);
        console.log(this.props.location.search);

        let { page } = queryString.parse(this.props.location.search);
        if (!page) page = 1;
        await this.setState({ tags: tags, page: page });
        try {
            await this._getDataPage(page);
            await this.props.set_loading(false);
        } catch (error) {
            await this.props.set_loading(false);
        }
    }
    async componentWillReceiveProps(nextProps) {
        let new_tags = this._getTagsFromRoute(nextProps);
        let { tags } = this.state;
        if (tags.length > 0) {
            for (let i = 0; i < new_tags.length; i++) {
                if (tags[i] && tags[i] != new_tags[i]) {
                    await this._resetDataPage();
                    await this.setState({ tags: new_tags });
                    try {
                        await this._getDataPage();
                        await this.props.set_loading(false);
                    } catch (error) {
                        await this.props.set_loading(false);
                    }
                    return;
                }

            }
        }


    }


    render() {
        let { data, meta, tags, page, url } = this._getDataRender();

        return (
            <React.Fragment>
                <CreateHelmetTag
                    page="filter"
                    data={meta}
                    url={url}

                />
                <div className="container">
                    <div className="breadcrumbs">

                        <ul className="breadcrumb">
                            <li><Link to="/"><span className="fa fa-home" /> Trang chủ</Link></li>
                            {this._renderBreadcrumbs(meta, tags)}
                        </ul>
                    </div>
                </div>
                <div className="inner-page details-page filter-page">

                    <div className="container">
                        <div className="row" >

                            <div className="col-lg-9 col-md-9" style={{ marginTop: '2em', display: 'inline-block', }}>
                                {data.length > 0 &&
                                    (
                                        <div className="row">
                                            {data.map((item, i) => {
                                                return (
                                                    <div className="owl-item cloned col-lg-3 col-xs-6" key={item.id}>
                                                        <SlideItem item={item} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                    ||
                                    <h3 style={{ textAlign: "center", color: "black", margin: "1em 0" }}>Không có kết quả</h3>
                                }
                                {data.length > 0 && this.state.total / 10 > 1 &&
                                    <div className="row">
                                        <div className="text-center">
                                            <Pagination
                                                activePage={page}
                                                itemsCountPerPage={10}
                                                totalItemsCount={this.state.total}
                                                pageRangeDisplayed={5}
                                                onChange={this._handlePageChange}
                                            />
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className="col-lg-3 col-md-3 ">
                                <ScrollRight />
                            </div>


                        </div>


                    </div>

                    }
                </div>
            </React.Fragment>
        )
    }

    _getDataRender = () => {
        let { url } = this.props.match;
        let { data, meta } = this.state;
        let tags = this._getTagsFromRoute(this.props);
        if (data.length == 0 && this.props[MovieAction.ACTION_GET_MOVIE_FILTER]) {
            data = this.props[MovieAction.ACTION_GET_MOVIE_FILTER].info.data;
            meta = this.props[MovieAction.ACTION_GET_MOVIE_FILTER].meta;
        }
        let { page } = queryString.parse(this.props.location.search);
        page = !page ? 1 : parseInt(page);

        return { data, meta, tags, page, url };
    }
    _renderBreadcrumbs = (meta, tags) => {

        let tags_info = meta.tags ? meta.tags : [];
        let data = [];
        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < tags_info.length; j++) {
                if (tags_info[j].slug == tags[i]) {
                    if (i == tags.length - 1)
                        data.push(<li key={i}>{tags_info[j].name}</li>)
                    else data.push(<li key={i}><Link to={`/${tags[i]}`}> {tags_info[j].name}</Link></li>)
                }

            }

        }
        return data;
    }
    _getTagsFromRoute = (props) => {
        const { tag_1, tag_2, tag_3 } = props.match.params;
        let tags = [];
        if (tag_1 != undefined) tags.push(tag_1);
        if (tag_2 != undefined) tags.push(tag_2);
        if (tag_3 != undefined) tags.push(tag_3);
        return tags;
    }
    _getDataPage = async (page) => {
        const { tags, per_page } = this.state;
        let p = page != '' ? page : this.state.page;
        if (tags.length > 0) {
            let data = await this.props.get_movie_filter(tags, per_page, p);

            let res = data.payload.data;
            await this.setState({
                data: res.info.data,
                total: res.info.total,
                per_page: res.info.per_page,
                meta: res.meta,
            });
        }
    }
    _handlePageChange = async (pageNumber) => {
        await this.setState({ page: pageNumber });
        this.props.history.push({
            pathname: window.location.pathname,
            search: "?" + new URLSearchParams({ page: pageNumber }).toString()
        })
        this._getDataPage(pageNumber);
    }
    _resetDataPage = async () => {
        await this.setState({
            data: [],
            tags: [],
            page: 1,
            per_page: 12,
            total: 0,
            meta: [],
        });
    }
}

Filters.serverFetch = ServerAction.init_data_page_filter;

const mapStateToProps = ({ movie_results, loading_results }) => {
    return Object.assign({}, movie_results, loading_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_movie_filter: MovieAction.get_movie_filter,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters));