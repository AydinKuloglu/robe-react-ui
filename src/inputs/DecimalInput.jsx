import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Input from "./BaseInput";

/**
 * DecimalInput is a component decimal inputs.
 * Has support for different decimal seperators (,/.)
 * Supports 2 digits after seperator.
 * @export
 * @class Decimal
 * @extends {ShallowComponent}
 */
export default class DecimalInput extends ShallowComponent {
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
         * name use as input field name
         */
        name: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.any.isRequired,
        /**
         * onChange event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * Decimal Seperator for integer and fraction.
         */
        decimalSeparator: React.PropTypes.oneOf([".", ","]),
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
        value: "",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    static refName = "innerInput";

    render(): Object {
        /* eslint-disable no-unused-vars */

        let { decimalSeparator, ...newProps } = this.props;

        return (<Input
            {...newProps}
            type="text"
            ref={DecimalInput.refName}
            step={this.props.step}
            value={this.props.value}
            onChange={this.__numericFilter}
        />);
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid(): boolean {
        return this.refs[DecimalInput.refName].isValid();
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    __numericFilter(e: Object): boolean {
        let value = e.target.value;
        let result = this.__isFloat(value) || value === "";
        if (result && this.props.onChange) {
            e.target.parsedValue = value;
            result = this.props.onChange(e);
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
        let found = input.match(`^[0-9]{1,6}((\\${this.props.decimalSeparator})|(\\${this.props.decimalSeparator}\\d{1,2}))?$`);
        return found !== undefined && found !== null;
    }
}
