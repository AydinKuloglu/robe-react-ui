import React from "react";
import is from "is-js";
import BinderShallowComponent from "robe-react-commons/lib/components/BinderShallowComponent";
import Input from "./BaseInput";

/**
 * NumericInput is a wrapper element for BaseInput.
 * Filters non-numeric characters, accepts only numeric characters.
 * @export
 * @class NumericInput
 * @extends {ShallowComponent}
 */
export default class NumericInput extends BinderShallowComponent {

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
        value: "",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    static refName="innerInput";

    render(): Object {
        return (<Input
            {...this.props}
            value={this.props.value}
            type="text"
            ref={NumericInput.refName}
            onChange={this.__numericFilter}
        />);
    }

    /**
     * Returns validity of the component.
     * @return true if it is valid.
     */
    isValid(): boolean {
        return this.refs[NumericInput.refName].isValid();
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    __numericFilter(e: Object): boolean {
        let result = true;
        let value = e.target.value;
        if (value && !is.numeric(value)) {
            result = false;
        } else if (this.props.onChange) {
            let parsedVal = parseInt(value, 10);
            e.target.parsedValue = isNaN(parsedVal) ? undefined : parsedVal;
            result = this.props.onChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }
}
