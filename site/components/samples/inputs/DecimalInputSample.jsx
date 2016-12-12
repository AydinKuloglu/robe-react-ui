import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DecimalInput from "robe-react-ui/lib/inputs/DecimalInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";



export default class DecimalInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            DecimalInputNormal: 42.01
        };
    }

    render() {
        return (
            <div>
                <DecimalInput
                    label="DecimalInput"
                    value={this.state.DecimalInputNormal}
                    decimalSeparator="."
                    onChange={this.__handleChange.bind(undefined, "DecimalInputNormal") }
                />
                <DecimalInput
                    label="With Validations"
                    value={this.state.DecimalInputValidations}
                    onChange={this.__handleChange.bind(undefined, "DecimalInputValidations") }
                    validations={{
                        required: true
                    }}
                />
            </div>
        );
    }
    __handleChange = (code: any, e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
    };
}
