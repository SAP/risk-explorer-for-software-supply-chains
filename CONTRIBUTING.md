# Contributing

## Code of Conduct

All members of the project community must abide by the [Contributor Covenant, version 2.1](CODE_OF_CONDUCT.md).
Only by respecting each other we can develop a productive, collaborative community.
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting [a project maintainer](.reuse/dep5).

## Engaging in Our Project

We use GitHub to manage reviews of pull requests.

* If you are a new contributor, see: [Steps to Contribute](#steps-to-contribute)

* Before implementing your change, create an issue that describes the problem you would like to solve or the code that should be enhanced. Please note that you are willing to work on that issue.

* The team will review the issue and decide whether it should be implemented as a pull request. In that case, they will assign the issue to you. If the team decides against picking up the issue, the team will post a comment with an explanation.

## Steps to Contribute

Should you wish to work on an issue, please claim it first by commenting on the GitHub issue that you want to work on. This is to prevent duplicated efforts from other contributors on the same issue.

If you have questions about one of the issues, please comment on them, and one of the maintainers will clarify.

## Contributing Code or Documentation

You are welcome to contribute code in order to fix a bug or to implement a new feature that is logged as an issue.

The following rule governs code contributions:

* Contributions must be licensed under the [Apache 2.0 License](./LICENSE)
* Due to legal reasons, contributors will be asked to accept a Developer Certificate of Origin (DCO) when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Issues and Planning

* We use GitHub issues to track bugs and enhancement requests.

* Please provide as much context as possible when you open an issue. The information you provide must be comprehensive enough to reproduce that issue for the assignee.

***

## Contribute to the Structure of the Taxonomy

 The file `taxonomy.json` arranges the attack vectors in the hierarchical structure of the attack tree.

The following excerpt, for instance, makes the two attack vectors *Develop and Advertise Distinct Malicious Package from Scratch* and *Create Name Confusion with Legitimate Package* child nodes of *Conduct Open-Source Supply Chain Attack*:

```
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
    ..
    ]
}
```

As we can observe, the taxonomy is a JSON object and each JSON element (node of the tree) contains the following information:
* `avName`, that is a string describing the name of the specific attack vector
* `avId`, that is a string describing the identifier associated to the specific attack vector
* `children` (optional), that is an array containing the list of children nodes of an attack vector. In this case we
follow the semantics of attack trees 

## Improve the content of the Attack Vectors

The file `attackvectors.json` contains a flat list of all attack vectors, each one having a unique identifier and name. Furthermore, each vector is characterized by a description, its impact, a list of related scientific references (if any), and a list of safeguards (if any).

An example excerpt of the file is the following:

```
[
    {
    "avId": "AV-000",
    "avName": "Conduct Open-Source Supply Chain Attack",
    "info": [{
        "Description": "The attack tree focusses on open-source based software development ...",
        "Impact": "Conduct a Software Supply Chain attack",
    "Mapped Safeguard": [
        {"sgId":"SG-001"},
        {"sgId":"SG-003"},
        ...
        {"sgId":"SG-036"},
        {"sgId":"SG-039"}]
        }
    ]
    },
    {
    "avId": "AV-100",
    "avName": "Develop and Advertise Distinct Malicious Package from Scratch",
    "info": [{
    "Description": "This attack vector covers ...",
    "Impact": "Inject Malicious Code ...",
    "Mapped Safeguard": []
    }]
    },
    ...
]
```

As we can observe, the list of attack vectors is a JSON array and each JSON element contains the following information:
* `avId`, that is a string describing the identifier associated to the specific attack vector
* `avName`, that is a string describing the name of the specific attack vector</li>
* `info`, that is an array containing a single JSON object characterized by the following fields: 
    * `Description`, that is a string describing the meaning and purpose of a specific attack vector 
    * `Impact`, that is a string describing the impact related to a successful attack 
    * `Mapped Safeguard`, that is an array containing the list of safeguards related to the specific attack vector. Each safeguard is indexed using the related identifier `sgId`


## Add new Refererences

The file `references.json`} contains a flat list of both scientific and grey literature references supporting the presence of the attack vectors in the taxonomy. 
The list may include, for example, peer-reviewed papers, master/PhD thesis, standards, technical reports, a blog post talking about a real-world attack, a vulnerability disclosure affecting any of the involved systems, 
or a whitepaper describing a proof-of-concept that (if exploited) could have led to a supply chain attack.

The template to document each reference entry is the following:
                    
```
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
```

The list of references is a JSON array and each JSON element contains the following information:
* `title`, that is a string describing the title of the peer-reviewed paper, the real-world attack described in a news page and so on
* `link`, that is a string containing the URL of the reference
    

The `vectors` array contains the list of attack vectors to which the reference is mapped.
You may notice that in the tree there are attack vectors that appear in different ***scopes***. In fact, the compromission of the maintainer system may happen both in the case of the VCS and in the
one of the build system, for example.
For this reason, some references may require the specification of the scope of the related attack vector. Thus the fields available in the `vectors` array are:
* `avId`, that is a string describing the identifier of the attack vector that was at the root cause of the described supply chain attack 
* `avName`, that is a string describing the name of the specific attack vector that was at the root cause of the described supply chain attack 
* `scopeAvId` (optional), that is a string describing the identifier of the attack vector describing the scope
* `scopeAvName` (optional), that is a string describing the name of the specific attack vector describing the scope 


The`safeguards` array contains the list of safeguards to which the reference is mapped, and the information required in this case are the following:
* `sgId`, that is a string describing the identifier associated to the specific safeguard
* `sgName` that is a string describing the name of the specific safeguard

The `tags` dictionary contains additional information related to the reference:
* `ecosystems`, that is an array of strings describing the involved ecosystems (e.g., Python, JavaScript, Java)
* `packages`, that is an array of strings, describing the name of affected packages
* `contents`, that is an array describing the type of the resource. The possible values are:    
  * `peer-reviewed`
  * `thesis`
  * `vulnerability`
  * `attack`
  * `proof-of-concept`
  * `presentation`
* `standard`
*  `year`, that is an integer describing the year of publishing of the resource


## Improve the content of the Safeguards

The file `safeguards.json` contains the list of safeguards that (partially or fully) mitigate different attack vectors. Each safeguard has a unique identifier and name and is characterized by a description, a list of related scientific references (if any), its type (directive, preventive, detective or corrective) and a description how the different stakeholders implement, apply or use it.

                                
An example excerpt of the file is the following:


```                           
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
```

As we can observe, the list of attack vectors is a JSON array and each JSON element contains the following information:

* `sgId`, that is a string describing the identifier associated to the specific safeguard
* `sgName`, that is a string describing the name of the specific safeguard
* `info` , that is an array containing a single JSON object characterized by the following fields: 
  * `Description`, that is a string describing the meaning and purpose of a specific safeguard
  * `Directive`, `Preventive`, `Detective`, and `Corrective` are boolean fields that specify the type of safeguard
  * `Project Maintainer`, `Administrator`, and `Open-Source Consumer` are string fields describing the involvement of the specific stakeholders that is required to make  the countermeasure effective 


