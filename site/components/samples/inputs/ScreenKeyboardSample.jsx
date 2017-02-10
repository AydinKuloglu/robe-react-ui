import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import NumericInput from "robe-react-ui/lib/inputs/NumericInput";
import ScreenKeyboard from "robe-react-ui/lib/inputs/screenkeyboard/ScreenKeyboard";
import { ControlLabel } from "react-bootstrap";

export default class TextInputSample extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
            screenKeyboardValue: "",
            screenKeyboardValueWithNumeric: "",
            screenKeyboardDefault: ""
        };
    }

    render():Object {
        return (
            <span>
                <div style={{marginBottom:230}}>
                    <TextInput
                        id="screenKeyboardSample" // id -> required
                        label="Screen Keyboard With Language Keyboard"
                        name="screenKeyboardValue"
                        value={this.state.screenKeyboardValue}
                        onChange={this.__handleChange}
                    />
                    <ScreenKeyboard inputId="screenKeyboardSample"
                                    language="tr_TR"
                                    showOnMobile
                                    languageText="Türkçe Q"
                                    onChange={this.__onChangeTextKeyboard}
                    />
                </div>

                <div style={{marginBottom:200}}>
                    <NumericInput
                        id="screenKeyboardSample1" // id -> required
                        label="Screen Keyboard With Numeric Keyboard"
                        name="screenKeyboardValueWithNumeric"
                        value={this.state.screenKeyboardValueWithNumeric}
                        onChange={this.__handleChange}
                    />
                    <ScreenKeyboard inputId="screenKeyboardSample1"
                                    language="numeric"
                                    onChange={this.__onChangeNumericKeyboard}
                    />
                </div>

                <div style={{marginBottom:230}}>
                    <ControlLabel>Can Use Without Input (Returns Only Clicked Key)</ControlLabel><br/>
                    <span>Clicked Key : </span>
                    <ControlLabel>{this.state.screenKeyboardDefault}</ControlLabel>
                   <ScreenKeyboard onChange={this.__onChangeDefaultKeyboard}
                                   languageText="English -- Draggable Area --"
                   />
                </div>
            </span>
        );
    }

    __onChangeTextKeyboard(e:Object, currentValue:string) {
        this.setState({screenKeyboardValue: currentValue});
        console.log(e.target.value, currentValue);
    };

    __onChangeNumericKeyboard(e:Object, currentValue:string) {
        this.setState({screenKeyboardValueWithNumeric: currentValue});
        console.log(e.target.value, currentValue);
    };

    __onChangeDefaultKeyboard(e:Object) {
        this.setState({screenKeyboardDefault: e.target.value});
    };

    __handleChange(e:Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    }
}
