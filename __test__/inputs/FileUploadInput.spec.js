import React from "react";
import chai from "chai";
import TestUtils from "../TestUtils";
import FileUploadInput from "inputs/upload/FileUploadInput";
import { Maps } from "robe-react-commons";

const filesUrl = TestUtils.createUrl("files");

let remoteProps = {
    url: filesUrl,
    upload: {
        type: "PUT"
    },
    info: {
        type: "POST"
    },
    delete: {
        type: "DELETE"
    }
};

const defaultProps = {
    name: "files",
    display: "thumbnail",
    label: "Dosya Seçimi",
    remote: remoteProps,
    onChange: () => {
        return true;
    }
};


describe("inputs/upload/FileUploadInput", () => {
    it("props", () => {
        let componentNode = TestUtils.renderClassIntoDocument({}, FileUploadInput, defaultProps);
        chai.assert.equal(componentNode.props.name, "files");
        chai.assert.equal(componentNode.props.display, "thumbnail");
        chai.assert.deepEqual(componentNode.props.value, undefined);
        chai.assert.equal(componentNode.props.autoUpload, true);
        chai.assert.equal(componentNode.props.multiple, true);
        chai.assert.deepEqual(componentNode.props.remote, defaultProps.remote);
        let onChangeFunction = (e) => {
            console.log(e.target.value);
        }
        let remoteProps = Maps.mergeDeep(defaultProps.remote, {
            info: {
                type: "GET"
            }
        });

        componentNode = TestUtils.renderClassIntoDocument({
            multiple: false,
            onChange: onChangeFunction,
            display: "list",
            remote: remoteProps,
            autoUpload: false,
            value: "info_test.png"
        }, FileUploadInput, defaultProps);

        chai.assert.equal(componentNode.props.display, "list");
        chai.assert.deepEqual(componentNode.props.value, "info_test.png");
        chai.assert.equal(componentNode.props.autoUpload, false);
        chai.assert.equal(componentNode.props.multiple, false);
        chai.assert.deepEqual(componentNode.props.remote, remoteProps);

        componentNode = TestUtils.renderClassIntoDocument({
            multiple: true,
            onChange: onChangeFunction,
            display: "list",
            remote: remoteProps,
            autoUpload: false,
            value: ["info_test.png"]
        }, FileUploadInput, defaultProps);

        chai.assert.equal(componentNode.props.display, "list");
        chai.assert.deepEqual(componentNode.props.value, ["info_test.png"]);
        chai.assert.equal(componentNode.props.autoUpload, false);
        chai.assert.equal(componentNode.props.multiple, true);
        chai.assert.deepEqual(componentNode.props.remote, remoteProps);

    });
    it("render", (done) => {
        let defProps = {
            name: "files",
            display: "thumbnail",
            label: "Dosya Seçimi",
            value: ["info_test.png"],
            remote: remoteProps,
            onError: (error) => {
                chai.assert.isOk(false, `FileInput Error -> ${error}`);
                done();
            }
        };

        let testArray = [];
        let wrapper;
        testArray.next = () => {
            let prop = testArray.pop();
            if (prop) {
                wrapper = TestUtils.mount(prop, FileUploadInput, defProps);
            }
        };


        let test2 = {
            value: ["unknwonfile.png"],
            onChange: (e) => {
                chai.assert.isOk(false, `It should give  error ! Because file not found on system ! e: ${e}`);
                done();
            },
            onError: (error) => {
                chai.assert.isOk(true, `File not found on system. It is correct. Error Detail: ${error}`);
                done();
            }
        };

        let test1 = {
            onChange: (e) => {
                chai.assert.deepEqual(e.target.oldValue, []);
                // chai.assert.deepEqual(e.target.value, ["info_test.png"]);
                testArray.push(test2);
                testArray.next();
            }
        };

        testArray.push(test1);

        testArray.next();
    });
});
