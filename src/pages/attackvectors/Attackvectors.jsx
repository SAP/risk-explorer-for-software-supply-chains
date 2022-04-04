import "./attackvectors.css"
import React, { Component, useState } from 'react'
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
import attacktable from '../../data/attackvectors.json'
import referencestable from '../../data/references.json'
import safeguardstable from '../../data/safeguards.json'
import SGModal from "../../components/modal/Modal";
import parse from 'html-react-parser';
import Chip from '@mui/material/Chip';


function referencesListConstructor(row) {

    var chipsList = []
    var referencesList = []
    var foundReferences = referencestable.filter(element => element.vectors && element.vectors.some(x => x.avId === row.avId))

    for (var i = 0; i < foundReferences.length; i++) {
        if (foundReferences[i].tags.contents) {
            foundReferences[i].tags.contents.forEach((e) => {
                if (e === "attack") {
                    chipsList.push(<Chip label={e} size="small" color="error" />)
                } else if (e === "peer-reviewed") (
                    chipsList.push(<Chip label={e} size="small" color="primary" />)
                )

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
    const [isOpen, setIsOpen] = useState(false);    // Modal state
    const [sgDesc, setSgDescr] = useState("");    // Safeguard description
    const [sgID, setSgID] = useState("");    // 
    const [sgName, setSgName] = useState("");    // 
    const [sgType, setSgType] = useState("");    // 
    const [stakeholdersRole, setStakeholdersRole] = useState("");    // 



    function buildSafeguardModal(e) {
        /*
         * Fill the modal with information about the selected safeguard
         */

        var found = safeguardstable.find(element => element.sgId === e)
        var sgtypestring = ""
        var sgtype = []
        var stakeholdersRoleContent = []

        setSgDescr(found.info[0].Description)
        setIsOpen(true);
        setSgID(found.sgId)
        setSgName(found.sgName)
        if (found.info[0]["Directive"] === true) {
            sgtype.push("Directive")
        }
        if (found.info[0]["Preventive"] === true) {
            sgtype.push("Preventive")
        }
        if (found.info[0]["Detective"] === true) {
            sgtype.push("Detective")
        }
        if (found.info[0]["Corrective"] === true) {
            sgtype.push("Corrective")
        }
        if (found.info[0]['Project Maintainer']) {
            stakeholdersRoleContent.push(< li><b>Project Maintainer: </b>{found.info[0]['Project Maintainer']}</li>)
        }
        if (found.info[0]['Administrator']) {
            stakeholdersRoleContent.push(<li><b>Administrator: </b>{found.info[0]['Administrator']}</li>)
        }
        if (found.info[0]["Downstream User"]) {
            stakeholdersRoleContent.push(<li><b>Consumer: </b>{found.info[0]["Downstream User"]}</li>)
        }

        setStakeholdersRole(<ul>{stakeholdersRoleContent}</ul>)

        for (var i = 0; i < sgtype.length; i++) {
            sgtypestring += sgtype[i]
            if (i === (sgtype.length - 1)) {
                break
            } else {
                sgtypestring += ", "
            }
        }
        setSgType(sgtypestring)
    }

    return (

        <>
         {isOpen && <SGModal sgID={sgID} sgName={sgName} open={isOpen} setIsOpen={setIsOpen} sgDescription={sgDesc} sgType={sgType}  stakeholdersRole={stakeholdersRole}/>}
        

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
                        {row["avId"]}
                    </TableCell>
                    <TableCell align="left">{row["avName"]}</TableCell>

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
                                                    {parse(infoRow["Description"])}
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
                            <Box sx={{ margin: 1 }} >
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
                            <Box sx={{ margin: 1 }} >
                                <Typography variant="h6" gutterBottom component="div">
                                    Mapped Safeguards
                                </Typography>
                                <Table size="small" aria-label="purchases">

                                    <TableBody>
                                        {row.info[0]['Mapped Safeguard'].map((sg) => (
                                            <TableRow key={sg.sgId}>
                                                <TableCell component="th" scope="row">

                                                    <a href={() => false} style={{ cursor: 'pointer' }} onClick={((e) => buildSafeguardModal(sg.sgId))}>[{sg.sgId}] {safeguardstable.filter(e => e.sgId === sg.sgId)[0].sgName}</a>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        </>
    );
}


class Attackvectors extends Component {

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
            document.getElementById('attacktableWrapperDiv').style.marginLeft = "310px"

        } else {
            document.getElementById('attacktableWrapperDiv').style.marginLeft = "10px"

        }

    }






    render() {
        
        return (
            <div className="home">
                <Topbar handleClickTopbar={this.handleClick} />

                <div className="container">
                    <Sidebar open={this.state.sidebarOpen} />
                    <div className="tableWrapper" id="attacktableWrapperDiv" >
                        <Box sx={{ width: '65%', maxWidth: "65%", display: "block", marginLeft: 'auto', marginRight: "auto", marginTop: "2%" }}>
                            <Typography variant="h2" gutterBottom component="div">Attack Vectors List</Typography>

                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                                            <TableCell align="left" style={{ fontWeight: "bold" }}>Attack Vector</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attacktable.map((row) => (
                                            <Row key={row["avName"]} row={row} />
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

export default Attackvectors;