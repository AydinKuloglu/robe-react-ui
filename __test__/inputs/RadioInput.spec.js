import React from "react";
import chai from "chai";
import TestUtils from "react-addons-test-utils";
import RadioInput from "inputs/RadioInput";
import Generator from "../test-utils/Generator";
import { mount, simulate,shallow } from 'enzyme';

describe("inputs/RadioInput", () => {

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


     const getComponent = (props: Object): Object => {
        return (
            <RadioInput {...props} />
        );
    };
    

    let values = [];

    const handleChange = (e) => {
    values = e.target.value;};

    it("props", () => {
           let props = {
            label:"Label",
            disabled:false,
            hidden:false
        };
         let wrapper = mount(getComponent(props));
         chai.assert.equal(wrapper.props().label,'Label');
         chai.assert.equal(wrapper.props().disabled,false);
         chai.assert.equal(wrapper.props().hidden,false);

         wrapper.setProps({label:"New Label",disabled:true,hidden:true});
         chai.assert.equal(wrapper.props().hidden,true);
         chai.assert.equal(wrapper.props().disabled,true);
         chai.assert.equal(wrapper.props().label,'New Label');
    });


    it("onChange", () => {
            let props = {
                label:"Label",
                disabled:false,
                hidden:false,
                items:langs[0]
            };
            let wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
            let radioInput = wrapper.find(".fa-circle-o").first();

            radioInput.simulate("click");
            wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
            chai.assert.equal(wrapper.find(".fa-dot-circle-o").length, 1);

        });


        it("isChecked", () => {

            values=[];
            let props = {
                label:"Label",
                disabled:false,
                hidden:false,
                items:langs
            };
            let wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));

            chai.assert.equal(wrapper.instance().isChecked(), false);
            let radioInput = wrapper.find(".fa-circle-o").first();

            radioInput.simulate("click");
            wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
            chai.assert.equal(wrapper.instance().isChecked(), true);

            radioInput = wrapper.find(".fa-circle-o").last();

            radioInput.simulate("click");
            wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));
            chai.assert.equal(wrapper.instance().isChecked("en"), true);

        });


        it("getValue", () => {

            values=[];
            let props = {
                label:"Label",
                disabled:false,
                hidden:false,
                items:langs
            };
            let wrapper = mount(getComponent({ items: langs, value: values, onChange: handleChange }));

            chai.assert.equal(wrapper.instance().getValue(), "");
            let radioInput = wrapper.find(".fa-circle-o").first();

            radioInput.simulate("click");
            wrapper = mount(getComponent({ items: langs, value: values }));
            chai.assert.equal(wrapper.instance().getValue(), "en");


            radioInput = wrapper.find(".fa-dot-circle-o").first();
            radioInput.simulate("click");
            wrapper = mount(getComponent({ items: langs, value: values }));
            chai.assert.equal(wrapper.instance().getValue(), "en");

        });

});
