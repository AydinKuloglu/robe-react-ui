import React from "react";
import { Panel } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class Renderer extends ShallowComponent {

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        return this.__renderComponent(this.props);
    }

    __renderComponent = (element: Object, inner: boolean) => {
        let component = null;

        if (Array.isArray(element.component)) {
            component = this.__renderComponents(element.component);
        } else {
            component = element.component;
        }
        let bsStyle = inner ? "" : undefined;
        return (
            <Panel header={element.header} bsStyle={bsStyle} id={element.header}>
                {component}
            </Panel>
        );
    }
    __renderComponents = (components) => {
        let componentArray = [];
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            componentArray.push(this.__renderComponent(component, true));
        }
        return componentArray;
    }

}
