import React, { Component } from 'react'
import ReactSelect, { components, ControlProps } from 'react-select'
import safeguardtable from '../../data/safeguards.json'


const styles = {
    container: base => ({
        ...base,
        flex: 1,
        width: "95%",
        position: "absolute",
        top: "150px",
        left: "1px",
        right: "20px"
        
    })
};

const controlStyles = {
    padding: '5px',
    background: '#d9f2e6',
    color: '#555',
};

const ControlComponent = (props: ControlProps<safeguardtable, false>) => (
    <div style={controlStyles}>
        <p style={{ textAlign: 'center' }}>Safeguards</p>
        <components.Control {...props} />
    </div>
);

function getSafeguardList() {

    var sgList = []

    safeguardtable.forEach((x) => sgList.push(
        {
            label: x["sgName"],
            value: x["sgId"]
        }
    ))
    return sgList

}

class SafeguardSearchbar extends Component {

    sglist = getSafeguardList()

    handleChange = selectedOption => {
        this.props.selectedSafeguard(selectedOption ? selectedOption.value : "")
    };

    render() {
        return (
            <ReactSelect isClearable isDisabled={this.props.disable} options={this.sglist} styles={styles} onChange={this.handleChange}
                components={{ Control: ControlComponent }} />
        )
    }

}

export default SafeguardSearchbar;