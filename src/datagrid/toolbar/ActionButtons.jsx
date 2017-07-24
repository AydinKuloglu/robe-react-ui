import React from "react";
import PropTypes from "prop-types";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Maps from "robe-react-commons/lib/utils/Maps";
import {
    ButtonGroup,
    Button
} from "react-bootstrap";
import FaIcon from "../../faicon/FaIcon";

export default class ActionButtons extends ShallowComponent {

    static propTypes: Map = {
        /**
         * Fields Configurations to show style on view.
         */
        visible: PropTypes.bool
    };
    static defaultProps = {
        visible: true,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            disabled: true
        };
    }


    render(): Object {
        if (this.props.visible) {
            let actions = [];
            Maps.forEach(this.props.items, (item: Object) => {
                if (item.visible) {
                    let disabled = item.disabled;
                    if (item.name === "edit" || item.name == "delete") {
                        disabled = this.state.disabled;
                    }
                    let action = <Button key={item.text} bsSize="small" disabled={disabled} onClick={item.onClick}><FaIcon code={item.icon} size={"fa-lg"} /><span className="hidden-xs"> {item.text}</span></Button>;
                    actions.push(action);
                }
            });

            return (
                <ButtonGroup className="pull-right">
                    {actions}
                </ButtonGroup>
            );
        }
        return <span />;
    }
}
