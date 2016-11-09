import React from "react";
import { ShallowComponent, Objects } from "robe-react-commons";
import * as Input from "../../inputs";
import ComponentManager from "../../form/ComponentManager";

export default class Filter extends ShallowComponent {

    static propTypes: Map = {
        /**
         * Field properties to filter
         */
        field: React.PropTypes.object.isRequired,
        /**
         *Value of the filter
         */
        value: React.PropTypes.any
    }

    render(): Object {
        let field = Objects.deepCopy(this.props.field);
        field.validations = undefined;
        let name = field.name;
        let Component = ComponentManager.findComponentByType(field.type);
        let style = {};
        if (field.type === "select") {
            style = { width: "176px" };
        }
        if (field.range !== true || (
            field.type !== "number" &&
            field.type !== "decimal" &&
            field.type !== "money" &&
            field.type !== "date")) {
            return (
                <Component
                    {...field}
                    style={style}
                    key={`${name}_key`}
                    ref={`${name}Ref`}
                    value={this.props.value}
                    onChange={this.__handleChange}
                    />);
        }
        let fieldMin = Objects.deepCopy(field);
        fieldMin.name += "-min";
        let fieldMax = Objects.deepCopy(field);
        fieldMax.name += "-max";
        let minOnChange = this.__handleRangeChange.bind(undefined, fieldMin.name);
        let maxOnChange = this.__handleRangeChange.bind(undefined, fieldMax.name);
        let value = this.props.value === undefined ? [] : this.props.value;
        return (
            <div>
                <Component
                    {...fieldMin}
                    style={style}
                    key={`${name}_key-min`}
                    ref={`${name}Ref-min`}
                    value={value[0]}
                    onChange={minOnChange}
                    />
                <Component
                    {...fieldMax}
                    style={style}
                    key={`${name}_key-max`}
                    ref={`${name}Ref-max`}
                    value={value[1]}
                    onChange={maxOnChange}
                    />
            </div>
        );
    }

    __handleChange(e: Object): boolean {
        let field = this.props.field;
        let name = field.name;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let filter = [];
        if (value !== "" && value !== undefined && value !== null) {
            switch (field.type) {
                case "string":
                    filter = [name, "~=", value];
                    break;
                case "text":
                    filter = [name, "~=", value];
                    break;
                case "number":
                    filter = [name, "=", value];
                    break;
                case "decimal":
                    filter = [name, "=", value];
                    break;
                case "date":
                    filter = [name, ">=", value];
                    break;
                case "password":
                    filter = [name, "=", value];
                    break;
                case "money":
                    filter = [name, "=", value];
                    break;
                case "radio":
                    filter = [name, "=", value];
                    break;
                case "select":
                    filter = [name, "=", value];
                    break;
                case "check":
                    filter = [name, "=", value];
                    break;
                default:
                    return true;
            }
        }
        this.props.onChange(name, value, filter);
        return true;
    }

    __handleRangeChange(name: string, e: Object): boolean {
        let field = this.props.field;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let valueArr = Objects.deepCopy(this.props.value === undefined ? [] : this.props.value);
        let isMin = name.substr(name.length - 4) === "-min";
        if (isMin) {
            valueArr[0] = value;
        } else {
            valueArr[1] = value;
        }
        let filter = [];
        switch (field.type) {
            case "number":
            case "decimal":
            case "date":
            case "money":
                if (valueArr[0] !== undefined && valueArr[0] !== "") {
                    filter.push(`${field.name}>=${valueArr[0]}`);
                }
                if (valueArr[1] !== undefined && valueArr[1] !== "") {
                    filter.push(`${field.name}<=${valueArr[1]}`);
                }
                filter = filter.join(",");
                break;
            default:
                return true;
        }

        this.props.onChange(field.name, valueArr, filter);
        return true;
    }
}
