import React from "react";
import { ShallowComponent, Arrays } from "robe-react-commons";
import CheckTree from "robe-react-ui/lib/checktree/CheckTree";

export default class CheckTreeSample extends ShallowComponent {

    static data = {
        text: "Root",
        code: 0,
        children: [
            {
                text: "Item 1",
                code: 1,
                children: [
                    {
                        text: "Item 1.1",
                        code: 11
                    },
                    {
                        text: "Item 1.2",
                        code: 12
                    }
                ]
            },
            {
                text: "Item 2",
                code: 2,
                children: [
                    {
                        text: "Item 2.1",
                        code: 21,
                        children: [
                            {
                                text: "Item 2.1.1",
                                code: 211
                            },
                            {
                                text: "Item 2.1.2",
                                code: 212
                            }
                        ]
                    }
                ]
            }
        ]
    };


    constructor(props: Object) {
        super(props);
        this.state = {
            value: []
        };
    }

    render(): Object {
        return (
            <div>
                <CheckTree
                    items={CheckTreeSample.data}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    handleChange = (e: Object, checkValue: String, checked: boolean) => {
        let value = this.state.value;
        if (checked) {
            value.push(checkValue);
        } else {
            Arrays.remove(value, checkValue);
        }
        this.setState({
            value: value
        });
    };

    shouldComponentUpdate(): boolean {
        return true;
    }
}
