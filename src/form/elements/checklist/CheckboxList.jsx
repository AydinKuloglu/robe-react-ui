import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import Col from "react-bootstrap/lib/Col";
import CheckboxListItem from "libs/view/form/elements/checklist/CheckboxListItem";
import "libs/view/form/elements/checklist/style.css";
import is from "is-js";
import Arrays from "robe-react-commons/lib/utils/Arrays";


class CheckboxList extends BaseComponent {


    static propTypes = {
        data: React.PropTypes.array,
        value: React.PropTypes.array,
        dataTextField: React.PropTypes.string,
        dataValueField: React.PropTypes.string,
        selectable: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onValueChanged: React.PropTypes.func
    };


    static defaultProps = {
        selectable: true
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selection || "",
            checkedItems: this.props.checkedItems || []
        };

    };

    render() {

        var data = this.props.data;
        var listGroupItems = [];
        for (let i = 0; i < data.length; i++) {
            var item = data[i];
            var value = this.__getDataValueField(item);
            let checked = false;
            if (this.state.checkedItems.indexOf(value) !== -1) {
                checked = true;
            }
            listGroupItems.push(<CheckboxListItem
                value={value}
                key={i}
                checked={checked}
                label={this.__getDataTextField(item)}
                onCheck={this.__onItemChecked}
                onSelect={this.__onSelectionChanged}/>);
        }

        return (
            <Col componentClass="ul" className="list-group checked-list-box checkboxlist-scroll" style={this.props.style}>
                {listGroupItems}
            </Col>);
    };


    __onItemChecked = (code, checked, item)=> {
        let checkedItems = this.state.checkedItems;

        if (checked) {
            checkedItems.push(code);
            this.__onSelectionChanged(code, checked, item);
        } else {
            Arrays.remove(checkedItems, code);
        }

        this.setState({
            checkedItems: checkedItems
        });

        if (this.props.onChecked)
            this.props.onChecked(checkedItems, code, checked);

        if (this.props.onValueChanged)
            this.props.onValueChanged(code, checked);
    };
    __onSelectionChanged = (code, selected, item)=> {
        if (this.props.selectable) {
            if (this.state.selection) {
                this.state.selection.setState({
                    selected: false
                });
            }
            item.setState({
                selected: true
            });
            this.setState({
                selection: item
            });

            if (this.props.onSelected)
                this.props.onSelected(code);
        }


    };


    __getDataTextField = (item)=> {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || (is.object(item) ? "" : item);
        }
        return item;
    };
    __getDataValueField = (item)=> {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || (is.object(item) ? "" : item);
        }
        return item;
    };


}
module.exports = CheckboxList;

