import React from "react";
import InputGroup from "react-bootstrap/lib/InputGroup";
import BinderShallowComponent from "robe-react-commons/lib/components/BinderShallowComponent";
import Input from "./BaseInput";

export default class MoneyInput extends BinderShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.any.isRequired,
        /**
         * onChange event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * Unit for the currency. Will be displayed right side of the input.
         */
        unit: React.PropTypes.oneOf(["TL", "EUR", "USD"]),

        /**
         * Decimal Separator for integer and fraction.
         */
        decimalSeparator: React.PropTypes.oneOf([".", ","]),

        /**
         * Thousand Separator for integer and fraction.
         */
        thousandSeparator: React.PropTypes.oneOf([".", ","]),
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,
        /**
         * it specifies that an input field is read-only
         */
        readOnly: React.PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        decimalSeparator: ".",
        thousandSeparator: ",",
        unit: "TL",
        value: "",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    static refName="innerInput";

    render(): Object {
        return (
            <Input
                {...this.props}
                type="text"
                label={this.props.label}
                onChange={this.__numericFilter}
                onKeyPress={this.__focus2Fraction}
                value={this.props.value}
                ref={MoneyInput.refName}
                inputGroupRight={<InputGroup.Addon>{this.props.unit}</InputGroup.Addon>}
            />);
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid(): boolean {
        return this.refs[MoneyInput.refName].isValid();
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    __numericFilter(e: Object): boolean {
        let value = e.target.value;
        value = this.__addThousandSeparator(value);
        let result = this.__isFloat(value) || value === "";
        if (result && this.props.onChange) {
            e.target.parsedValue = value;
            if (this.props.onChange) {
                result = this.props.onChange(e);
            }
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }

    __isFloat = (input: string): boolean => {
        if (input === null || input === undefined) {
            return false;
        }
        /* eslint-disable prefer-template */
        let found = input.match("(?=.)^(([1-9][0-9]{0,2}(" + this.props.thousandSeparator + "[0-9]{3})*)|0)?(\\" + this.props.decimalSeparator + "[0-9]{0,2})?$");
        return found !== undefined && found !== null;
    }
    __addThousandSeparator(input: string): string {
        let indexDS = input.indexOf(this.props.decimalSeparator);
        if (indexDS === -1) {
            indexDS = input.length;
        }
        indexDS--;
        let output = [];
        let indexTH = 1;
        /* eslint-disable no-continue */
        for (let i = indexDS; i > -1; i--) {
            let char = input.charAt(i);
            if (char === this.props.thousandSeparator) {
                continue;
            }
            output.push(char);
            if (indexTH % 3 === 0 && i !== 0) {
                output.push(this.props.thousandSeparator);
            }
            indexTH++;
        }
        output = output.reverse().join("");
        let fraction = input.split(".")[1];
        if (fraction !== undefined) {
            output = output + this.props.decimalSeparator + fraction;
        }
        return output;
    }
}
