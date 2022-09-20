import React, { Component } from 'react'
import Select, { components, ControlProps } from 'react-select'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const styles = {
    container: base => ({
        ...base,
        flex: 1,
        width: "95%",
        position: "absolute",
        top: "60px",
        left: "1px",
        right: "20px"
    })
};

function createData(name, collapsed, expanded, meaning) {
    return { name, collapsed, expanded, meaning };
}

const rows = [
    createData("User Compromise",
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
            <g fill="lightcoral" stroke="firebrick">

                <circle cx="50" cy="10" class="node" r="10" />

            </g>
        </svg>,

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
            <g fill="url(&quot;#pattern-stripe&quot;)" stroke="firebrick">

                <circle cx="50" cy="10" class="node" r="10" />

            </g>
        </svg>

        , "Attack vectors related to the compromise of a user"),

    createData("System Compromise",
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
            <g fill="darkseagreen" stroke="darkgreen">

                <circle cx="50" cy="10" class="node" r="10" />

            </g>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
            <g fill="url(&quot;#Triangle&quot;)" stroke="darkgreen">

                <circle cx="50" cy="10" class="node" r="10" />

            </g>
        </svg>
        , "Attack vectors related to the compromise of a system"),


    createData("Social Engineering",
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
       
    </svg>, 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
        <g fill="url(&quot;#vertical-stripe&quot;)" stroke="gold">

            <circle cx="50" cy="10" class="node" r="10"/>

        </g>
    </svg>, "Attack vectors related to social-engineering attack on project maintainer or the change of ethos of the maintainer him/herself"),

createData("Social Engineering",
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
   
</svg>, 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
    <g fill="white" stroke="steelblue" stroke-dasharray="5px, 3px">

        <circle cx="50" cy="10" class="node" r="10"/>

    </g>
</svg>, "Recursion to the root node"),
];



class Legend extends Component {





    render() {
        return (
            <Box sx={{ width:"100%", maxHeight: "5%" }} styles={styles}>

                <Paper elevation={3} >
                    <TableContainer component={Paper} style={{ maxHeight: "30vh" }}>
                        <Table  aria-label="simple table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="15%" align="center">Collapsed</TableCell>
                                    <TableCell width="15%" align="center">Expanded</TableCell>
                                    <TableCell width="70%">Meaning</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                       
                                    >
                                        <TableCell align="center">{row.collapsed}</TableCell>
                                        <TableCell align="center">{row.expanded}</TableCell>
                                        <TableCell align="left" style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}>{row.meaning}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </Box>
        )
    }

}

export default Legend;