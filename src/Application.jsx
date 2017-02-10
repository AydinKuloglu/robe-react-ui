import React from "react";

import {
    ShallowComponent,
    Assertions,
    Cookies
} from "robe-react-commons";

import CA from "robe-react-commons/lib/application/Application";

export default class Application extends ShallowComponent {

    /**
     * PropTypes of the component
     * @static
     */
    static propTypes: Map = {
        language: React.PropTypes.string
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        language: Cookies.get("language", "assets/en_US.json")
    };

    isLoaded = false;
    constructor(props: Object) {
        super(props);
        this.componentWillReceiveProps(props);
    }
    previousLang;
    componentWillReceiveProps(props: Object) {
        this.state = {
            upgrade: this.previousLang !== props.language
        };
    }

    //TODO: Commondaki methodların buradan ulaşılabilmesi.

    render() {
        if (this.state.upgrade) {
            return <span />
        }
        let {language, ...newProps} = this.props;
        return (<div {...newProps}>
            {this.props.children}
        </div>);
    }

    componentDidUpdate() {
        this.upgradeIfNeeded();
    }

    componentDidMount() {
        this.upgradeIfNeeded();
    }

    upgradeIfNeeded() {
        if (this.state.upgrade) {
            if (Assertions.isString(this.props.language)) {
                try {
                    System.import("./" + this.props.language).then((langMap) => {
                        CA.loadI18n(langMap);
                        this.isLoaded = true;
                        this.setState({
                            upgrade: false
                        });
                        Cookies.put("language", this.props.language);
                    })
                        .catch((err) => {
                            throw err;
                        });
                } catch (error) {
                    Cookies.remove("language");
                    console.warn(error);
                }
            } else {
                CA.loadI18n(this.props.language);
                this.setState({
                    upgrade: false
                });
            }
        }
    }
}



