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
import Loading from "../others/Loading";


class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
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
        this.props.set_loading(false);
        let tags = this._getTagsFromRoute(this.props);

        let { page } = queryString.parse(this.props.location.search);
        if (!page) page = 1;
        await this.setState({ tags,page });
        await this._getDataPage(this.props,page);
    }
    async componentWillReceiveProps(nextProps) {
        let diff = false;
        let new_tags = this._getTagsFromRoute(nextProps);
        let tags = this._getTagsFromRoute(this.props);
        if(tags.length == new_tags.length){
            for (let i = 0; i < tags.length; i++) {
                if(tags[i] !== new_tags[i]){
                    diff = true;
                    break;
                }
                
            }
        } else {
            diff = true;
        }
        
        if (diff) {
            await this._resetDataPage();
            await this.setState({ tags: new_tags });
            this._getDataPage(nextProps);
        }
    }
    shouldComponentUpdate(nextProps , nextState){
        // var bol_tag = this._getTagsFromRoute(nextProps) != this._getTagsFromRoute(this.props);
        let { url } = nextProps.match;
        let { page } = queryString.parse(nextProps.location.search);
        if (!page) page = 1;

        if(this.state.data != nextState.data ){
            return true;
        }
        if(
            nextProps[MovieAction.ACTION_GET_MOVIE_FILTER] && 
            nextProps[MovieAction.ACTION_GET_MOVIE_FILTER][url] && 
            nextProps[MovieAction.ACTION_GET_MOVIE_FILTER][url][page] && 
            this.props[MovieAction.ACTION_GET_MOVIE_FILTER] &&
            this.props[MovieAction.ACTION_GET_MOVIE_FILTER][url] && (
                this.props[MovieAction.ACTION_GET_MOVIE_FILTER][url][page] != nextProps[MovieAction.ACTION_GET_MOVIE_FILTER][url][page]                    

            )){            
            return true;
        }
        
        return page != this.state.page
    }

    render() {
        let { data, meta, tags, page, url } = this._getDataRender();   
        // console.log(data);
             
        
        // data = null;
        // let {loading} = this.state;
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

                            <div className="col-lg-9 col-md-9 col-xs-12" style={{ marginTop: '2em', display: 'inline-block', }}>
                                {data == null &&  <Loading type="2"/>}
                                {data && data.length > 0 &&
                                        data.map((item, i) => {
                                            return (
                                                <div className="col-lg-3 col-xs-6 owl-item cloned" key={item.id}>
                                                        <SlideItem item={item} />
                                                </div>
                                            )
                                        })
                                    || data &&
                                    <h3 style={{ textAlign: "center", color: "black", margin: "1em 0" }}>Không có kết quả</h3>
                                }
                                {this.state.total / this.state.per_page > 1 &&
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
                </div>
            </React.Fragment>
        ) 
    }

    _getDataRender = () => {
        
        let { url } = this.props.match;
        let { data, meta } = this.state;
        let tags = this._getTagsFromRoute(this.props);
        let { page } = queryString.parse(this.props.location.search);
            page = !page ? 1 : parseInt(page);
        
        if (data == null && this.props[MovieAction.ACTION_GET_MOVIE_FILTER] && this.props[MovieAction.ACTION_GET_MOVIE_FILTER][url] && this.props[MovieAction.ACTION_GET_MOVIE_FILTER][url][page]) {
            
            
            data = this.props[MovieAction.ACTION_GET_MOVIE_FILTER][url][page].info.data;
            meta = this.props[MovieAction.ACTION_GET_MOVIE_FILTER][url][page].meta;
            // console.log(data);
        }
        

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
    _getDataPage = async (props,page) => {
        
        const { tags } = this.state;
        let p = page != '' ? page : 1;
        let { url } = props.match;
        if (tags.length > 0) {
            let result = "";
            if(props[MovieAction.ACTION_GET_MOVIE_FILTER] && props[MovieAction.ACTION_GET_MOVIE_FILTER][url] && props[MovieAction.ACTION_GET_MOVIE_FILTER][url][page]){
                result = props[MovieAction.ACTION_GET_MOVIE_FILTER][url][page];
            } else {
                this.setState({ data: null});
                result = await props.get_movie_filter(tags, per_page, p , url);
                result = result.payload.data;
            }
            let {data , total , per_page} = result.info;
            let { meta } = result;
            this.setState({ data,total,per_page, meta});
        }
    }
    _handlePageChange = async (pageNumber) => {
        if(pageNumber != this.state.page){
            window.scrollTo(0,0);
            await this.setState({ page: pageNumber });
            this.props.history.push({
                pathname: window.location.pathname,
                search: "?" + new URLSearchParams({ page: pageNumber }).toString()
            })
            this._getDataPage(this.props,pageNumber);
        }
        
    }
    _resetDataPage = async () => {
        await this.setState({
            data: null,
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