import "./home.css"
import React, { Component } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import MouseIcon from '@mui/icons-material/Mouse';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import spartaLogo from '../../images/sparta-logo.png'
import sapLogo from '../../images/SAP_R_grad_scrn.png'
import assuremossLogo from '../../images/assuremoss_logo.png'
import {ReactComponent as  AttacktreeImage} from '../../images/attackgraph.svg'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const boxStyle = {
    backgroundImage: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 121, 104, 1) 79%, rgba(88, 156, 228, 1) 100%)',
    opacity: '87%',
    width: "100vw",
    minHeight: "100vh",
    marginLeft: '0px',


}

const boxStyle2 = {
    backgroundColor: 'white',
    opacity: '90%',
    width: "100vw",
    minHeight: "87vh",
    marginLeft: '0px',
    display: "flex",
    position: "relative"
}

const boxStyle3 = {
    backgroundImage: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 121, 104, 1) 79%, rgba(88, 156, 228, 1) 100%)',
    width: "100vw",
    minHeight: "10vh",
    marginBottom: '0px',
    marginLeft: '0px',
    marginTop: '10px'
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, 0)",
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
  }));


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {

        this.setState({ sidebarOpen: !this.state.sidebarOpen });
        if (!this.state.sidebarOpen) {

            document.getElementById('homeWrapperDiv').style.marginLeft = "310px"

        } else {
            document.getElementById('homeWrapperDiv').style.marginLeft = "0px"

        }
    }



    render() {
        return (
            <div className="home">
                <Topbar handleClickTopbar={this.handleClick} sidebarState={this.state.sidebarOpen} />

                <div className="container">
                    <Sidebar open={this.state.sidebarOpen} />
                    <div className="tableWrapper" id="homeWrapperDiv">

                        <Box sx={boxStyle}>

                            {/* Box for the title, tree image, description and button to the taxonomy */}

                            <Grid container spacing={2}>
                                <Grid item xs={2}>

                                </Grid>
                                <Grid item xs={5}>

                                    <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 0 0'}}
                                        {...({ timeout: 2000 } )}
                                    >
                                        {
                                            <h1 style={{ color: "white", fontSize: "8vh", fontWeight: 'normal', marginTop: "50px", padding: "2% 0%", }}><p style={{ color: "white", fontSize: "86px",  fontWeight: 'light', marginTop: "50px", whiteSpace:'nowrap', display:'inline'}}>Risk Explorer</p></h1>
                                           
                                        }
                                    </Grow>
                                    
                                    <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 0 0'}}
                                        {...({ timeout: 2000 } )}
                                    >
                                        {
                                            <p style={{ color: "white", fontSize: "48px", fontWeight: 'light' }}>for Software Supply Chains</p>
                                        }
                                    </Grow>

                                    <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 0 0'}}
                                        {...({ timeout: 2500 } )}
                                    >
                                    <p style={{ fontSize: "16px", fontWeight: 'lighter', textAlign: "left", color: "white", padding: "10% 10%" }}>
                                        
                                        <br /><br />
                                        This page presents a taxonomy of known attacks and techniques to inject malicious code into open-source software projects.
                                        <br></br>
                                        A so-called attack tree is used to organize those techniques hierarchically, starting from
                                        the abstract, top-level goal down to alternative and more concrete attack techniques.
                                        <br></br>
                                        This information has been compiled on the basis of numerous real-world incidents, i.e. actual attacks
                                        and vulnerabilities, as well as plausible proof-of-concepts and scientific literature.
                                        <br></br>
                                        The page also documents safeguards to fully or partially mitigate the different attack techniques,
                                        thereby referencing existing standards and frameworks.
                                        <br></br><br></br>

                                        <Box
                                            sx={{
                                                p: 2,
                                                display: 'grid',
                                                gridTemplateColumns: { md: '1fr 1fr' },
                                                gap: 2,
                                            }}
                                            >
                                            <Item key={1} elevation={0}>
                                                {<Link style={{ color: 'white', textDecoration: 'inherit' }} to="/attacktree">
                                                    <Button variant="outlined" startIcon={<VideogameAssetIcon />} size='medium' color='info' style={{width: "300px" }}>

                                                        Explore the Attack Tree
                                                    </Button>
                                                </Link>}
                                                </Item>
                                            <Item key={2} elevation={0}>
                                                { <a style={{ color: 'white', textDecoration: 'inherit'}} href="https://www.computer.org/csdl/proceedings-article/sp/2023/933600a167/1He7XSTyRKE" target='_blank' rel="noreferrer">
                                            <Button variant="outlined" startIcon={<ArticleIcon />} size='medium' color='info' style={{width: "300px" }}>

                                                Read the Taxonomy Paper
                                            </Button>
                                        </a>}
                                                </Item>


                                            </Box>
                                        
                                
                                        
                                       
                                    </p>

                                    </Grow>
                                </Grid>
                                <Grid item xs={4}>
                                <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 100 20'}}
                                        {...({ timeout: 3000 } )}
                                    >
                                        {
                                                <AttacktreeImage style={{position:'absolute', width:'50%',right:'0'}}></AttacktreeImage>
                                        }
                                    </Grow>

                                </Grid>


                            </Grid>


                        </Box>

                        <Box sx={boxStyle2} >

                            {/* Box for the footer */}


                            <Grid container spacing={2}sx={{ marginTop: "20px" , marginBottom: "30px"}}>
                                <Grid item xs={12} >
                                    <Grid container justifyContent="center" spacing={8}>

                                        <Grid key={3} item>
                                            <Paper elevation={5} sx={{ height: 600, width: 500, marginTop: '10%', textAlign: 'center' }}>
                                                <NotListedLocationIcon sx={{ fontSize: "60px", color: 'rgba(2, 0, 36, 1)', marginTop: '10%' }} />
                                                <h1 style={{ color: "#555", fontWeight: 'normal', fontSize: "48px", padding: "0%", marginTop: '5%' }}>Why</h1>
                                                <p style={{fontSize: '16px', fontWeight: 'lighter', color: "#555", padding: "5%" }}>
                                                    We found that existing works on open-source supply chain
                                                    security lack a comprehensive, comprehensible, and general description of how
                                                    attackers inject malicious code into open-source projects, linked to real-world incidents and independent of
                                                    specific programming languages, ecosystems, technologies and stakeholders.
                                                    <br></br><br></br>
                                                    We believe a taxonomy classifying such attacks is of value for both
                                                    academia and industry. Serving as a common reference and clarifying terminology,
                                                    it could support several activities, e.g. awareness-raising, safeguard development,
                                                    pentest scoping or threat modeling.
                                                </p>
                                            </Paper>
                                        </Grid>

                                        <Grid key={4} item>
                                            <Paper elevation={5} sx={{ height: 600, width: 500, marginTop: '10%', textAlign: 'center' }}>
                                                <MouseIcon sx={{ fontSize: "60px", marginTop: '10%', color: 'rgba(9, 121, 104, 1)' }} />

                                                <h1 style={{ color: "#555", fontWeight: 'normal', fontSize: "48px", marginTop: '5%' }}>How to Use</h1>
                                                <p style={{ fontSize: '16px', fontWeight: 'lighter', color: "#555", padding: "5%" }}>
                                                    Explore the taxonomy with help of the visualization tool: 
                                                    <br></br>Single-click
                                                    on a node to expand or collapse it, and to show associated information like its description,
                                                    references, associated examples and related countermeasures.

                                                    <Box sx={{ '& button': { m: 1 } }} style={{ marginTop: "5%" }}>
                                                        <div>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <Link style={{ color: 'white', textDecoration: 'inherit' }} to="/attacktree">
                                                                        <Button variant="outlined" style={{ width: '200px' }} size='large'>

                                                                            <VideogameAssetIcon />
                                                                        </Button>
                                                                    </Link>

                                                                    <p>Explore the Attack Tree</p>
                                                                    
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Link style={{ color: 'white', textDecoration: 'inherit' }} to="/documentation#oss-supp-model">
                                                                        <Button variant="outlined" style={{ width: '200px' }} size='large'>
                                                                            <WidgetsIcon />

                                                                        </Button>
                                                                    </Link>
                                                                    <p> Read about the open-source supply chain model (stakeholders, systems and interactions)</p>
                                                                </Grid>

                                                            </Grid>


                                                        </div>

                                                    </Box>
                                                </p>
                                            </Paper>
                                        </Grid>

                                        <Grid key={5} item>
                                            <Paper elevation={5} sx={{ height: 600, width: 500, marginTop: '10%', textAlign: 'center' }}>
                                                <CodeIcon sx={{ fontSize: "48px", marginTop: '10%', color: 'rgba(88, 156, 228, 1)' }} />
                                                <h1 style={{ color: "#555", textAlign: 'center', fontWeight: 'normal', fontSize: "48px", marginTop: '5%' }}>Contribute</h1>
                                                <p style={{ fontSize: "1 vw", textAlign: "center", fontWeight: 'lighter', color: "#555", padding: "5%" }}>
                                                    The data model underlying the visualization comprises attack vectors, safeguards and references, all associated to one another.
                                                    <Box sx={{ '& button': { m: 1 } }} style={{ marginTop: "70px" }}>
                                                        <div>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <Link style={{ color: 'white', textDecoration: 'inherit' }} to="/documentation#jsondata">
                                                                        <Button variant="outlined" style={{ width: '200px' }} size='large'>

                                                                            <ArticleIcon />
                                                                        </Button>
                                                                    </Link>

                                                                    <p>Read about the JSON files and their structure</p>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <a style={{ color: 'white', textDecoration: 'inherit' }} href="https://github.com/SAP/risk-explorer-for-software-supply-chains" target='_blank' rel="noreferrer">
                                                                        <Button variant="outlined" style={{ width: '200px' }} size='large'>

                                                                            <GitHubIcon />
                                                                        </Button>
                                                                    </a>
                                                                    <p> Create pull requests to add real-life examples or other improvements</p>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Box>
                                                </p>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={boxStyle3} >
                            {/* Box for the footer */}
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                <a className="logo"  href="https://www.sap.com/" target="_blank" rel="noreferrer"><img style={{width:"80px", left:"0", marginLeft:"1%", marginTop:'.3%'}} src={sapLogo} alt="SAP Logo" /></a>
                                </Grid>
                                <Grid item xs={2}>

                                <a className="logo"  href="https://www.sparta.eu/" target="_blank" rel="noreferrer"><img style={{width:"80px", marginLeft:"130%", marginTop:'.3%'}} src={spartaLogo} alt="SPARTA Logo" /></a>
                                </Grid>
                                
                                <Grid item xs={2}>

                                <a className="logo"  href="https://assuremoss.eu/" target="_blank" rel="noreferrer"><img style={{width:"100px", marginLeft:"60%", marginTop:'.2%'}} src={assuremossLogo} alt="AssureMOSS Logo" /></a>
                                </Grid>
                                

                                
                              
                                <Grid item xs={9}>
                                <p style={{color:"white",fontSize:"12px",fontWeight:"light",marginLeft:"1%", marginBottom:".4%"}}> Copyright (c) 2022 SAP SE or an SAP affiliate company and Risk Explorer for Software Supply Chains contributors</p>
                                </Grid>
                                <Grid item xs={3}>
                                <p style={{color:"white",fontSize:"12px", fontWeight:"light", textAlign:"right", marginRight:"4%", marginBottom:".4%"}}> This project is partially funded by the EU Horizon 2020 projects SPARTA (Grant Agreement No. 830892) and AssureMOSS (Grant Agreement No. 952647)</p>

                                </Grid>
                            </Grid>
                        </Box>




                    </div>

                </div>
            </div>
        )
    }
}

export default Home;
