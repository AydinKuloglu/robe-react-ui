import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import HtmlEditor from "robe-react-ui/lib/inputs/htmleditor/HtmlEditor";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";


export default class HtmlEditorSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            HtmlEditorNormal: "Some Text",
            HtmlEditorAutoReize: ""
        };
    }

    render() {
        return (
            <div>
             <HtmlEditor
                 label="HtmlEditor"
                 value={this.state.HtmlEditorNormal}
                 onChange={this.__handleChange.bind(this, "HtmlEditorNormal")}
             />
            <HtmlEditor
                label="HtmlEditor with AutoReize and Height"
                value={this.state.HtmlEditorAutoReize}
                autoResize
                height={150}
                onChange={this.__handleChange.bind(this, "HtmlEditorAutoReize")}
            />
            <HtmlEditor
                label="With Validations"
                value={this.state.HtmlEditorValidations}
                onChange={this.__handleChange.bind(this, "HtmlEditorValidations")}
                validations={{
                        htmlRequired: true
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
