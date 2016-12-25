import React from "react";
import { ShallowComponent, Assertions } from "robe-react-commons";
import { Panel, Row, Col, Glyphicon } from "react-bootstrap";

export default class StackLayout extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * will Shown given items which type is an array
         */
        items: React.PropTypes.array,
        /**
         * if layout container clicked then triggered.
         */
        onClick: React.PropTypes.func,
        /**
         * when a draggable element is dropped in the layout container element.
         */
        onDrop: React.PropTypes.func,
        /**
         * when a draggable element is moved out of the layout container element.
         */
        onDragLeave: React.PropTypes.func,
        /**
         * when an element is being dragged over the layout container element.
         */
        onDragOver: React.PropTypes.func,
        /**
         * when a draggable element enters the layout container element.
         */
        onDragEnter: React.PropTypes.func,
        /**
         * when the user starts to drag the layout container element.
         */
        onDragStart: React.PropTypes.func
    };

    constructor(props: Object) {
        super(props);
    }

    render(): Object {
        let { onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop, ...props } = this.props;
        return (
            <div
                {...props}
                onDragStart={this.onDragStart}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                {this.props.children}
            </div>
        );
    }

    /**
     * Called when the user starts to drag a <p> element
     * @param e
     * @returns {boolean}
     */
    onDragStart(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragStart) {
            result = this.props.onDragStart(e);
        }
        return result;
    }
    /**
     * Called when a draggable element enters a drop target:
     * @param e
     * @returns {boolean}
     */
    onDragEnter(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragEnter) {
            result = this.props.onDragEnter(e);
        }
        return result;
    }
    /**
     * Called when an element is being dragged over a drop target
     * @param e
     * @returns {boolean}
     */
    onDragOver(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragOver) {
            result = this.props.onDragOver(e);
        }
        return result;
    }

    /**
     * Called when a draggable element is moved out of a drop target
     * @param e
     * @returns {boolean}
     */
    onDragLeave(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragLeave) {
            result = this.props.onDragLeave(e);
        }
        return result;
    }
    /**
     * Called when a draggable element is dropped in a <div> element
     * @param e
     * @returns {boolean}
     */
    onDrop(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDrop) {
            result = this.props.onDrop(e);
        }
        return result;
    }
}