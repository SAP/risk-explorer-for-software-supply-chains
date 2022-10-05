# Risk Explorer for Software Supply Chains
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE.txt)
[![REUSE status](https://api.reuse.software/badge/github.com/sap/risk-explorer-for-software-supply-chains)](https://api.reuse.software/info/github.com/sap/risk-explorer-for-software-supply-chains)

## About this project

This project offers a tool to explore a taxonomy of attack vectors targeting open-source software supply chains. This information has been compiled on the basis of numerous real-world incidents, i.e. actual attacks and vulnerabilities, as well as plausible proof-of-concepts and scientific literature.
You can find more about this work in our [paper](https://arxiv.org/abs/2204.04008).

The project can be used as learning material for awareness campaigns or trainings, but also for purposes such as threat modeling, risk-assessments or pentest scoping.

In more detail, project and tool provide the following information:
* **Attack Tree**: a hierarchical organization of 100+ attack vectors and techniques comprised in the taxonomy, starting from the abstract, top-level goal down to alternative and more concrete attack techniques
* **Attack Vectors**: a tabular view of all the attack vectors, along with the description, references, real-world examples and mapped safeguards
* **Safeguards**: a tabular view of countermeasures that fully or partially mitigate the above-mentioned attacks
* **References**: 300+ resources in some or another way related to supply chain security, both scientific and gray literature, all tagged and linked to attack vectors/safeguards 

## Requirements and Setup

Simply [access the tool online](https://sap.github.io/risk-explorer-for-software-supply-chains/) using your favorite browser. Make sure to enable JavaScript and use a desktop environment for a better experience.

If you want to run a local version of the code you need to install [Node.js](https://nodejs.dev/learn/how-to-install-nodejs), then from inside the project directory (where `package.json` is located):
1. Install the required dependencies via `npm install`
2. Run the project via `npm start`
   
## Support, Feedback, Contributing

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/risk-explorer-for-software-supply-chains/issues). Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright 2022 SAP SE or an SAP affiliate company and Risk Explorer for Software Supply Chains contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/risk-explorer-for-software-supply-chains/).
