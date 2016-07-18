import React from "react";
import { Panel, Table } from "react-bootstrap";
import { Maps } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Highlight from "react-highlight";
import TextInputSampleContent from "../samples/inputs/SampleTextInput.txt";
import TextInputSample from "../samples/inputs/SampleTextInput";


export default class Renderer extends ShallowComponent {

    static style = {
        borderBottom: "1px solid lightgray",
        marginBottom: "50px"
    }

    json;

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        this.json = this.props.json === undefined ? {} : this.props.json;
    }

    render() {
        return (
            <div style={Renderer.style}>
                <h3 id={this.props.header}>{this.props.header}</h3>
                <h6><code>{`<${this.props.header}> `}</code>{this.props.desc}</h6>
                <TextInputSample />
                <Highlight className="javascript">
                    {TextInputSampleContent}
                </Highlight>
                <h5>Examples</h5>
                <Panel>{this.__renderAlternatives(this.json) }</Panel>
                <Panel>Code Area (Will be hidden) </Panel>
                <h5>Props</h5>
                {this.__renderTable(this.json.props) }
            </div >);
    }

    __renderAlternatives(alternatives: Array): Array {
        let divs = [];
        for (let i = 0; i < alternatives.length; i++) {
            divs.push(alternatives[i].component);
        }
        return divs;
    }

    __renderTable(data: Object): Array {
        let rows = [];

        Maps.forEach(data, (value: any, key: string) => {
            let type = value.type !== undefined ? value.type.name : "";
            rows.push(<tr>
                <td>{key}</td>
                <td>{type}</td>
                <td>{value.description}</td>
                <td>{value.required ? "Yes" : "No"}</td>
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
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

}
