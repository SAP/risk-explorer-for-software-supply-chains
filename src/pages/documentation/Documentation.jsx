import "./documentation.css"
import React, { Component} from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ossSupModel from '../../images/OSS-SuppChainModel-FMC-modified.png'
import attacktreeExample from '../../images/AttackTreeExample-modified.png'






class Documentation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            anchorId: "",

        }
        this.handleClick = this.handleClick.bind(this)


    }


    handleClick() {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
        if (!this.state.sidebarOpen) {
            document.getElementById('tableWrapperDiv').style.marginLeft = "310px"

        } else {
            document.getElementById('tableWrapperDiv').style.marginLeft = "10px"

        }
    }

    scrollToDiv = () => {
        let currentLocation = window.location.href;
        const hasDivAnchor = currentLocation.includes("#");
        if (hasDivAnchor) {
            const anchorDivId = `${currentLocation.substring(currentLocation.indexOf("#") + 1)}`.split("#")[1]
            this.setState({ anchorId: anchorDivId })
            const anchorDiv = document.getElementById(anchorDivId);
            if (anchorDiv) {
                anchorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.scrollBy(0, -10);
            }
        }
    }



    componentDidMount() {
        this.scrollToDiv();
    }








    render() {

        return (

            <div className="home">
                <Topbar handleClickTopbar={this.handleClick} sidebarState={this.state.sidebarOpen} />

                <div className="documContainer">
                    <Sidebar open={this.state.sidebarOpen} />
                    <div className="tableWrapper" id="tableWrapperDiv" >

                        <Box sx={{ width: '50%', maxWidth: "50%", display: "block", marginLeft: 'auto', marginRight: "auto", }}>
                            <Typography variant="h1" component="div" gutterBottom> Documentation</Typography>


                            <div id="oss-supp-model">


                                <Typography variant="h2" gutterBottom component="div">Open-Source Software Supply Chain Model</Typography>

                                <Typography variant="subtitle1" gutterBottom>
                                    This section describes a generic and high-level model of open-source software supply chains. It covers typical systems, stakeholders and interactions that are relevant in the context of developing, building and distributing open-source artifacts, and which are targeted by the taxonomy's attack vectors. Using the <a href="http://www.fmc-modeling.org/" target="_blank" rel="noreferrer">FMC notation</a>, the model looks as follows:
                                </Typography>

                                <img style={{ width: "100%", display: "block", marginLeft: 'auto', marginRight: "auto", marginTop: "2%", marginBottom: "2%" }} src={ossSupModel} alt="OSS Supply Chain Model" />

                                <Typography variant="h4" gutterBottom>Systems</Typography>
                                <Typography variant="body1" gutterBottom>
                                    The systems considered comprise versioning control systems, build systems and package repositories.
                                    They do not necessarily correspond to concrete physical or virtual systems providing the respective function, but should
                                    be understood as roles, that can be exercised by a single host or 3rd party service.
                                    <br></br><br></br>
                                    <ul>
                                        <li><b>Version control systems (VCS)</b> host the source code of open-source projects, together with related metadata and configuration files. They track and manage all the changes to
                                            the source code thoughout the project lifetime. Plain VCSs (like <a href="https://git-scm.com/" target="_blank" rel="noreferrer">Git</a>) do not require its users to authenticate, but
                                            complementary tools offer additional functionalities. For example, they may provide issue trackers or improved security controls, like authentication, management of more fine-grained permissions
                                            or review workflows.</li><br></br>
                                        <li><b>Build systems</b> generate binary artifacts (like an executable or a compressed archive) starting from the project's codebase. CI/CD pipelines consist of a series of steps that have to be
                                        performed to deliver a new version of software. The common steps of a CI/CD pipeline are:
                                            <ul>
                                                <li>Build - the application is compiled, generally using build-automation tools like Make, Ant, Gradle, or xMake. The build process commonly involves dependency managers (like PIP or NPM) to determine and automatically download the required dependencies for the build to succeed.</li>
                                                <li>Test - the application is tested, generally in an automated fashion (e.g, using tools like JUnit)</li>
                                                <li>Release - the application is pushed into the associated repository</li>
                                                <li>Deploy - the application is deployed to production</li>
                                            </ul>
                                        CI/CD pipelines are automated through CI/CD tools, like Jenkins or Travis CI. 
                                        The generated files and artifacts are then distributed to downstream users for easy consumption. </li><br></br>
                                        <li><b>Distribution platforms</b> make pre-built OSS artifacts accessible to downstream users, for example through package managers or via manual download.
                                            As "distribution platform" we do not only consider public package repositories (like <a href="https://pypi.org/" target="_blank" rel="noreferrer">PyPI</a> or <a href="https://search.maven.org/" target="_blank" rel="noreferrer">Maven Central</a>),
                                            but also internal/external mirrors, content delivery networks (CDN) or proxies.</li><br></br>
                                        <li><b>Workstations of OSS Maintainers and Administrators</b> are also considered in the attack scenario, even though they are not explicitly depicted, because project maintainers and administrators use them to for privileged access to sensitive resources (like the project's codebase or the build system's web interface).</li><br></br>
                                    </ul>
                                </Typography>

                                <Typography variant="h4" gutterBottom>Stakeholders</Typography>

                                <Typography variant="body1" gutterBottom>
                                    Stakeholders in the open-source supply chain model shall be understood as roles, multiple of which can be assumed by a given individual or group. Open-source project members, for instance, commonly assume the role of project maintainers (with privileged access to project resources) and downstream users (consuming upstream artifacts).
                                    <br></br><br></br>
                                    <ul>
                                        <li><b>Contributors</b> contribute code to an Open-Source project, typically with limited permissions to project resources. They commonly submit their
                                            code in form of merge requests (or pull requests), so to let the project maintainers to perform reviews prior to being integrated into the codebase.</li><br></br>

                                        <li><b>OSS Project Maintainers</b> have privileged access to project resources. For this reason, they typically review and decide whether to integrate or not the
                                            contributors' merge requests. Project maintainers configure and trigger build jobs, and deploy pre-built artifacts on package repositories.
                                            It must be noted that the real identities of both contributors and maintainers are not necessarily known.</li><br></br>

                                        <li><b>System and Service Administrators</b> configure, maintain and operate the aforementioned systems or services. </li><br></br>

                                        <li><b>Downstream Users</b> are the consumers of Open-Source project artifacts, either directly cloning the source code from the VCS or by downloading
                                            pre-built packages from distribution platforms. The latter is typically automated through package managers (like pip or npm), which also collect and obtain
                                            all the required dependencies (both direct and indirect).</li><br></br>
                                    </ul>

                                </Typography>

                            </div>

                            <div id="attacktree-fund" style={{ marginTop: "10%" }}>
                                <Typography variant="h2" gutterBottom component="div">Attack Trees 101</Typography>

                                <Typography variant="body1" gutterBottom>
                                    <a href="https://www.schneier.com/academic/archives/1999/12/attack_trees.html" target="_blank" rel="noreferrer">Attack trees</a> are a formal representation of attacker goals and techniques.
                                    They support organizations and especially defenders to understand current exposure to threat and to identify the possible countermeasures to be used to protect the assets.
                                    <br></br><br></br>
                                    At the <b>root</b> of an attack tree the attacker's top-level goal is represented. Such goal is iteratively refined by its children into sub-goals.
                                    Depending on the degree of the refinement, nodes may correspond to more or less actionable tasks.
                                    <br></br><br></br>
                                    Nodes in an attack tree can be 'AND nodes' or 'OR nodes'. In the frist case, they represent different steps in achieving the parent's goal, while in the
                                    second case they represent alternatives. In our specific case, since we used the semantics of attack trees to outline a taxonomy, all
                                    the nodes have to be considered of 'OR' type.
                                </Typography>

                                <img style={{ width: "100%", display: "block", marginLeft: 'auto', marginRight: "auto", marginTop: "2%", marginBottom: "2%" }} src={attacktreeExample} alt="Attack tree example" />


                            </div>

                            <div id="jsondata" style={{ marginTop: "10%" }}>
                                <Typography variant="h2" gutterBottom component="div">JSON Data Structure</Typography>
                                <Typography variant="body1" gutterBottom>
                                    To facilitate the improvement, update and extension of the data underlying the visualization, the dataset is split into four <a href="https://www.json.org/json-en.html" target="_blank" rel="noreferrer">JSON</a> files:
                                    <ul>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`attackvectors.json`}</pre> contains a flat list of all attack vectors, each one having an identifier, a name and description as well as other properties</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`taxonomy.json`}</pre> creates the tree structure by referencing and nesting all the attack vectors</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`references.json`}</pre> contains a flat list of both scientific and grey literature references that deal with the identified attack vectors, thus, supporting their existence in our taxonomy</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`safeguards.json`}</pre> contains a flat list of safeguards</li>
                                    </ul>
                                    Let's suppose, for example, that a new attack for a given vector has been observed. This can be reflected in the dataset just by modifying <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`references.json`}</pre>.
                                    <br></br><br></br>
                                    The addition of an entirely new attack vector, on the other side, requires the modification of the three files <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`attackvectors.json`}</pre>, <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`taxonomy.json`}</pre> and <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`references.json`}</pre>.
                                </Typography>

                                <Typography variant="h4" gutterBottom>Attack Vectors</Typography>

                                <Typography variant="body1" gutterBottom>

                                    The file <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`attackvectors.json`}</pre> contains a flat list of all attack vectors, each one having a unique identifier and name. Furthermore, each vector is characterized by a description, its impact, a list of related scientific references (if any), and a list of safeguards (if any).

                                    <br></br>
                                    An example excerpt of the file is the following:


                                    <Box sx={{ width: '50%', maxWidth: "50%", display: "block", marginLeft: 'auto', marginRight: "auto", marginBottom: "2%" }}>
                                        <pre style={{ fontFamily: "Courier New", fontWeight: "bold" }}>{
`
    [{
        "avId": "AV-000",
        "avName": "Conduct Open-Source Supply Chain Attack",
        "info": [{
            "Description": "The attack tree focuses on open-source based software development ...",
            "Impact": "Conduct a Software Supply Chain attack",
            "Mapped Safeguard": [{
                "sgId": "SG-001"
            }, {
                "sgId": "SG-002"
            }, {
                "sgId": "SG-003"
            }, 
                ... 
            ]
        }]
    }, {
        "avId": "AV-100",
        "avName": "Develop and Advertise Distinct Malicious Package from Scratch",
        "info": [{
            "Description": "This attack vector covers the creation of a new, seemingly legitimate ...",
            "Impact": "Inject Malicious Code ...",
            "Mapped Safeguard": []
        }]
    }, {
        "avId": "AV-200",
        "avName": "Create Name Confusion with Legitimate Package",
        "info": [{
            "Description": "The general idea behind name confusion is that ...",
            "Impact": "Inject Malicious Code ...",
            "Mapped Safeguard": [{
                "sgId": "SG-007"
            }, {
                "sgId": "SG-011"
            }, {
                "sgId": "SG-012"
            },
                ... 
            ]
        }]
    }, 
    . . .
]
`}</pre></Box>

                                    As we can observe, the list of attack vectors is a JSON array and each JSON element contains the following information:
                                    <ul>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`avId`}</pre>, that is a string describing the identifier associated to the specific attack vector</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`avName`}</pre>, that is a string describing the name of the specific attack vector</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`info`}</pre> , that is an array containing a single JSON object characterized by the following fields: 
                                        <ul>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Description`}</pre>, that is a string describing the meaning and purpose of a specific attack vector </li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Impact`}</pre>, that is a string describing the impact related to a successful attack </li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Mapped Safeguard`}</pre>, that is an array containing the list of safeguards related to the specific
                                            attack vector. Each safeguard is indexed using the related identifier <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`sgId`}</pre> </li>
                                        </ul>
                                    
                                    </li>
                                    

                                    </ul>

                                </Typography>

                                <Typography variant="h4" gutterBottom>Taxonomy</Typography>

                                <Typography variant="body1" gutterBottom>

                                    The file <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`taxonomy.json`}</pre> arranges the attack vectors in the hierarchical structure of the attack tree.
                                    <br></br>
                                    The following excerpt, for instance, makes the two attack vectors <i>Develop and Advertise Distinct Malicious Package from Scratch</i> and <i>Create Name Confusion with Legitimate Package</i> child nodes of <i>Conduct Open-Source Supply Chain Attack</i>:

                                    <Box sx={{ width: '50%', maxWidth: "50%", display: "block", marginLeft: 'auto', marginRight: "auto", marginBottom: "2%" }}>
                                        <pre style={{ fontFamily: "Courier New", fontWeight: "bold" }}>{
                                            `
{
    "avName": "Conduct Open-Source Supply Chain Attack",
    "avId": "AV-000",
    "children": [{
        "avName": "Develop and Advertise Distinct Malicious Package from Scratch",
        "avId": "AV-100"  
        },
        {
        "avName": "Create Name Confusion with Legitimate Package",
        "avId": "AV-200",
        "children": [{
            ...
        ]},
        ...
    ]
}
`}</pre></Box>

                                    As we can observe, the taxonomy is a JSON object and each JSON element (node of the tree) contains the following information:
                                    <ul>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`avName`}</pre>, that is a string describing the name of the specific attack vector</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`avId`}</pre>, that is a string describing the identifier associated to the specific attack vector</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`children`}</pre> (optional), that is an array containing the list of children nodes of an attack vector. In this case we
                                            follow the semantics of attack trees </li>
                                    </ul>

                                </Typography>

                                <Typography variant="h4" gutterBottom>References</Typography>

                                <Typography variant="body1" gutterBottom>

                                    The file <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`references.json`}</pre> contains a flat list of both scientific and grey literature references supporting the presence of the attack vectors
                                    in the taxonomy. The list may include, for example, peer-reviewed papers, master/PhD thesis, standards, technical reports, a blog post talking about a real-world attack, a vulnerability disclosure affecting any of the involved systems, or a whitepaper describing a proof-of-concept that (if exploited) could have led to a supply chain attack.

                                    <br></br>
                                    The template to document each reference entry is the following:
                    

                                    <Box sx={{ width: '50%', maxWidth: "50%", display: "block", marginLeft: 'auto', marginRight: "auto", marginBottom: "2%" }}>
                                        <pre style={{ fontFamily: "Courier New", fontWeight: "bold" }}>{
`
{
    "title": "",
    "link": "",
    "vectors": [
        {
            "avId": "",
            "avName": "",
            "scopeAvId": "",
            "scopeAvName": ""
        }
    ],
    "safeguards": [
        {
            "sgId": "",
            "sgName": ""
        }
    ],
    "tags": {
        "ecosystems": ["Java", "JavaScript", ...],
        "packages": ["event-stream", "..."], 
        "contents": ["peer-reviewed", "attack", "vulnerability", ...],
        "year": null
    }
}
`}</pre></Box>

                                    The list of references is a JSON array and each JSON element contains the following information:
                                    <ul>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`title`}</pre>, that is a string describing the title of the peer-reviewed paper, the real-world attack described in a news page and so on</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`link`}</pre>, that is a string containing the URL of the reference</li>
                                        
                                    </ul>
                                    <br/><br/>
                                    The <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`vectors`}</pre> array contains the list of attack vectors to which the reference is mapped.
                                    You may notice that in the tree there are attack vectors that appear in different <b>scopes</b>. In fact, the compromission of the maintainer system may happen both in the case of the VCS and in the
                                    one of the build system, for example.
                                    For this reason, some references may require the specification of the scope of the related attack vector. Thus the fields available in the <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`vectors`}</pre> array are:
                                    <ul>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`avId`}</pre> , that is a string describing the identifier of the attack vector that was at the root cause of the described supply chain attack </li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`avName`}</pre>, that is a string describing the name of the specific attack vector that was at the root cause of the described supply chain attack </li>

                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`scopeAvId`}</pre> (optional), that is a string describing the identifier of the attack vector describing the scope</li>
                                        <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`scopeAvName`}</pre> (optional), that is a string describing the name of the specific attack vector describing the scope </li>
                                    </ul>

                                    <br/><br/>
                                    The <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`safeguards`}</pre> array contains the list of safeguards to which the reference is mapped, and the information required in this case are the following:
                                    <ul>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`sgId`}</pre>, that is a string describing the identifier associated to the specific safeguard</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`sgName`}</pre>, that is a string describing the name of the specific safeguard</li>
                                    </ul>

                                    The <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`tags`}</pre> dictionary contains additional information related to the reference:
                                    <ul>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`ecosystems`}</pre>, that is an array of strings describing the involved ecosystems (e.g., Python, JavaScript, Java)</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`packages`}</pre>, that is an array of strings, describing the name of affected packages</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`contents`}</pre>, that is an array describing the type of the resource. The possible values are:
                                        <ul>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`peer-reviewed`}</pre></li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`thesis`}</pre></li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`vulnerability`}</pre></li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`attack`}</pre></li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`proof-of-concept`}</pre></li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`presentation`}</pre></li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`standard`}</pre></li>
                                        </ul>
                                    </li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`year`}</pre>, that is an integer describing the year of publishing of the resource</li>
                                    </ul>

                                </Typography>

                                <Typography variant="h4" gutterBottom>Safeguards</Typography>

                                <Typography variant="body1" gutterBottom>

                                    The file <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`safeguards.json`}</pre> contains the list of safeguards that (partially or fully) mitigate different attack vectors. Each safeguard has a unique identifier and name and is characterized by a description, a list of related scientific references (if any), its type (directive, preventive, detective or corrective) and a description how the different stakeholders implement, apply or use it.

                                    <br></br>
                                    An example excerpt of the file is the following:


                                    <Box sx={{ width: '50%', maxWidth: "50%", display: "block", marginLeft: 'auto', marginRight: "auto", marginBottom: "2%" }}>
                                        <pre style={{ fontFamily: "Courier New", fontWeight: "bold" }}>{
                                            `
[{
        "sgId": "SG-001",
        "sgName": "Software Bill of Materials (SBOM)",
        "info": [{
            "Description": "A Software Bill of Material (SBOM) is a ...",
            "Directive": false,
            "Preventive": true,
            "Detective": true,
            "Corrective": false,
            "Project Maintainer": "By maintaining a detailed SBOM, the Project Maintainer ...",
            "Administrator": "The Administrator will be involved by ...",
            "Downstream User": "Similarly to the code signing and signature verification, ..."
        }]
    },
    {
        "sgId": "SG-002",
        "sgName": "Patch Management",
        "info": [{
            "Description": "By performing regular software updates on ...",
            "Directive": false,
            "Preventive": true,
            "Detective": false,
            "Corrective": true,
            "Project Maintainer": "Project Maintainer could enstablish ... ",
            "Administrator": "Package Repositories could enstablish ...",
            "Downstream User": ""
        }]
    },
    ...
]
`}</pre></Box>

                                    As we can observe, the list of attack vectors is a JSON array and each JSON element contains the following information:
                                    <ul>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`sgId`}</pre>, that is a string describing the identifier associated to the specific safeguard</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`sgName`}</pre>, that is a string describing the name of the specific safeguard</li>
                                    <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`info`}</pre> , that is an array containing a single JSON object characterized by the following fields: 
                                        <ul>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Description`}</pre>, that is a string describing the meaning and purpose of a specific safeguard</li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Directive`}</pre>, <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Preventive`}</pre>, 
                                            <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Detective`}</pre>, and <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Corrective`}</pre> are 
                                            boolean fields that specify the type of safeguard </li>
                                            <li><pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Project Maintainer`}</pre>, <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Administrator`}</pre>, 
                                            and <pre style={{ display: 'inline-block', fontFamily: "Courier New" }}>{`Open-Source Consumer`}</pre> are string fields describing the involvement of the specific stakeholders that is required to make 
                                            the countermeasure effective </li>
                                        </ul>
                                    
                                    </li>
                                       

                                    </ul>

                                  

                                </Typography>



                            </div>
                        </Box>
                    </div>

                </div>
            </div >
        )
    }
}

export default Documentation;