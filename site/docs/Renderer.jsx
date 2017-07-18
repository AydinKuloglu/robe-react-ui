import React from "react";
import PropTypes from "prop-types";
import {Button, Panel, Table} from "react-bootstrap";
import {Maps} from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Progress from "progress/Progress";

export default class Renderer extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Component name
         */
        header: PropTypes.string,
        /**
         * Component description
         */
        desc: PropTypes.string,
        /**
         *
         */
        alternatives: PropTypes.object,
        /**
         * Component Props Json
         */
        json: PropTypes.object,
        /**
         * Component Sample Code Object
         */
        sample: PropTypes.object,
        /**
         * Component Sample Code string
         */
        code: PropTypes.string
    };

    static defaultProps = {
        json: {}
    };
    /* eslint no-useless-constructor: 0*/
    constructor(props: Object) {
        super(props);
        this.state = {
            showCode: false
        };
    }

    render(): Object {
        return (
            <div>
                <h3 style={{marginTop: 0}}>{this.props.header}</h3>
                <p>{this.props.desc}</p>
                <br/>
                <this.props.sample.default />
                <br/>
                <br/>
                <br/>
            </div >);
    }

    componentDidUpdate() {
        Progress.done();
    }
}
