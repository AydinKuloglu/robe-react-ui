import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";


export default class PasswordInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            passwordInputNormal: "",
            passwordInputValidations: ""
        };
    }

    render(): Object {
        return (
            <div>
                <PasswordInput
                    label="PasswordInput"
                    value={this.state.passwordInputNormal}
                    onChange={this.__handleChange.bind(undefined, "PasswordInputNormal")}
                />
                <PasswordInput
                    label="With Validations"
                    value={this.state.passwordInputValidations}
                    onChange={this.__handleChange.bind(undefined, "PasswordInputValidations")}
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
