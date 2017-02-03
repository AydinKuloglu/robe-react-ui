import React from "react";
import {render} from "react-dom";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    Button,
    MenuItem
} from "react-bootstrap";
import {ShallowComponent, Application} from "robe-react-commons";
import Progress from "progress/Progress";
import Components from "./components/Components";
import Docs from "./docs/Docs";
import Welcome from "./Welcome";
import SampleProjects from "./sampleprojects/SampleProjects";
import "./style.css";
import {NotFound} from "./error";


export default class Main extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        let path = window.location.hash.substring(1).split("/")[0];
        this.state = {
            activeKey: path
        };
        this.__onSelect = this.__onSelect.bind(this);
    }
    narbar = null;
    render(): Object {
        let activePage = Main.getActivePage(this.state.activeKey);
        return (
            <span>
                <Navbar inverse collapseOnSelect>
                    <a href="https://github.com/robeio/robe-react-ui" target="_blank">
                        <img
                            style={{ position: "absolute", top: "0px", right: "0px", border: "0px", zIndex: 1 }}
                            alt="Fork me on GitHub"
                            src="./forkme_right_orange_ff7600.png"
                        />
                    </a>
                    <Navbar.Header>
                        <Navbar.Toggle style={{ float: "left", marginLeft: 10 }}/>
                        <img src="./avatar.png" alt="logo"/>
                        <Navbar.Brand>
                            <a
                                href="#Welcome"
                                style={{ cursor: "pointer" }}
                                onClick={this.__goWelcome}
                            >Robe React UI</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav
                            style={{ marginTop: 0 }}
                            activeKey={this.state.activeKey}
                            onSelect={this.__onSelect}
                        >
                            <NavItem eventKey="Components">{Application.i18n(Main, "site.index", "components")}</NavItem>
                            <NavItem eventKey="Docs">{Application.i18n(Main, "site.index", "docs")}</NavItem>
                            <NavItem eventKey="Samples">{Application.i18n(Main, "site.index", "samples")}</NavItem>
                            <NavItem eventKey="About">{Application.i18n(Main, "site.index", "about")}</NavItem>
                            <NavItem eventKey="React-Bootstrap">
                                <img
                                    src="https://react-bootstrap.github.io/assets/logo.png"
                                    alt="rblogo"
                                    width={18}
                                /> React
                                Bootstrap
                            </NavItem>
                            <NavItem eventKey="Recharts" className="re-charts">
                                {"<Recharts />"}
                            </NavItem>
                            <NavDropdown title={Application.i18n(Main, "site.index", "languageTitle")} id="nav-dropdown" style={{ display: "inline" }}>
                                <MenuItem eventKey="en_US">{Application.i18n(Main, "site.index", "languageItemEnglish")}</MenuItem>
                                <MenuItem eventKey="tr_TR">{Application.i18n(Main, "site.index", "languageItemTurkish")}</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div
                    id="activePage"
                    style={{ overflowY: "auto", overflowX: "hidden", height: window.innerHeight - 48 }}
                >
                    {activePage}
                </div>
            </span>
        );
    }

    __goWelcome() {
        this.__onSelect("Welcome");
    }

    __onSelect(key: string) {
        Progress.start();
        if (key === "React-Bootstrap") {
            window.open("https://react-bootstrap.github.io/components.html");
            return;
        }
        if (key === "Recharts") {
            window.open("http://recharts.org/");
            return;
        }
        if (key === "en_US") {
            if(this.props.changeLanguage){
                this.props.changeLanguage(undefined);
            }
            Application.loadI18n(require("../src/assets/en_US.json"));
            this.forceUpdate();
            return;
        }
        if (key === "tr_TR") {
            let lang = "./assets/tr_TR.json";
            if(this.props.changeLanguage){
                this.props.changeLanguage(lang);
            }
            Application.loadI18n(require("../src/assets/tr_TR.json"));
            this.forceUpdate();
            return;
        }
        window.location.hash = `#${key}`;

        let element = document.getElementById("activePage");
        element.scrollTop = 0;

        this.setState({
            activeKey: key
        });
        this.forceUpdate();
    }

    static getActivePage(path: string): Object {
        switch (path) {
            case "Components":
                return <Components />;
            case "Docs":
                return <Docs />;

            case "JSDocs":
                return <JSDocs />;

            case "About":
                return <NotFound />;

            case "Samples":
                return <SampleProjects />;
            default:
                return <Welcome />;
        }
    }

    componentDidUpdate() {
        Progress.done();
    }

}
