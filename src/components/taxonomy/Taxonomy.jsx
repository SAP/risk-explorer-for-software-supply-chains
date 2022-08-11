import React, { useRef, useEffect, useState } from "react";
import "./taxonomy.css"
import { select, hierarchy, tree, zoom } from "d3"
import sg_table from "../../data/safeguards.json"
import SGModal from "../modal/Modal";
import AttackSearchbar from '../attacksearchbar/AttackSearchbar'
import SafeguardSearchbar from "../safeguardsearchbar/SafeguardSearchbar";
import Legend from '../legend/Legend'
import attackvectorstable from "../../data/attackvectors.json"
import attackexamplestable from "../../data/references.json"
import ShareIcon from '@mui/icons-material/Share';
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Chip from '@mui/material/Chip';
import parse from 'html-react-parser';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// A custom hook that builds on useLocation to parse
// the query string .
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

var firstLoad = true;

function Taxonomy({ data }) {

    const wrapperRef = useRef();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);  // Manage the state of the snackbar in the sidebar
    let query = useQuery();
    var avFromLink = query.get("av")

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // URL-related variables
    const location = useLocation();     // Object to process the current URL
    let currentUrlParams = new URLSearchParams(window.location.search);
    let navigate = useNavigate();

    // Safeguards-related states and variables
    const [isOpen, setIsOpen] = useState(false);    // Modal state
    const [sgDesc, setSgDescr] = useState("");    // Safeguard description
    const [sgReferences, setSgReferences] = useState("")
    const [sgID, setSgID] = useState("");    // Safeguard id 
    const [sgName, setSgName] = useState("");    // Safeguard name
    const [sgType, setSgType] = useState("");    // Safeguard type
    const [stakeholdersRole, setStakeholdersRole] = useState("");    // Stakeholders role for the safeguards

    // Attack vectors-related states and variables to
    // handle the display of attack vectors information
    const [avText, setAVText] = useState("Attack Vector");
    const [avLink, setAVLink] = useState(window.location.origin + window.location.pathname + "#" + location.pathname);
    const [descText, setDescText] = useState("Click on a node to show its info");
    const [, setRefText] = useState("");
    var referencesList = []
    const [examplesText, setExText] = useState("");
    const [safeguardsText, setSgText] = useState("");
    const [safeguardsInheritedText, setSgInheritedText] = useState("");
    const onPressHandler_av = attack => setAVText("[" + attack.avId + "] " + attack["avName"]);
    const onPressHandler_avLink = attack => setAVLink(window.location.origin + window.location.pathname + "#" + location.pathname + "?av=" + attack.avId);
    const onPressHandler_description = attack => setDescText(parse(attack.info[0].Description));

    // States for the searchbars (both safeguard and attack vectors)
    const [selectedSafeguard, setSelectedSafeguard] = useState("");
    const [selectedAttack, setSelectedAttack] = useState("");



    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
    };


    const onPressHandler_references = attack => {
        referencesList = []
        if (attack.info[0].Reference) {
            var listOfReferences = attack.info[0].Reference;
            for (var i = 0; i < listOfReferences.length; i++) {
                referencesList.push(<li key={i}><a href={listOfReferences[i].refLink} target="_blank" rel="noreferrer">{listOfReferences[i].refTitle}</a></li>);
            }

            setRefText(referencesList);
        } else {
            setRefText('');

        }
    }

    function findParentScope(node) {
        // This function traverse recursively the parent tree to find the
        // scope of an attack vector that recurs in multiple positions
        // (e.g., Exploit weak configuration, that can appear both in the
        // scope of tampering with VCS and in tampering build job
        var substIDCurrentNode = node.data.avId.substr(0, 4)
        var substIDParentNode = node.parent.data.avId.substr(0, 4)
        if (substIDCurrentNode !== substIDParentNode) {
            return node.parent
        } else {
            return findParentScope(node.parent)
        }
    }

    const onPressHandler_examples = attack => {

        var examplesList = []
        var attackID = attack.data.avId
        var chipsList = []
        var finalExamples = []



        var foundExamples = attackexamplestable.filter(element => element.vectors && element.vectors.some(x => x.avId === attackID))

        if (foundExamples.length !== 0) {
            console.log(foundExamples)

            foundExamples.forEach(function (example, index) {
                example.vectors.forEach(function (vector) {
                    if (vector.scopeAvId) {
                        var parentScope = findParentScope(attack)

                        if (vector.scopeAvId === parentScope.data.avId && !finalExamples.includes(foundExamples[index])) {

                            finalExamples.push(foundExamples[index])
                        }
                    } else {
                        if (!finalExamples.includes(foundExamples[index])) {
                            finalExamples.push(foundExamples[index])
                        }

                    }
                })

            })



            for (var i = 0; i < finalExamples.length; i++) {
                if (finalExamples[i].tags.contents) {
                    finalExamples[i].tags.contents.forEach((e) => {
                        if (e === "attack") {
                            chipsList.push(<Chip label={e} size="small" color="error" />)
                        } else if (e === "peer-reviewed") (
                            chipsList.push(<Chip label={e} size="small" color="primary" />)
                        )

                    })
                }


                examplesList.push(<li key={i}><a href={finalExamples[i].link} target="_blank" rel="noreferrer">{finalExamples[i].title}</a>&nbsp;{chipsList}</li>);
                chipsList = []
            }
            setExText(examplesList);
        } else {
            var examples_string = '';
            setExText(examples_string);
        }


    }



    const onPressHandler_safeguards = attackSafeguardsCollector => {
        var safeguardsList = []
        var textBuilder = []
        var safeguardsInheritedList = []
        var textBuilderInherited = []
        var mapped_safeguards, i, found
        setSgText(); // Clean the text of the safeguards
        attackSafeguardsCollector.forEach(element => {

            if (!element.avId) {
                setSgText();
                mapped_safeguards = element.match.info[0]["Mapped Safeguard"];

                for (i = 0; i < mapped_safeguards.length; i++) {

                    found = sg_table.find(x => x.sgId === mapped_safeguards[i].sgId)
                    safeguardsList.push(<li key={i}><a href={() => false} className="safeguardsLink" id={found.sgId} onClick={((e) => buildSafeguardModal(e))}>[{found.sgId}] {found.sgName}</a> </li>)

                }
                textBuilder.push(<span class="featuredTitle">Mapped safeguards<span className="featuredSub" id='av-safeguards'><ul>{safeguardsList}</ul></span></span>)
            }
            if (element.avId) {
                setSgInheritedText()
                mapped_safeguards = element.match.info[0]["Mapped Safeguard"];
                for (i = 0; i < mapped_safeguards.length; i++) {
                    found = sg_table.find(element => element.sgId === mapped_safeguards[i].sgId)
                    safeguardsInheritedList.push(<li key={i}><a href={() => false} className="safeguardsLink" id={found.sgId} onClick={((e) => buildSafeguardModal(e))}>[{found.sgId}] {found.sgName}</a> </li>)

                }
                textBuilderInherited.push(<span class="featuredTitle">Safeguards inherited from [{element.avId}] {element.avName}<span className="featuredSub" id='av-safeguards'><ul>{safeguardsInheritedList}</ul></span></span>)
                safeguardsInheritedList = []
            }

        });
        if (safeguardsList.length > 0) {
            setSgText(textBuilder);
        }

        setSgInheritedText(textBuilderInherited);

    }


    function buildSafeguardModal(e) {
        /*
         * Fill the modal with information about the selected safeguard
         */
        var found = sg_table.find(element => element.sgId === e.target.id)
        var sgtypestring = ""
        var sgtype = []
        var sgReferencesContent = []
        var stakeholdersRoleContent = []
        var chipsList = []
        setSgDescr(found.info[0].Description)


        // if (found.info[0]["References"].length > 0){
        //     found.info[0]["References"].forEach(x => sgReferencesContent.push(<a href={x.refLink} target="_blank">{x.refTitle}</a>))
        // }
        var references = attackexamplestable.filter(ref => ref.safeguards && ref.safeguards.some(x => x.sgId === e.target.id))
        references.forEach((e) => {
            if (e['tags']['contents'] && e['tags']['contents'].some(x => x === "attack")) {
                chipsList.push(<Chip label={'attack'} size="small" color="error" />)
            } else if (e['tags']['contents'] && e['tags']['contents'].some(x => x === "peer-reviewed")) {
                chipsList.push(<Chip label={'peer-reviewed'} size="small" color="primary" />)
            }
            sgReferencesContent.push(<div><a href={e.link} target="_blank" rel="noreferrer">{e.title}</a>&nbsp;{chipsList}</div>)
            chipsList = []
        })
        setSgReferences(sgReferencesContent)

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





    useEffect(() => {


        // First check if the URL contains as parameter
        // an AV identifier
        if (selectedAttack === "") {
            if (firstLoad) {
                firstLoad = false;
                if ((avFromLink && attackvectorstable.filter(e => e.avId === avFromLink).length > 0)) {
                    setSelectedAttack(avFromLink);
                } else {
                    setSelectedAttack("");

                    currentUrlParams.delete('av');
                    navigate('/attacktree')
                }
            } else {
                setSelectedAttack("");
                currentUrlParams.delete('av');
                navigate('/attacktree')

            }
        } else {
            if (selectedAttack !== avFromLink) {
                setSelectedAttack(selectedAttack)
                currentUrlParams.set('av', selectedAttack);
                navigate('/attacktree?' + currentUrlParams.toString())
            }
        }


        // Computes the size to be used by the SVG
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const wrapperHeight = wrapperRef.current.offsetWidth;

        // Set the dimensions and margins of the diagram
        var margin = { top: 20, right: 0, bottom: wrapperHeight * 0.5, left: -300 },
            width = wrapperWidth - margin.left - margin.right,
            height = wrapperHeight - margin.top - margin.bottom;

        var centerWidth = width / 5;
        var centerHeigth = height / 2;
        var svg

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin

        if (!selectedAttack && !selectedSafeguard && select("#attacktreeSVG")._groups[0][0] == null) {
            svg = select("#treeContainer").append("svg")
                .attr('id', 'attacktreeSVG')
                .attr("width", '100%')
                .attr("height", '76%')
                .call(zoom().on("zoom", function (event) {
                    svg.attr("transform", event.transform)
                }))
                .on("dblclick.zoom", null)
                .append("g")
                .attr("transform", "translate("
                    + centerWidth + "," + centerHeigth + ")");
        } else {
            svg = select("#attacktreeSVG").selectAll("g > *").remove()
            svg = select("#attacktreeSVG")
                .call(zoom().on("zoom", function (event) {
                    svg.attr("transform", event.transform)
                }))
                .on("dblclick.zoom", null)
                .append("g")
                .attr("transform", "translate("
                    + centerWidth + "," + centerHeigth + ")");
        }



        ///
        // Define the patterns for the special nodes that are repeated (av-6xx,av-7xx,av-8xx)
        ///
        //  Triangle:
        svg.append('defs')
            .append('pattern')
            .attr('id', 'Triangle')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 10)
            .attr('height', 10)
            .append('path')
            .attr('d', 'M5,0 10,10 0,10 Z')
            .attr('fill', "darkseagreen");

        //  vertical-stripe:
        var verticalStripe = svg.append('defs')
            .append('pattern')
            .attr('id', 'vertical-stripe')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 4)
            .attr('height', 4);

        verticalStripe.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', "white")
        verticalStripe.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 2)
            .attr('height', 10)
            .attr('fill', "darkgoldenrod");

        //  pattern-stripe:
        var patternStripe = svg.append('defs')
            .append('pattern')
            .attr('id', 'pattern-stripe')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('patternTransform', 'rotate(45)')
            .attr('width', 4)
            .attr('height', 4);

        patternStripe.append('rect')
            .attr('width', 2)
            .attr('height', 4)
            .attr('transform', 'translate(0,0)')
            .attr('fill', "lightcoral")




        var i = 0,
            duration = 750,
            root;

        // declares a tree layout and assigns the size
        var treemap = tree()
            .size([height, width])
            .nodeSize([30,])
            .separation(function (a, b) {
                return ((a.parent === root) && (b.parent === root)) ? 4 : 1;
            });

        // Assigns parent, children, height, depth
        root = hierarchy(data, function (d) { return d.children; });

        root.x0 = height / 2;
        root.y0 = width / 2;


        // Collapse the node and all it's children
        function collapse(d) {
            if (d.children) {
                d._children = d.children
                d._children.forEach(collapse)
                d.children = null
            }
        }

        function clearAll(d) {
            d.class = "";
            if (d.children)
                d.children.forEach(clearAll);
            else if (d._children)
                d._children.forEach(clearAll);
        }

        function expandAll(d) {
            if (d._children) {
                d.children = d._children;
                d.children.forEach(expandAll);
                d._children = null;
            } else if (d.children)
                d.children.forEach(expandAll);
        }



        // Assigns parent, children, height, depth
        root = hierarchy(data, function (d) { return d.children; });

        function collapseAllNotFound(d) {

            if (d.children) {
                if (d.class !== "found") {
                    d._children = d.children;
                    d._children.forEach(collapseAllNotFound);
                    d.children = null;
                } else {
                    d.children.forEach(collapseAllNotFound);
                }

            }
        }

        function collapseAllNotPatchedFound(d) {
            if (d.children) {
                if (d.toDisplay !== "true") {
                    d._children = d.children;
                    d._children.forEach(collapseAllNotPatchedFound);
                    d.children = null;
                } else {
                    d.children.forEach(collapseAllNotPatchedFound);
                }

            }
        }

        function opacifiesChild(d) {
            if (d.children) {
                d.children.forEach(function (e) {
                    if (e.class !== "") {
                        e.class = "patchedChild"
                    }
                })
            }

            if (d.class === "patchedChild") {
                if (d.children) {
                    d.children.forEach(function (e) {
                        e.class = "patchedChild"
                    })
                }
            }
        }

        root.children.forEach(collapse);
        update(root)


        function update(source) {

            // Assigns the x and y position for the nodes
            var treeData = treemap(root);

            // Compute the new tree layout.
            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);


            // Normalize for fixed-depth.
            nodes.forEach(function (d) {


                d.y = d.depth * 380

            });


            // ****************** Nodes section ***************************

            // Update the nodes...
            var node = svg.selectAll('g.node')
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new modes at the parent's previous position.
            var nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr("transform", function (d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                //.attr('node-name', d => d.data.name)
                //.on("dblclick", doubleClickShowInfo)
                .on('click', singleclick);

            // Add Circle for the nodes
            nodeEnter.append('circle')
                .attr('class', 'node')
                .attr('r', 1e-6)
                .style("stroke", function (d) {

                    if (d.data.avId.substr(0, 4) === "AV-6") {
                        return "firebrick"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-8") {
                        return "gold"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-7") {
                        return "darkgreen"
                    }
                    if (d.data.stroke_color !== undefined) {
                        return d.data.stroke_color;
                    }
                    return "steelblue"
                })
                .style("fill", function (d) {

                    return d._children ? "lightsteelblue" : "#fff";
                });

            // Add labels for the nodes
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", function (d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("text-anchor", function (d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function (d) { return d.data.avName; });

            // UPDATE
            var nodeUpdate = nodeEnter.merge(node);

            // Transition to the proper position for the node
            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            // Update the node attributes and style
            nodeUpdate.select('circle.node')
                .attr('r', 10)
                .style("fill", function (d) {
                    if (d.class === "found") {
                        return "tomato"
                    }
                    if (d.class === "patched") {
                        return "lightgreen"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-6") {
                        return d._children ? "lightcoral" : "url(#pattern-stripe)";
                    }
                    if (d.data.avId.substr(0, 4) === "AV-8") {
                        return "url(#vertical-stripe)"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-7") {
                        if (d.data.avId === "AV-703") {
                            return "white"
                        } else {
                            return d._children ? "darkseagreen" : "url(#Triangle)";
                        }

                    }
                    return d._children ? "lightsteelblue" : "#fff";
                })
                .style("stroke-dasharray", function (d) {

                    if (d.data.avId === "AV-703") {
                        return ('5,3')
                    } else {
                        return null
                    }

                }) // Make the stroke dashed
                .style('stroke', function (d) {
                    if (d.class === "found") {
                        return "tomato"
                    }
                    if (d.class === "patched") {
                        return "lightgreen"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-6") {
                        return "firebrick"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-8") {
                        return "gold"
                    }
                    if (d.data.avId.substr(0, 4) === "AV-7") {
                        if (d.data.avId === "AV-703") {
                            return "steelblue"
                        } else {
                            return "darkgreen"
                        }

                    }

                    return "steelblue"
                })
                .attr('cursor', 'pointer');


            // Remove any exiting nodes
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            // On exit reduce the node circles size to 0
            nodeExit.select('circle')
                .attr('r', 1e-6);

            // On exit reduce the opacity of text labels
            nodeExit.select('text')
                .style('fill-opacity', 1e-6);

            // ****************** Links section ***************************

            // Update the links
            var link = svg.selectAll('path.link')
                .data(links, function (d) { return d.id; });

            // Enter any new links at the parent's previous position.
            var linkEnter = link.enter().insert('path', "g")
                .attr("class", "link")
                .attr('d', function (d) {
                    var o = { x: source.x0, y: source.y0 }
                    return diagonal(o, o)
                });

            // UPDATE
            var linkUpdate = linkEnter.merge(link);

            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', function (d) { return diagonal(d, d.parent) })
                .style('stroke', function (d) {
                    if (d.class === "found") {
                        return "tomato"; // Set to tomato the link color when found through safeguards or av search
                    }
                    if (d.class === "patchedChild") {
                        return "lightgreen"
                    }

                });

            // Remove any exiting links
            link.exit().transition()
                .duration(duration)
                .attr('d', function (d) {
                    var o = { x: source.x, y: source.y }
                    return diagonal(o, o)
                })
                .remove();

            // Store the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            // Creates a curved (diagonal) path from parent to the child nodes
            function diagonal(s, d) {

                var path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

                return path
            }

            // Toggle children on click.
            function singleclick(d) {


                if (d.target.__data__.children) {
                    d.target.__data__._children = d.target.__data__.children;
                    d.target.__data__.children = null;
                } else {
                    d.target.__data__.children = d.target.__data__._children;
                    d.target.__data__._children = null;
                }


                if (d.target.__data__.class === "patchedChild") {
                    opacifiesChild(d.target.__data__);
                }

                update(d.target.__data__);

                var found = attackvectorstable.find(element => element.avId === d.srcElement.__data__.data.avId)
                onPressHandler_av(found);

                onPressHandler_avLink(found);
                onPressHandler_description(found);
                onPressHandler_references(found);
                onPressHandler_examples(d.srcElement.__data__);

                currentUrlParams.set('av', d.srcElement.__data__.data.avId);
                navigate('/attacktree?' + currentUrlParams.toString())

                var avSafeguardsCollector = [];
                if (found.info[0]['Mapped Safeguard']) {
                    avSafeguardsCollector.push({ "match": found, "avId": null, "avName": null })
                }

                // Walk parent chain to collect all the safeguards
                var ancestors = [];
                var parent = d.target.__data__.parent;
                while (parent !== null) {
                    ancestors.push(parent);
                    // Check if parent nodes has safeguards
                    var match = attackvectorstable.find(element => element.avId === parent.data.avId && element.info[0]["Mapped Safeguard"].length !== 0)
                    if (match) {
                        avSafeguardsCollector.push({ "match": match, "avId": parent.data.avId, "avName": parent.data.avName })
                    }

                    parent = parent.parent;
                }

                onPressHandler_safeguards(avSafeguardsCollector);


            }

        }

        highlightSelectedAttack(selectedAttack)

        function highlightSelectedAttack(searchID) {

            if (searchID) {
                var searchField = "d.data.avId";
                var firstCall = true;
                var avSafeguardsCollector = [];

                clearAll(root);
                expandAll(root);
                update(root)
                searchTree(root, firstCall);
                root.children.forEach(collapseAllNotFound);
                update(root)

                function searchTree(d, first_call = false) {

                    if (d.children)
                        d.children.forEach(searchTree);
                    else if (d._children)
                        d._children.forEach(searchTree);
                    var searchFieldValue = eval(searchField);



                    if (searchFieldValue && searchFieldValue.match(searchID)) {
                        if (first_call) {
                            d.search_target = true;

                        } else {
                            d.search_target = false;
                        }

                        //Updates information
                        var found = attackvectorstable.find(element => element.avId === d.data.avId)
                        onPressHandler_av(found);
                        onPressHandler_avLink(found);
                        onPressHandler_description(found);
                        onPressHandler_references(found);
                        onPressHandler_examples(d);



                        if (found.info[0]['Mapped Safeguard']) {
                            avSafeguardsCollector.push({ "match": found, "avId": null, "avName": null })
                        }

                        // Walk parent chain
                        var ancestors = [];
                        d.class = "found"
                        var parent = d.parent;
                        while (parent !== null) {
                            ancestors.push(parent);
                            parent.class = "found";
                            var match = attackvectorstable.find(element => element.avId === parent.data.avId && element.info[0]["Mapped Safeguard"].length !== 0)
                            if (match) {

                                if (!avSafeguardsCollector.includes({ "match": match, "avId": parent.data.avId, "avName": parent.data.avName })) {
                                    avSafeguardsCollector.push({ "match": match, "avId": parent.data.avId, "avName": parent.data.avName })
                                }

                            }
                            parent = parent.parent;
                        }

                        avSafeguardsCollector = avSafeguardsCollector.filter((value, index, self) =>
                            index === self.findIndex((t) => (
                                t.avId === value.avId
                            ))
                        )

                        onPressHandler_safeguards(avSafeguardsCollector);

                    }
                }
            }


        }

        highlightSelectedSafeguard(selectedSafeguard)

        function highlightSelectedSafeguard(searchID) {


            if (searchID) {

                var searchField = "d.data.avId";
                var firstCall = true;
                expandAll(root);
                update(root)
                searchTreeSafeguard(root, firstCall);
                root.children.forEach(collapseAllNotPatchedFound);
                update(root)
                update(root)

                function searchTreeSafeguard(d, first_call = false) {

                    if (d.children)
                        d.children.forEach(searchTreeSafeguard);
                    else if (d._children)
                        d._children.forEach(searchTreeSafeguard);
                    var searchFieldValue = eval(searchField);

                    var foundAv = attackvectorstable.filter(element => element.avId === searchFieldValue && element.info[0]['Mapped Safeguard'].some(x => x.sgId === searchID))

                    if (foundAv.length > 0) {
                        var parentScope = null

                        if (foundAv[0].info[0]['Mapped Safeguard'][0].scopeAvId) {
                            parentScope = foundAv[0].info[0]['Mapped Safeguard'][0].scopeAvId
                        }
                        if (searchFieldValue) {
                            var ancestors = [];
                            var parent = d.parent;
                            if (parentScope) {
                                while (parent !== null) {

                                    ancestors.push(parent.data.avId);
                                    parent = parent.parent;
                                }
                            }

                            if (first_call) {

                                if (parentScope && ancestors.includes(parentScope)) {

                                    d.search_target = true;
                                    d.class = "patched"
                                    d.toDisplay = "true"

                                    opacifiesChild(d)

                                    parent = d.parent;
                                    while (parent !== null) {
                                        ancestors.push(parent);

                                        parent.toDisplay = "true";

                                        parent = parent.parent;
                                    }
                                } else if (parentScope && !ancestors.includes(parentScope)) {
                                    d.search_target = false;
                                } else if (parentScope === null) {
                                    d.search_target = true;
                                    d.class = "patched"
                                    d.toDisplay = "true"

                                    opacifiesChild(d)



                                    parent = d.parent;
                                    while (parent !== null) {
                                        ancestors.push(parent);

                                        parent.toDisplay = "true";

                                        parent = parent.parent;
                                    }
                                }

                            } else {
                                d.search_target = false;
                            }



                        }
                    }



                }


            }

        }


    }, [data, selectedAttack, selectedSafeguard]);

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }




    return (


        <div className="taxonomy" id='taxonomyDiv'>
            {isOpen && <SGModal sgID={sgID} sgName={sgName} open={isOpen} setIsOpen={setIsOpen} sgDescription={sgDesc} sgReferences={sgReferences} sgType={sgType} stakeholdersRole={stakeholdersRole} />}





            <Box sx={{
                position: "absolute", top: "60px", right: "20px", minWidth: 340,
                maxWidth: "15%",
                minHeight: 150,
                maxHeight: '10vh',
            }}>
                <Box sx={{}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Searchbars" {...a11yProps(0)} />
                        <Tab label="Legend" {...a11yProps(1)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {selectedSafeguard.length === 0 ? <AttackSearchbar selectedAttack={setSelectedAttack} disable={false} fromUrl={avFromLink} /> : <AttackSearchbar selectedAttack={setSelectedAttack} disable={true} />}
                    {selectedAttack.length === 0 ? <SafeguardSearchbar selectedSafeguard={setSelectedSafeguard} disable={false} /> : <SafeguardSearchbar selectedSafeguard={setSelectedSafeguard} disable={true} />}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Legend></Legend>
                </TabPanel>

            </Box>

            <div className="taxonomyWrapper">

                <div id="treeContainer" className="custom-container" ref={wrapperRef} >

                </div>
            </div>

            <div className="featured" id="featuredContainer">

                <div className="featuredItem">
                    <Button style={{ maxWidth: 20, maxHeight: 27, minWidth: 20, minHeight: 27, marginRight: "2%" }} variant="outlined" onClick={() => {
                        navigator.clipboard.writeText(avLink)
                        setOpenSnackbar(true);
                    }}>
                        <ShareIcon />
                    </Button>
                    <span className="featuredTitle" id='av-name'>{avText}</span>
                    <br></br>
                    <span className="featuredSub" id='av-info-sub'>{descText}</span>
                    <br></br>

                    <span className="featuredSub" id='av-desc'></span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">References</span>
                    <br></br>
                    <span className="featuredSub" id='av-ref'><ol>{examplesText}</ol></span>
                </div>
                <div className="featuredItem">
                    {safeguardsText}
                    {safeguardsInheritedText}
                </div>

                <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={handleCloseSnackbar} >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Link copied to the clipboard!
                    </Alert>
                </Snackbar>
            </div>
        </div>




    );

}

export default Taxonomy;

