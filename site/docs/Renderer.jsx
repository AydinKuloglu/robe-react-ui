import React from "react";
import { Button, Panel, Table } from "react-bootstrap";
import { Maps } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Highlight from "react-highlight";
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
        header: React.PropTypes.string,
        /**
         * Component description
         */
        desc: React.PropTypes.string,
        /**
         *
         */
        alternatives: React.PropTypes.object,
        /**
         * Component Props Json
         */
        json: React.PropTypes.object,
        /**
         * Component Sample Code Object
         */
        sample: React.PropTypes.object,
        /**
         * Component Sample Code string
         */
        code: React.PropTypes.string
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
        let highlight;
        if (this.state.showCode) {
            highlight = (<Highlight className="javascript">
                {this.props.code}
            </Highlight>);
        }

        let codeSection = this.props.code ?
            (<div>
                {highlight}
                <Button bsStyle="link" bsSize="xsmall" className="pull-right" onClick={this.__toogleCode}>{(this.state.showCode ? "Hide" : "Show") + " Code"}</Button>
            </div>) : undefined;
        return (
            <div>
                <h3>{this.props.header}</h3>
                <h5><code>{`<${this.props.header}>`}</code> {this.props.desc}</h5>
                <h4>Examples</h4>
                <Panel>
                    <this.props.sample.default />
                    {codeSection}
                </Panel>
                <h4>{this.props.json.props ? "Props" : ""}</h4>
                {Renderer.renderPropsTable(this.props.json.props)}
                <h4>{this.props.json.methods ? "Methods" : ""}</h4>
                {Renderer.renderMethodsTable(this.props.json.methods)}
            </div >);
    }

    __toogleCode = () => {
        this.setState({
            showCode: !this.state.showCode
        });
    }

    static renderPropsTable(data: Object): Array {
        if (data === undefined) {
            return undefined;
        }

        let rows = [];

        Maps.forEach(data, (value: any, key: string) => {
            let type = value.type !== undefined ? value.type.name : "";
            let defaultVal = value.defaultValue !== undefined ? value.defaultValue.value : "";
            rows.push(<tr key={key}>
                <td>{key}</td>
                <td>{type}</td>
                <td>{defaultVal}</td>
                <td>{value.required ? "Yes" : "No"}</td>
                <td>{value.description}</td>
            </tr>);
        });

        return (
            <Table responsive striped bordered condensed>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Required</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
    static renderMethodsTable(data: Object): Array {
        if (data === undefined) {
            return undefined;
        }
        let rows = [];

        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            if (value.name.indexOf("__") !== 0) {
                rows.push(<tr key={value.name}>
                    <td>{value.name}</td>
                    <td>{value.returns ? value.returns.type.name : ""}</td>
                    <td>{value.description}</td>
                </tr>);
            }
        }

        return (
            <Table responsive striped bordered condensed>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Returns</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
    componentDidUpdate() {
        Progress.done();
    }
}
