import React from "react";
import { Application } from "robe-react-commons";
import { Grid, Thumbnail, Row, Col, Label } from "react-bootstrap";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import ProjectList from "./ProjectList";

export default class SampleProjects extends React.Component {

    render(): Object {
        return (
            <Grid>
                <Row>
                    <h2>{Application.i18n(SampleProjects, "sampleprojects.SampleProjects", "title")}</h2>
                    <h5>{Application.i18n(SampleProjects, "sampleprojects.SampleProjects", "header")}</h5>
                </Row>
                {this.renderProjects()}
            </Grid>
        );
    }

    renderProjects() {
        let projects = [];
        for (let i = 0; i < ProjectList.length; i++) {
            projects.push(
                <Renderer
                    key={ProjectList[i].header}
                    header={ProjectList[i].header}
                    desc={ProjectList[i].desc}
                    image={ProjectList[i].image}
                    link={ProjectList[i].link}
                    features={ProjectList[i].features}
                    />);
        }
        return projects;
    }
}
