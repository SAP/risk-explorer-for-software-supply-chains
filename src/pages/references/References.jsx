import "./references.css"
import React, { Component } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import referencestable from '../../data/references.json'
import Chip from '@mui/material/Chip';
import TableSortLabel from '@mui/material/TableSortLabel';


function generateVectorList(row) {
    // Creates the list of attack vectors related to the reference
    var vectList = []
    var vectorString
    if (row.vectors) {
        row.vectors.forEach(x => {

            if (x.scopeAvId) {
                vectorString = <div> [{x.avId}] {x.avName} in the scope of [{x.scopeAvId}] {x.scopeAvName}</div>
            } else {
                vectorString = <div> [{x.avId}] {x.avName}</div>
            }
            vectList.push(vectorString)

        })
        return vectList
    }

}

function generateSafeguardsList(row) {
    // Creates the list of safeguards related to the reference
    var sgList = []
    if (row.safeguards) {
        row.safeguards.forEach(x => {
            var safeguardsString = <div> [{x.sgId}] {x.sgName}</div>
            sgList.push(safeguardsString)
        })
        return sgList
    }

}

function generateEcosystemList(row) {
    var ecosystemList = []

    if (row.tags) {
        if (row.tags.ecosystems) {
            row.tags.ecosystems.forEach(x => ecosystemList.push(<div>{x}</div>))
        }

    }
    return ecosystemList
}

function createTagChip(label) {
    if (label === "attack") {
        return <Chip label={label} size="small" color="error" />
    } else if (label === "peer-reviewed") {
        return <Chip label={label} size="small" color="primary" />
    } else {
        return <Chip label={label} size="small" color="default" />
    }
}

function generateTags(row) {
    var tagsList = []
    if (row.tags) {
        if (row.tags.contents) {
            row.tags.contents.forEach(x => tagsList.push(createTagChip(x))
            )
        }
    }
    return tagsList

}

function generateAffectedPackagesList(row) {
    var affectedPackagesList = []
    if (row.tags) {
        if (row.tags.packages) {
            row.tags.packages.forEach(x => affectedPackagesList.push(<div>{x}</div>))
        }

    }
    return affectedPackagesList
}

function descendingComparator(a, b, orderBy) {
    // Sorting function modified starting from https://mui.com/components/tables/#sorting-amp-selecting
    if (orderBy === 'year' || orderBy === 'ecosystems') {
        if (b['tags'] && a['tags']) {

            if (!b['tags'][orderBy]) {
                return -1
            }
            if (!a['tags'][orderBy]) {
                return 1
            }
            if (b['tags'][orderBy] < a['tags'][orderBy]) {

                return -1;
            }
            if (b['tags'][orderBy] > a['tags'][orderBy]) {
                return 1;
            }
            return 0;

        } else {
            return 0;
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }


}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function Row(props) {
    const { row } = props;


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell align="left">
                    <div>{row.title}</div>
                    <div><a href={row.link} target="_blank" rel="noreferrer">{row.link.match(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/g) + "/..."}</a></div>
                </TableCell>
                <TableCell align="left">{row.tags && row.tags.year ? row.tags.year : ""}</TableCell>
                <TableCell align="left">{generateEcosystemList(row)}</TableCell>
                <TableCell align="left">{
                    generateVectorList(row)

                }</TableCell>
                <TableCell align="left">{
                    generateSafeguardsList(row)

                }</TableCell>
                <TableCell align="left">{
                    generateTags(row)
                }</TableCell>
                <TableCell align="left">{
                    generateAffectedPackagesList(row)
                }</TableCell>

            </TableRow>
        </React.Fragment>
    );
}

class References extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            order: 'asc',
            orderBy: 'title',
            visuallyHidden: false,
            data: referencestable,
            headCellsSortable: [
                {
                    id: "title",
                    label: "Title"
                },
                {
                    id: "year",
                    label: "Year"
                },
                {
                    id: "ecosystems",
                    label: "Ecosystem(s)"
                }
            ],
            headCellsNotSortable: [
                {
                    id: "vector",
                    label: "Related Attack Vector(s)"
                },
                {
                    id: "safeguards",
                    label: "Related Safeguard(s)"
                },
                {
                    id: "tags",
                    label: "Tags"
                },
                {
                    id: "package",
                    label: "Affected Package(s)"
                }
            ]
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleRequestSort = this.handleRequestSort.bind(this)
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


    // Handler for sorting the rows 
    handleRequestSort = (event, property) => {

        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        isAsc ? this.setState({ order: "desc" }) : this.setState({ order: "asc" });
        this.setState({ orderBy: property })
        this.setState({ data: this.state.data.sort(getComparator(this.state.order, this.state.orderBy)) })

    };





    render() {
        return (
            <div className="home">
                <Topbar handleClickTopbar={this.handleClick} sidebarState={this.state.sidebarOpen} />

                <div className="container">
                    <Sidebar open={this.state.sidebarOpen} />
                    <div className="tableWrapper" id="tableWrapperDiv" >
                        <Box sx={{ width: '65%', maxWidth: "65%", display: "block", marginLeft: 'auto', marginRight: "auto", marginTop: "2%" }}>
                            <Typography variant="h2" gutterBottom component="div">References</Typography>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                All of the references below relate in one way or the other to software supply chain security, e.g. by describing real-world attacks or vulnerabilities, analyzing ecosystem weaknesses, presenting proof-of-concepts or suggesting safeguards.
                                References are linked to attack vectors and safeguards where applicable, and tags like &quot;peer-reviewed&quot; or &quot;attack&quot; are used to categorize the content.
                                Though the names of affected open-source projects and packages are provided in the last table column, supporting lookups, we do not strive for completeness.
                                In this context, also refer to other data sets related to real-world attacks, e.g. the <a href="https://dasfreak.github.io/Backstabbers-Knife-Collection/" target="_blank" rel="noreferrer">Backstabber's Knife Collection</a> or IQT Labs' <a href="https://github.com/IQTLabs/software-supply-chain-compromises" target="_blank" rel="noreferrer">Supply Chain Compromises</a>.
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>

                                            {this.state.headCellsSortable.map((headCell) => (
                                                <TableCell
                                                    key={headCell.id}
                                                    align={'left'}
                                                    sortDirection={this.state.orderBy === headCell.id ? this.state.order : false}
                                                >
                                                    <TableSortLabel
                                                        active={this.state.orderBy === headCell.id}
                                                        direction={this.state.orderBy === headCell.id ? this.state.order : 'desc'}
                                                        onClick={(event) => this.handleRequestSort(event, headCell.id)}
                                                    >
                                                        {headCell.label}

                                                    </TableSortLabel>
                                                </TableCell>
                                            ))}
                                            {this.state.headCellsNotSortable.map((headCell) => (
                                                <TableCell align="left" >{headCell.label}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {

                                            this.state.data.map((row) => (
                                                <Row key={row["link"]} row={row} />
                                            ))

                                        }
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

export default References;