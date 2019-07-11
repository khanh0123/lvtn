import React from "react";
class Loading extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title:'Chào mừng bạn đến với Movie Star. Vui lòng đợi trong giây lát ..',
            type:props.type ? props.type : 1,
        }
    }
    render() {
        let {type} = this.state
        return type == 1 && (
            <div className="preloader" >
                <div className="preloader-wraper">
                    <div className="preloader-lod" />
                    <div className="preloader-lod" />
                    <div className="preloader-lod" />
                    <div className="preloader-loding">{this.state.title}</div>
                    <div className="large-square" />
                </div>
                
            </div>

        ) || <div className="preloader-small"><div className="lds-dual-ring" ></div></div>
    }
}

export default Loading;