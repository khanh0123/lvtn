import React from 'react';
import { Link } from 'react-router-dom';
// import SliderScroll from "../sliders/SliderScroll";
// import FacebookProvider, { Comments } from 'react-facebook';
// import { custom_date } from "../helpers";
import { MovieAction, LoadingAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import config from "../../config";
import SlideItem from "../sliders/SlideItem";
import Pagination from "react-js-pagination";


class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tags: [],
            page: 1,
            per_page: 12,
            total: 0,
            meta:[],

        }
        this._handlePageChange = this._handlePageChange.bind(this);
        this._resetDataPage = this._resetDataPage.bind(this);
        this._getTagsFromRoute = this._getTagsFromRoute.bind(this);
        this._getDataPage = this._getDataPage.bind(this);
    }

    async componentDidMount() {
        let tags = this._getTagsFromRoute(this.props);        
        await this.setState({ tags: tags });
        await this._getDataPage();
        await this.props.set_loading(false);
        
    }
    async componentWillReceiveProps(nextProps) {
        let new_tags = this._getTagsFromRoute(nextProps);
        let {tags} = this.state;
        if(tags.length > 0){
            for (let i = 0; i < new_tags.length; i++) {
                if(tags[i] && tags[i] != new_tags[i]){
                    await this._resetDataPage();
                    await this.setState({ tags: new_tags });
                    await this._getDataPage();
                    await this.props.set_loading(false);
                    return;
                }
                
            }
        }
        

    }
    

    render() {
        let { data } = this.state;

        return data.length > 0 && (
            <React.Fragment>
                <div className="breadcrumbs">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link to="/"><span className="fa fa-home" /> Trang chủ</Link></li>
                            {this._renderBreadcrumbs()}
                        </ul>
                    </div>
                </div>
                <div className="inner-page details-page filter-page">
                    <div className="container">
                        <div style={{ marginTop: '2em', display: 'inline-block' }}>
                            {data.map((item, i) => {
                                return (
                                    <div className="owl-item cloned col-lg-3 col-xs-6" key={item.id}>
                                        <SlideItem item={item} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="text-center">
                            <Pagination
                                activePage={this.state.page}
                                itemsCountPerPage={10}
                                totalItemsCount={this.state.total}
                                pageRangeDisplayed={5}
                                onChange={this._handlePageChange}
                            />
                        </div>
                    </div>

                </div>

            </React.Fragment>


        ) || <div />;
    }
    _renderBreadcrumbs = () => {
        const {meta , tags} = this.state;
        let tags_info = meta.tags ? meta.tags : [];
        let data = [];
        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < tags_info.length; j++) {
                if(tags_info[j].slug == tags[i]) {
                    if(i == tags.length - 1)
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
        const {tags , per_page} = this.state;        
        let p = page != '' ? page : this.state.page;
        if(tags.length > 0){
            let data = await this.props.get_movie_filter(tags,per_page, p);
            let res = data.payload.data;
            await this.setState({
                data: res.info.data,
                total: res.info.total,
                per_page: res.info.per_page,
                meta:res.meta,
            });
        }
    }
    _handlePageChange = async (pageNumber) => {
        await this.setState({ page: pageNumber });
        this._getDataPage(pageNumber);
    }
    _resetDataPage = async () => {
        await this.setState({
            data: [],
            tags: [],
            page: 1,
            per_page: 12,
            total: 0,
            meta:[],
        });
    }
}
const mapStateToProps = ({ movie_results, loading_results }) => {
    return Object.assign({}, movie_results, loading_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_movie_filter: MovieAction.get_movie_filter,
        // get_detail_movie: MovieAction.get_detail_movie,
        // get_linkplay_movie: MovieAction.get_linkplay_movie,
        // get_hot_retail_movies: MovieAction.get_hot_retail_movies,
        // get_hot_series_movies: MovieAction.get_hot_series_movies,
        set_loading: LoadingAction.set_loading,

    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters));