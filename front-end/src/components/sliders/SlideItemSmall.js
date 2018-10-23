import React from "react";
import { Link } from "react-router-dom";

class SlideItemSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item:{}
        }
    }
    componentDidMount(){
        if(this.props.item) {
            this.setState({item:this.props.item});
        }
    }
    render() {
        return (
            <div className="plylist-single">
                <div className="plylist-img">
                    <img src="/assets/images/new-movie/small-1.jpg" alt="" />
                </div>
                <div className="plylist-single-content">
                    <Link to="/phim/abc-123" >Phim Hay</Link>
                    <div className="view-movi">
                        <a href="">15k view</a>
                    </div>
                    <ul>
                        <li className="novie-upload-time"><a href="">1 Month Ago</a></li>
                        <li className="movie-time"><a href="">1:20:30</a></li>
                    </ul>
                </div>
            </div>


        )
    }
}

export default SlideItemSmall;