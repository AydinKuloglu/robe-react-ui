import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "form/elements/Input";

class DecimalInput extends ShallowComponent {

    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.any.isRequired,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        regex: [/(^[0-9]{0,13}$)|((^[0-9]{0,13})+\.[0-9]{0,2}$)/igm, "Hatalı girdiniz."]
    };

    constructor(props) {
        super(props);
    };

    render() {
        return (<Input
            {...this.props}
            type="number"
            ref="innerInput"
            step="0.01"
            onChange={this.__numericFilter}
        />);
    };

    isValid = ()=> {
        return this.refs.innerInput.isValid();
    };
    __numericFilter = (e)=> {
        var value = e.target.value;
        e.target.parsedValue = value ? parseFloat(value) : value;
        this.props.onChange(e);
    };
}

module.exports = DecimalInput;