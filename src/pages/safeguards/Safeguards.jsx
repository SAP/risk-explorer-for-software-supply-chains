import "./safeguards.css"
import React, { Component } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import safeguardstable from '../../data/safeguards.json'
import parse from 'html-react-parser';
import Chip from '@mui/material/Chip';
import referencestable from '../../data/references.json'


function referencesListConstructor(row) {

  
    var chipsList = []          // List to hold the set of tags per-reference
    var referencesList = []     // List to hold the set of references per-safeguard

    // Collect the refs from the references table related to the specific safeguard
    var foundReferences = referencestable.filter(element => element.safeguards && element.safeguards.some(x => x.sgId === row.sgId))

    for (var i = 0; i < foundReferences.length; i++) {

        if (foundReferences[i].tags.contents) {     // Create the set of tags per reference
            foundReferences[i].tags.contents.forEach((e) => {
                if (e === "attack") {
                    chipsList.push(<Chip label={e} size="small" color="error" />)
                } else if (e === "peer-reviewed") {
                    chipsList.push(<Chip label={e} size="small" color="primary" />)
                } else if (e === "standard") {
                    chipsList.push(<Chip label={e} size="small" color="default" />)
                }
            })
        }

        referencesList.push(
            <TableRow key={foundReferences[i].title}>
                <TableCell component="th" scope="row">
                    <a href={foundReferences[i].link} target="_blank" rel="noreferrer">{foundReferences[i].title}</a>&nbsp;{chipsList}
                </TableCell>
            </TableRow>
        );
        chipsList = []
    }

    return referencesList

}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row["sgId"]}
                </TableCell>
                <TableCell align="left">{row["sgName"]}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Description
                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableBody>
                                    {row.info.map((infoRow) => (
                                        <TableRow key={infoRow["Description"]}>
                                            <TableCell component="th" scope="row">
                                                <p>{parse(infoRow["Description"])}</p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                References
                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableBody>
                                    {
                                        referencesListConstructor(row)
                                    }
                                   
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Control Type
                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableBody>
                                    {
                                        <TableRow key={1}>
                                            <TableCell component="th" scope="row">
                                            {row.info[0]['Directive']? <p>Directive</p> : <p></p>}
                                            {row.info[0]['Preventive']? <p>Preventive</p> : <p></p>}
                                            {row.info[0]['Detective']? <p>Detective</p> : <p></p>}
                                            {row.info[0]['Corrective']? <p>Corrective</p> : <p></p>}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Stakeholders Role
                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableBody>
                                    {
                                        <TableRow key={1}>
                                            <TableCell component="th" scope="row">
                                            <ul>
                                            {row.info[0]['Project Maintainer']? <li><b>Project Maintainer: </b>{row.info[0]['Project Maintainer']}</li> : <></>}
                                            {row.info[0]['Administrator']? <li><b>Administrator: </b>{row.info[0]['Administrator']}</li> : <></>}
                                            {row.info[0]["Downstream User"]? <li><b>Downstream User: </b>{row.info[0]["Downstream User"]}</li> : <></>}

                                            </ul>
                                           
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            
            
        </React.Fragment>
    );
}

class Safeguards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }


    // Handler for the opening of the sidebar
    handleClick() { 
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
        if (!this.state.sidebarOpen) {
            document.getElementById('tableWrapperDiv').style.marginLeft = "310px"

        } else {
            document.getElementById('tableWrapperDiv').style.marginLeft = "10px"

        }

    }


    render() {
        
        return (
            <div className="home">
                <Topbar handleClickTopbar={this.handleClick} />

                <div className="container">
                    <Sidebar open={this.state.sidebarOpen} />
                    <div className="tableWrapper" id="tableWrapperDiv" >
                    <Box sx={{width: '65%', maxWidth: "65%", display: "block", marginLeft: 'auto', marginRight: "auto", marginTop:"2%" }}>
                    <Typography variant="h2" gutterBottom component="div">Safeguards List</Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                                        <TableCell align="left" style={{fontWeight:"bold"}}>Safeguard</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {safeguardstable.map((row) => (
                                        <Row key={row["sgName"]} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                    </div>

                </div>
            </div>
        )
    }
}

export default Safeguards;