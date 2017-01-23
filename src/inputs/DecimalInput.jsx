import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {InputGroup} from "react-bootstrap";
import Input from "./BaseInput";
import FaIcon from "../faicon/FaIcon";

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
        value: React.PropTypes.any,
        /**
         * increment and decrement number
         */
        step: React.PropTypes.number,
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
        hidden: React.PropTypes.bool,
        /**
        *Defines the display style of the Validation message.
        */
        validationDisplay: React.PropTypes.oneOf(["overlay", "block"]),
        /**
        * Left Input Addon
        */
        inputGroupLeft: React.PropTypes.object,
        /**
        * Right Input Addon
        */
        inputGroupRight: React.PropTypes.object
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        decimalSeparator: ".",
        value: "",
        step:1,
        disabled: false,
        readOnly: false,
        hidden: false,
        validationDisplay: "block"
    };

    innerComponent;
    __caretPosition;

    render(): Object {
        /* eslint-disable no-unused-vars */

        let { decimalSeparator, ...newProps } = this.props;
        return (
            <Input
                {...newProps}
                type="text"
                ref={(component: Object) => { this.innerComponent = component } }
                step={this.props.step}
                value={this.props.value}
                onChange={this.__numericFilter}
                onKeyDown={this.__handleKeyPress}
                inputGroupRight={<InputGroup.Addon style={{padding:0}}><div className="col-sm-12">
                    <div className="col-sm-6">
                        <span style={{cursor:"pointer"}} onClick ={(e)=>{
                            this.__valueIncAndDec(e,"inc");
                        }} >&#x25B2;</span>
                    </div>
                    <div className="col-sm-6">
                       <span style={{cursor:"pointer"}} onClick ={(e)=>{
                            this.__valueIncAndDec(e,"dec");
                        }} >&#x25BC;</span>
                    </div>
                </div></InputGroup.Addon>}
            />
        );
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid(): boolean {
        return this.innerComponent.isValid();
    }

    /**
     * checks validation by current value
     * isValid then return empty Array else return Array<String>
     * isValid = Array.length != 0
     * @param value
     */
    validate(value: any): Array<string> {
        return this.innerComponent.validate(value);
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    __numericFilter(e: Object): boolean {
        let value = e.target.value;
        if (value !== null && value !== undefined) {
            this.__caretPosition = this.innerComponent.getCaretPosition();
            let indexOfDS = value.indexOf(this.props.decimalSeparator);
            if (indexOfDS === 0) {
                value = `0${value}`;
                this.__caretPosition++;
            } else if (value.charAt(0) === "0" && indexOfDS !== 1 && indexOfDS !== -1) {
                value = value.substring(1);
                this.__caretPosition--;
            }
        }
        let result = this.__isFloat(value) || value === "";
        if (result && this.props.onChange) {
            e.target.parsedValue = value;
            result = this.props.onChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.innerComponent.isFocused()) {
            this.innerComponent.setCaretPosition(this.__caretPosition);
        }
        return result;
    }

    __handleKeyPress = (event) => {
        if(event.key==="ArrowUp"){
            this.__valueIncAndDec(event,"inc");
        }else if(event.key==="ArrowDown"){
            this.__valueIncAndDec(event,"dec");
        }
    }

    __isFloat = (input: string): boolean => {
        if (input === null || input === undefined) {
            return false;
        }
        let found = input.match(`^[0-9]{1,6}((\\${this.props.decimalSeparator})|(\\${this.props.decimalSeparator}\\d{1,2}))?$`);
        return found !== undefined && found !== null;
    }
    __valueIncAndDec(e,type){
        e.target = {};
        e.target.name=this.props.name;

        let currentValue = parseFloat(this.props.value,10);

        if(type=="inc"){
            e.target.value = currentValue?(currentValue+this.props.step):(this.props.step);
        }else {
            e.target.value = currentValue?(currentValue-this.props.step):"";
        }
        e.target.value+="";
        this.__numericFilter(e);
    }

    componentDidUpdate() {
        if (this.innerComponent.isFocused()) {
            this.innerComponent.setCaretPosition(this.__caretPosition);
        }
    }
}
