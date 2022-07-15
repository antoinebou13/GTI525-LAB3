import { Component } from "react";
import './Banner.css'

class Banner extends Component{
    render() {
        return(
            <div className='Banner'>
                <div className="container">
                    <h1 className="title">
                        <span className="title-word title-word-1">BIENVENUE </span>
                        <span className="title-word title-word-2">SUR </span>
                        <span className="title-word title-word-3">VÉLO </span>
                        <span className="title-word title-word-4">+ !!!</span>
                    </h1>
                </div>
            </div>
        )
    }
}

export default Banner;