import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import Select from "react-select";
import Col from "react-bootstrap/lib/Col";


require("react-select/dist/react-select.css");

// read more https://github.com/JedWatson/react-select

class MultiValueSelectInput extends BaseComponent {

    constructor(props) {
        super(props);
    };

    render() {

        let placeholder = this.props.placeholder == undefined ? "<Lütfen Seçiniz>" : this.props.placeholder;

        return (
            <Col className="form-group">
                <Select
                    {...this.props}
                    multi={true}
                    noResultsText="Sonuç bulunamadı."
                    placeholder={placeholder}/>
            </Col>
        );
    };
}


module.exports = MultiValueSelectInput;