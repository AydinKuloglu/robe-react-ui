import React from "react";
import { ShallowComponent } from "robe-react-commons";
import "faicon/font-awesome/4.6.1/css/font-awesome.min.css";

/**
 * This component wraps font-awesome elements. Also it loads font-awesome.min.css. No need to load it somewhere else.
 * Please look at https://fortawesome.github.io/Font-Awesome/examples/
 */
export default class FaIcon extends ShallowComponent {

    static propTypes = {
        code: React.PropTypes.string.isRequired,
        size: React.PropTypes.string,
        style: React.PropTypes.object
    };

    static defaultProps = {
        size: ""
    };

    render() {
        let code = this.props.code;
        let size = this.props.size;
        let propsClassName = this.props.className === undefined ? "" : this.props.className;
        let className = `fa ${code} ${size} ${propsClassName}`;
        return (
            <i className={className} style={this.props.style} />
        );
    }
}
