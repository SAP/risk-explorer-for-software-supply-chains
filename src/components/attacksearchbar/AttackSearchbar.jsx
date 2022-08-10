import React, { Component } from 'react'
import Select, { components, ControlProps } from 'react-select'
import attacktable from '../../data/attackvectors.json'

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

const controlStyles = {
    padding: '5px',
    background: 'rgb(187, 186, 186)',
    color: '#555',
};

const ControlComponent = (props: ControlProps<attacktable, false>) => (
    <div style={controlStyles}>
        <p style={{ textAlign: 'center' }}>Attack Vectors</p>
        <components.Control {...props} />
    </div>
);

function getAttackList() {

    var attList = []

    attacktable.forEach((x) => attList.push(
        {
            label: x["avName"],
            value: x["avId"]
        }
    ))
    return attList

}

class AttackSearchbar extends Component {

    attacklist = getAttackList()
    

    handleChange = selectedOption => {
       
        this.props.selectedAttack(selectedOption ? selectedOption.value : "")
        
    };

    

    render() {
        return (
            <Select isClearable isDisabled={this.props.disable} options={this.attacklist} styles={styles} onChange={this.handleChange}
                components={{ Control: ControlComponent }} defaultValue={this.attacklist.filter(element => element.value === this.props.fromUrl)}/>
        )
    }

}

export default AttackSearchbar;