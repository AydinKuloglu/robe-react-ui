import React from "react";
import ValidationComponent from "../validation/ValidationComponent";
import Select from "react-select";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import "react-select/dist/react-select.css";

/**
 * Provide selection in map array data with single or multi choices
 * You can enable multi-value selection by setting multi={true}
 */
export default class SelectInput extends ValidationComponent {

    static propTypes = {
        /**
         * Style map for the component.
         */
        style: React.PropTypes.object,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * map array of options to render.
         */
        items: React.PropTypes.array,
        /**
         * Selected value or values
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.array
        ]),
        /**
         * key of given map array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * presented text of give map array `items`
         */
        textField: React.PropTypes.string,
        /**
         * displayed when there's no value
         */
        placeHolder: React.PropTypes.string,
        /**
         * callback function when selected values changed
         */
        onChange: React.PropTypes.func,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,
        /**
         * Check List is single or multi
         */
        multi: React.PropTypes.bool,
        /**
         * presented message if any result not shown.
         */
        noResultsText: React.PropTypes.string,
        /**
         *  whether to enable searching feature or not
         */
        searchable: React.PropTypes.bool,
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

    static defaultProps = {
        placeHolder: "Please Select",
        noResultsText: "No Result",
        textField: "text",
        valueField: "value",
        multi: false,
        searchable: true,
        format: "DD/MM/YYYY",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    __delimiter = ",";
    _value;
    _onChange;

    /**
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        this._value = this.props.value;
        if (!this._value) {
            this._value = this.props.multi ? [] : "";
        }
        this._onChange = (this.props.multi ? this.__onChangeMulti : this.__onChangeSingle).bind(this);
    }

    render(): Object {
        return (
            <FormGroup hidden={this.props.hidden}>
                <ControlLabel> {this.props.label} </ControlLabel>
                <Select
                    options={this.props.items}
                    valueKey={this.props.valueField}
                    labelKey={this.props.textField}
                    multi={this.props.multi}
                    noResultsText={this.props.noResultsText}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeHolder}
                    searchable={this.props.searchable}
                    value={this.props.value}
                    onChange={this._onChange}
                    delimiter={this.__delimiter}
                />
                {super.validationResult()}
            </FormGroup>
        );
    }

    /**
     * This method has two difference calls.
     * 1 - call without parameter returns true if at least one of the values is checked.
     * 2 - call with key parameter returns true if the given key is in checked list.
     * @param {string} value
     * @returns {boolean}
     */
    isChecked = (value: string): boolean => {
        if (typeof value !== "undefined") {
            return this.props.multi ?
            this._value.indexOf(value) !== -1 : this._value === value;
        }
        return !(!this._value) && (this.props.multi ? this._value.length > 0 : this._value !== "");
    };

    /**
     * returns checked values as string
     * @returns {string}
     */
    getValue(): string {
        return this._value;
    }

    /**
     * Internal onClick event for Single Select Input. It is triggered every time.
     * @param {string} value
     * @return {boolean}
     */
    __onChangeSingle(value: string): boolean {
        if (this._value === value) {
            value = "";
        }
        let result = this.__callOnChange(value, this._value);
        if (result) {
            this._value = value;
        }
        return result;
    }
    /**
     * Splits given string by delimiter and return result as Array.
     * @param value
     * @returns {Array}
     * @private
     */
    __split(value: string): Array {
        if (value && value.length > 0) {
            return value.split(this.__delimiter);
        }
        return [];
    }
    /**
     * Internal onClick event for multi Select Input. It is triggered every time.
     * @param {string} value
     * @return {boolean}
     */
    __onChangeMulti(value: string): boolean {
        let newValue = this.__split(value);
        let result = this.__callOnChange(newValue, this._value);
        if (result) {
            this._value = newValue;
        }
        return result;
    }

    /**
     * @param {any} value
     * @param {any} oldValue
     * @returns {boolean}
     * @private
     */
    __callOnChange(value: any, oldValue: any): boolean {
        let result = true;
        if (this.props.onChange) {
            let e = {
                target: {
                    value: value,
                    oldValue: oldValue,
                    parsedValue: value
                }
            };
            result = this.props.onChange(e);
        }
        return result;
    }
}
