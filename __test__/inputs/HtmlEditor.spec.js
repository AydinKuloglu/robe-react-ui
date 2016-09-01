import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";// eslint-disable-line import/no-extraneous-dependencies
import HtmlEditor from "inputs/htmleditor/HtmlEditor";// eslint-disable-line

describe("inputs/htmleditor/HtmlEditor", () => {
    const getComponent = (props: Object): Object => {
        return (
            <HtmlEditor // eslint-disable-line react/jsx-filename-extension
                label="HtmlEditor Label Text Example"
                value={props.value !== undefined ? props.value : "This is some example text must be equals with HtmlEditor value"}
                onChange={props.onChange}
                validations={{
                    required: (value: any): Array => {
                        return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                    }
                }}
            />
        );
    };

    it("'props' Controls", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.props.label, "HtmlEditor Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with HtmlEditor value");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({
            onChange: () => {
            }
        }));
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);// eslint-disable-line react/no-find-dom-node
        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.equal(componentNode.isValid(), false);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1);// eslint-disable-line react/no-find-dom-node
    });
});
