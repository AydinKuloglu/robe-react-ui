import React from "react";
import { ShallowComponent, Maps, Assertions, Objects } from "robe-react-commons";
import { Alert } from "react-bootstrap";
import InputValidations from "./InputValidations";
import "./Validation.css";

/**
 * BaseComponent for React Components which will use Validations
 */
export default class ValidationComponent extends ShallowComponent {
    static propTypes = {
        /**
         * Value of the component
         */
        value: React.PropTypes.any,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object
    };
    /**
     * Max length allowed message.
     * @static
     */
    static maxTextLengthMessage: string = "Input cannot be more than 1000 characters.";
    /**
     * Holds the valid property of input component.
     */
    __valid: boolean = false;
    /**
     * Validation map for all functions and custom messages .
     * protected
     */
    _validations: Map = {};

    /**
     * Creates an instance of BaseInput.
     * @param {any} props
     */
    constructor(props: Object) {
        super(props);
        if (this.props.validations !== undefined) {
            this._validations = this.props.validations;
        }
    }

    validationResult(): Object {
        let alerts;
        let errors = this.__validate();
        this.__valid = (errors.length === 0);
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }
        if (!this.isValid()) {
            alerts = <Alert className="input-alert" bsStyle="danger">{messages}</Alert>;
        }
        return alerts;
    }
    /**
     * Returns validity of the component.
     * @return {boolean}
     */
    isValid(): boolean {
        return this.__valid;
    }

    /**
     * Fired after component mounts. Sets focus from props.
     */
    componentWillMount() {
        if (this.props.validations !== undefined) {
            this._validations = this.props.validations;
        }
    }

    /**
     * Validates the input components and returns error messages.
     * @return { Array<string>} array of messages.
     */
    __validate(): Array<string> {
        let messages = [];
        Maps.forEach(this._validations, (validation: Function, key: string) => {
            // It must be a object
            if (!Assertions.isObject(validation)) {
                validation = {};
            }
            // If func is not given, take a function with the same key from InputValidations
            if (!validation.func) {
                validation.func = InputValidations[key];
                if (!validation.func) {
                    console.error(`Validation function is not found in the properties or InputValidations key: "${key}"`); // eslint-disable-line
                    return;
                }
            }
            let message = null;
            if (validation.args) {
                let inputValues = Objects.deepCopy(validation.args);
                inputValues.push(this.props.value);
                message = validation.func.apply(this.props, inputValues);
            } else {
                message = validation.func(this.props.value);
            }
            if (message !== undefined) {
                if (validation.message !== undefined) {
                    message = validation.message;
                }
                messages = messages.concat(message);
            }
        });
        return messages;
    }
}
