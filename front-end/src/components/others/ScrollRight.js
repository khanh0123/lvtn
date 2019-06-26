import React from 'react';
import { getMovie } from "../helpers";
import { MovieAction } from "../../actions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SliderScroll from "../sliders/SliderScroll";


class ScrollRight extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hot_series_movies: [],
            hot_retail_movies: [],
        }        
    }
    componentDidMount() {
        getMovie(this, this.props, 'hot_series_movies', MovieAction);
        getMovie(this, this.props, 'hot_retail_movies', MovieAction);

    }

    render() {
        let { hot_series_movies, hot_retail_movies } = this.state;
        
        return (
            <React.Fragment>
                <SliderScroll title="Phim Lẻ Hot" data={hot_retail_movies} />
                <SliderScroll title="Phim Bộ Hot" data={hot_series_movies} />
            </React.Fragment>
        )
    }
    
}
const mapStateToProps = ({ movie_results }) => {
    return Object.assign({}, movie_results || {});
}

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        get_hot_series_movies: MovieAction.get_hot_series_movies,
        get_hot_retail_movies: MovieAction.get_hot_retail_movies,
    }, dispatch);
    return { ...actions, dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScrollRight));