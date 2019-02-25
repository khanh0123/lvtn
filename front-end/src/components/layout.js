import React from 'react';
import { withRouter } from "react-router";
import Header from './header/Header';
import Footer from './footer/Footer';
// import Loading from "./others/Loading";

class Layout extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            
            window.scrollTo(0, 0);
        //     window.setLoading();
        //     setTimeout(() => {
        //         window.unSetLoading();
        //     }, 500);
        }
    }
    componentDidMount(){   
        window.scrollTo(0, 0);     
    }

    render() {
        return (
			<div className="App">
				
				<Header />
				{this.props.children}
				<Footer />
				<div className="to-top" id="back-top">
					<i className="fa fa-angle-up"></i>
				</div>
				{/* <Loading/> */}
			</div>
		);
    }
}

// function Layout(props){

//     useEffect(() => {
//         // console.log(props);
        
//         // if(props.location.pathname !== prevProps.location.pathname)
//         window.scrollTo(0, 0);
//     });

//     return (
//         <div className="App">
            
//             <Header />
//             {props.children}
//             <Footer />
//             <div className="to-top" id="back-top">
//                 <i className="fa fa-angle-up"></i>
//             </div>
//             {/* <Loading/> */}
//         </div>
//     );
// }
  
export default withRouter(Layout);