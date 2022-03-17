# SAP Repository Template

Default templates for SAP open source repositories, including LICENSE, .reuse/dep5, Code of Conduct, etc... All repositories on github.com/SAP will be created based on this template.

## To-Do

In case you are the maintainer of a new SAP open source project, these are the steps to do with the template files:

- Check if the default license (Apache 2.0) also applies to your project. A license change should only be required in exceptional cases. If this is the case, please change the [license file](LICENSE).
- Enter the correct metadata for the REUSE tool. See our [wiki page](https://wiki.wdf.sap.corp/wiki/display/ospodocs/Using+the+Reuse+Tool+of+FSFE+for+Copyright+and+License+Information) for details how to do it. You can find an initial .reuse/dep5 file to build on. Please replace the parts inside the single angle quotation marks < > by the specific information for your repository and be sure to run the REUSE tool to validate that the metadata is correct.
- Adjust the contribution guidelines (e.g. add coding style guidelines, pull request checklists, different license if needed etc.)
- Add information about your project to this README (name, description, requirements etc). Especially take care for the <your-project> placeholders - those ones need to be replaced with your project name. See the sections below the horizontal line and [our guidelines on our wiki page](https://wiki.wdf.sap.corp/wiki/display/ospodocs/Guidelines+for+README.md+file) what is required and recommended.
- Remove all content in this README above and including the horizontal line ;)

***

# Risk Explorer for Software Supply Chains

## About this project

The aim of this project is to offer a tool to explore a taxonomy of attacks on open-source software supply chains and the related  countermeasures. The information has been compiled on the basis of numerous real-world incidents (actual attacks as well as plausible proof-of-concepts) and scientific literature.
\
This tool can be used as learning material to create awareness, but it can also serve different purposes: to aid in threat modeling, risk-assessments, scope penetration tests, or for safeguards selection.

Through this tool is possible to explore the following information:
* **Taxonomy of open-source software supply chain attacks**: a so-called attack tree is used to organize the different techniques hierarchically, starting from the abstract, top-level goal down to alternative and more concrete techniques
* **List of attack vectors**: a tabular view of all the nodes available in the attack tree is offered, along with the description, references, real-world examples and mapped safeguards
*  **List of safeguards**: a tabular view fo all the countermeasures fully or partially mitigating the abovementioned attacks is offered. Each safeguard is characterized by a description, references, type, and the involvement of the stakeholders to effectively implement it
*  **List of real-world examples**: the list of real-world examples (blog posts, technical reports, proof-of-concepts) demonstrating the feasibility of the identified attack vectors is offered
*  **Documentation**: here we provide the description of the model of the open-source software supply chain, the concept of attack trees, and the structure of the JSON files used in the project.

## Requirements and Setup

It is possible to access the tool online at the following [link](https://sap.github.io/risk-explorer-for-sofware-supply-chains/) using your favorite browser and enabling JavaScript features. We suggest to use a desktop environment for a better experience.

If you want to run a local version of the code you need to install [Node.js](https://nodejs.dev/learn/how-to-install-nodejs), then from inside the project directory (where `package.json` is located):
1. Install the required dependencies via `npm install`
2. Run the project via `npm start`
   
## Support, Feedback, Contributing

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/risk-explorer-for-sofware-supply-chains/issues). Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright (20xx-)20xx SAP SE or an SAP affiliate company and Risk Explorer for Software Supply Chains contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/risk-explorer-for-sofware-supply-chains/).
