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

function descendingComparator(a, b, orderBy) {

    

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

        }else{
            return 0;
        }
    }else{
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

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

function generateVectorList(row) {
    var vectList = []
    if (row.vectors) {
        row.vectors.forEach(x => {

            if (x.scopeAvId) {
                var vectorString = <div> [{x.avId}] {x.avName} under the scope of [{x.scopeAvId} {x.scopeAvName}</div>

            } else {
                var vectorString = <div> [{x.avId}] {x.avName}</div>
            }

            vectList.push(vectorString)

        })
        return vectList
    }

}

function generateSafeguardsList(row) {
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
    if (label == "attack") {
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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell align="left"><div>{row.title}</div></TableCell>
                <TableCell component="th" scope="row">
                    <a href={row.link} target="_blank" >{row.link.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g) + "/..."}</a>
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
                    id: "link",
                    label: "Link"
                },
                {
                    id: "year",
                    label: "Year"
                },
                {
                    id: "ecosystems",
                    label: "Ecosystem"
                }
            ],
            headCellsNotSortable: [
                {
                    id: "vector",
                    label: "Related Attack Vector"
                },
                {
                    id: "safeguards",
                    label: "Related Safeguards"
                },
                {
                    id: "tags",
                    label: "Tags"
                },
                {
                    id: "package",
                    label: "Affected Packages"
                }
            ]
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleRequestSort = this.handleRequestSort.bind(this)
    }

    handleClick() {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
        if (!this.state.sidebarOpen) {
            document.getElementById('tableWrapperDiv').style.marginLeft = "310px"

        } else {
            document.getElementById('tableWrapperDiv').style.marginLeft = "10px"

        }

    }



    handleRequestSort = (event, property) => {
        

        const isAsc = this.state.orderBy === property && this.state.order === 'asc';

        isAsc ? this.setState({ order: "desc" }) : this.setState({ order: "asc" });
        this.setState({ orderBy: property })
        this.setState({ data: this.state.data.sort(getComparator(this.state.order, this.state.orderBy)) })
        
        //this.setState({data: stableSort(this.state.data, getComparator(this.state.order, this.state.orderBy))})

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
                                The following references describe peer-review papers, standards, master/PhD thesis, as well as real-world attacks and vulnerabilities that could result in supply chain attacks.
                                <br></br>
                                Comparable datasets related to real-world attacks are the <a href="https://dasfreak.github.io/Backstabbers-Knife-Collection/" target="_blank">Backstabber's Knife Collection</a> and the <a href="https://github.com/IQTLabs/software-supply-chain-compromises" target="_blank">Supply Chain Compromises</a> maintained by IQT Labs.
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