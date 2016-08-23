import React from "react";
import chai from "chai";
import TestUtils from "react-addons-test-utils";
import CheckInput from "inputs/CheckInput";
import Generator from "../test-utils/Generator";
import { mount, simulate,shallow,expect } from 'enzyme';

describe("inputs/CheckInput", () => {
    const langs = [
        {
            text: "English",
            value: "en"
        },
        {
            text: "Turkish",
            value: "tr"
        },
        {
            text: "Kurdish",
            value: "kr"
        }
    ];

    const lang= {
            text: "English",
            value: "en"
        };

     const getComponent = (props: Object): Object => {
        return (
            <CheckInput {...props} />
        );
    };
    

    let values = [];

    const handleChange = (e) => {
    values = e.target.value;};


 it("props", () => {

        let props = {
            items:langs,
            value:values,
            label:"Label"
        };
         let wrapper = mount(getComponent(props));
         chai.assert.equal(wrapper.props().label,'Label');
         chai.assert.equal(wrapper.props().disabled,false);

         wrapper.setProps({ label: 'Label 1' ,disabled:true});

         chai.assert.equal(wrapper.props().label,'Label 1');
    });


    it("onChange", () => {
         let wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
        chai.assert.equal(wrapper.find(CheckInput).length, 1);
        let checkInput = wrapper.find(".fa-square-o").first();

        checkInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
        chai.assert.equal(wrapper.find(".fa-check-square-o").length, 1);

        checkInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: values }));
        chai.assert.equal(wrapper.find(".fa-check-square-o").length, 1);

        values=[];
        wrapper = mount(getComponent({ item: lang, value: values, onChange: handleChange }));
        checkInput = wrapper.find(".fa-square-o").first();
        checkInput.simulate("click");
        wrapper = mount(getComponent({ item: lang, value: true, onChange: handleChange }));
        chai.assert.equal(wrapper.find(".fa-check-square-o").length, 1);



    });



    it("isChecked", () => {
        values=[];

        let wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
        chai.assert.equal(wrapper.instance().isChecked("en"),false);
        chai.assert.equal(wrapper.find(CheckInput).length, 1);
        let checkInput = wrapper.find(".fa-square-o").first();
        chai.assert.equal(wrapper.instance().isChecked(),false);
        chai.assert.equal(wrapper.instance().isChecked("en"),false);
        chai.assert.equal(wrapper.instance().isChecked("tr"),false);
        chai.assert.equal(wrapper.instance().isChecked("kr"),false);

        checkInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: values,onChange: handleChange }));

        chai.assert.equal(wrapper.instance().isChecked("en"),true);
        chai.assert.equal(wrapper.instance().isChecked("tr"),false);
        chai.assert.equal(wrapper.instance().isChecked("kr"),false);

        checkInput = wrapper.find(".fa-square-o").at(1);

        checkInput.simulate("click");
        wrapper = mount(getComponent({ items: langs, value: values,onChange: handleChange }));

        chai.assert.equal(wrapper.instance().isChecked("en"),true);
        chai.assert.equal(wrapper.instance().isChecked("tr"),false);
        chai.assert.equal(wrapper.instance().isChecked("kr"),true);

    });
});
