import React from "react";
import Maps from "robe-react-commons/lib/utils/Maps";
import BaseComponent from "libs/core/components/BaseComponent";
import Form from "react-bootstrap/lib/FormGroup";
import Input from "libs/view/form/elements/Input";
import NumericInput from "libs/view/form/elements/NumericInput";
import DateInput from "libs/view/form/elements/DateInput";
import CheckInput from "libs/view/form/elements/CheckInput";
import SelectInput from "libs/view/form/elements/SelectInput";
import HtmlEditor from "libs/view/form/elements/htmleditor/HtmlEditor";
import DropzoneUpload from "libs/view/upload/DropzoneUpload";


class DataForm extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = this.props.data;
    };

    _cascadedList = [];

    render() {
        return (
            <Form>
                {this.__createForm(this.props.model, this.state)}
            </Form>
        );
    };

    isValid = ()=> {
        for (let key in this.refs) {
            if (this.refs.hasOwnProperty(key)) {
                let child = this.refs[key];
                if (child.isValid) {
                    if (!child.isValid())
                        return false;
                }
            }
        }
        return true;
    };

    __createForm = (model, data)=> {
        var elements = [];
        var i = 0;
        Maps.forEach(model, function (value, key) {
            if (value.visible != false) {
                elements.push(this.__decideElement(value, data, 0 == i++));
            }
        }.bind(this));
        return elements;
    };


    __filterUndefined = (value)=> {
        if (value === 0)
            return 0;
        return value ? value : "";
    };


    __decideElement = (model, data, focus)=> {
        if (!data)
            data = {};
        var value = this.__filterUndefined(data[model.code]);

        var validations = model.validations;
        var required = undefined;
        var min = undefined;
        var max = undefined;
        var regex = undefined;

        if (validations) {
            required = validations["required"];
            min = validations["min"];
            max = validations["max"];
            regex = validations["regex"];
        }

        let disabled = model.editable != undefined ? !model.editable : false;
        switch (model.type) {
            case "number":
                return (<NumericInput
                    type="text"
                    label={model.title}
                    floatingLabel={true}
                    key={model.code}
                    ref={model.code}
                    required={required}
                    min={min}
                    max={max}
                    focus={focus}
                    disabled={disabled}
                    onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                    value={value}/>);
            case "string":
                return (<Input
                    type="text"
                    label={model.title}
                    key={model.code}
                    ref={model.code}
                    required={required}
                    min={min}
                    max={max}
                    disabled={disabled}
                    focus={focus}
                    regex={regex}
                    onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                    value={value}/>);
            case "textarea":
                return (<Input
                    type="textarea"
                    label={model.title}
                    key={model.code}
                    ref={model.code}
                    required={required}
                    min={min}
                    max={max}
                    focus={focus}
                    disabled={disabled}
                    regex={regex}
                    onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                    value={value}/>);
            case "password":
                return (<Input
                    label={model.title}
                    key={model.code}
                    ref={model.code}
                    required={required}
                    min={min}
                    max={max}
                    focus={focus}
                    disabled={disabled}
                    type={"password"}
                    onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                    value={value}/>);
            case "date":

                // TODO format={model.format}
                return (<DateInput
                    label={model.title}
                    key={model.code}
                    disabled={disabled}
                    ref={model.code}
                    focus={focus}
                    onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                    value={value}/>);
            case "list" :

                var dataTextField = model.dataTextField || "name";
                var dataValueField = model.dataValueField || "oid";
                var optionLabel = model.optionLabel || "<Lütfen Seçiniz>";

                if (model.cascade) {
                    model.value = value;
                    this._cascadedList.push(model);
                }


                return (
                    <SelectInput
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                        value={value}
                        disabled={disabled}
                        dataTextField={dataTextField}
                        dataValueField={dataValueField}
                        optionLabel={optionLabel}
                        required={required}
                        focus={focus}
                        data={this.props.resources[model.code]}/>);
            case "bool":
                if (!value)
                    value = false;
                return (
                    <CheckInput
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        focus={focus}
                        disabled={disabled}
                        onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                        value={value}/>);
            case "editor":
                return (
                    <HtmlEditor
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        disabled={disabled}
                        onChange={this.__handleChange.bind(undefined,model.code,model.cascade,undefined)}
                        value={value} required={required}
                        min={min}
                        max={max}
                        focus={focus}
                    />);
            case "upload":
                return ( <DropzoneUpload key={model.code} postUrl={window.backendRootPath+"assets"}
                                         files={value||[]}
                                         onChange={this.__handleChange.bind(undefined,model.code,model.cascade,model.deleted)}/>
                );

        }
    };

    __handleChange = (code, cascade, deleted, e)=> {

        var state = {};
        var value = e.target.parsedValue != undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        if (deleted) {// that mean this upload. i need set the deleted item
            state[deleted] = e.target.deleted ? e.target.deleted : [];
        }

        if (cascade) {
            for (var cCode in cascade) {
                let filter = {};
                filter["code"] = cascade[cCode];
                filter["value"] = value;

                if (e.target.default != true)
                    state[cCode] = undefined;

                this.refs[cCode].setState({
                    "filter": filter
                });
            }
        }
        this.setState(state);
    };

    componentDidMount = () => {

        for (let i = 0; i < this._cascadedList.length; i++) {
            var obj = this._cascadedList[i];
            var e = {};
            e.target = {};
            e.target.parsedValue = obj.value;
            e.target.default = true;

            this.__handleChange(obj.code, obj.cascade, undefined, e)
        }
    };
}

module.exports = DataForm;