import React, { Component } from 'react'
import "./sidebar.css"
import { SidebarData, SidebarDataAttack, SidebarDataBottom, SidebarDataDocumentation } from './SidebarData'
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { IoDocumentTextOutline } from 'react-icons/io5';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: props.open,
            listOpen: true,
            anchorId: ''
        }
        this.handleClickList = this.handleClickList.bind(this)
    }
    showSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });

    }

    componentWillReceiveProps(props) {
        this.setState({ sidebarOpen: props.open })
    }

    handleClickList() {
        this.setState({ listOpen: !this.state.listOpen });

    }


    scrollToDiv = (e) => {
    
        document.getElementById(e.split("#")[1]).scrollIntoView({ behavior: "smooth" });
        
    }


    render() {
        return (
            <div className={this.state.sidebarOpen ? 'sidebar active' : 'sidebar'} id="sidebar-wrapper">
                <div className="sidebarWrapper" >
                    <div className="sidebarMenu">
                        <List
                            sx={{ width: '100%', bgcolor: 'transparent' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"

                        >



                            {SidebarData.map((item, index) => {
                                return <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={item.path}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </Link>


                            })}

                            {SidebarDataAttack.map((item, index) => {
                                return <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={item.path}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </Link>


                            })}

                            {SidebarDataBottom.map((item, index) => {
                                return <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={item.path}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </Link>


                            })}



                            <ListItemButton onClick={this.handleClickList}>
                                <ListItemIcon>
                                    <IoDocumentTextOutline />
                                </ListItemIcon>
                                <ListItemText primary="Documentation" />
                                {this.state.listOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={this.state.listOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {SidebarDataDocumentation.map((item, index) => {
                                        return <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={{
                                            pathname: item.path,
                                            hash: item.hash,
                                            state: { fromDashboard: true }
                                        }} onClick={e => {this.scrollToDiv(item.hash)}} >
                                            <ListItemButton sx={{ pl: 4 }} >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        </Link>


                                    })}

                                </List>
                            </Collapse>






                        </List>



                    </div>
                </div>
            </div>
        )
    }

}

export default Sidebar;