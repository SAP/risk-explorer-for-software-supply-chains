import "./attacktree.css"
import React, { Component } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Taxonomy from "../../components/taxonomy/Taxonomy";
import attacktreedata from "../../data/taxonomy.json"



class Attacktree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
        if(!this.state.sidebarOpen){
            document.getElementById('taxonomyDiv').style.marginLeft = "300px"
            document.getElementById('taxonomyDiv').style.width = "80%"
            document.getElementById('featuredContainer').style.width = "88%"
            
        }else{
            document.getElementById('taxonomyDiv').style.marginLeft = "0px"
            document.getElementById('taxonomyDiv').style.width = "100%"
            document.getElementById('featuredContainer').style.width = "100%"
            
        }
    }

    render() {
        return (
            
            <div className="home">
                <Topbar handleClickTopbar={this.handleClick} sidebarState={this.state.sidebarOpen}/>

                <div className="container">
                    <Sidebar open={this.state.sidebarOpen} />
                    <Taxonomy data={attacktreedata} />
                </div>
            </div>
        )
    }
}

export default Attacktree;