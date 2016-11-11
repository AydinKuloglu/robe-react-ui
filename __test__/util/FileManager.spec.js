import chai from "chai";
import React from "react";
import TestUtils from "../TestUtils";
import FileManager from "util/FileManager";
import { AjaxRequest } from "robe-react-commons";
import path from "path";

const filesUrl = TestUtils.createUrl("files");

describe("util/FileManager", () => {
    it("constructors", () => {
        let props = {
            url: filesUrl,
            upload: {
                type: "PUT"
            },
            info: {
                type: "POST"
            },
            preview: {
                type: "GET"
            },
            delete: {
                type: "DELETE"
            }
        };

        let manager = new FileManager(props);
        let exptectedUrl = "http://localhost:3001/files";
        /* eslint-disable no-underscore-dangle */
        // check infoRequest
        chai.assert.equal(exptectedUrl, manager.__deleteRequest.__url);
        // check uploadProps
        chai.assert.equal(exptectedUrl, manager.__uploadProps.url);
        // check deleteRequest
        chai.assert.equal(exptectedUrl, manager.__deleteRequest.__url);
    });

    it("info `files array`", (done) => {
        let fileName = "info_test.png";
        let fileData = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename: fileName,
            mimetype: "image/png",
            originalname: "info_test.png",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/info_test.png.json",
            size: 2067
        };
        let expectedFiles = [fileData];

        let manager = new FileManager({
            url: filesUrl
        });
        manager.info([fileName], (files) => {
            chai.assert.deepEqual(expectedFiles, files);
            done();
        }, (error) => {
            chai.assert.isOk(false, `Failed read file from server ! Reason : ${error}`);
            done();
        });
    });

    it("info `file`", (done) => {
        let filename = "info_test.png";
        let expectedFile = {
            destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files",
            encoding: "7bit",
            fieldname: "files",
            filename: "info_test.png",
            mimetype: "image/png",
            originalname: "info_test.png",
            path: "/Users/kamilbukum/DEV/robe/robe-react-ui/__test__/files/info_test.png.json",
            size: 2067
        };

        let manager = new FileManager({
            url: filesUrl
        });

        manager.info({
            filename
        }, (file) => {
            chai.assert.deepEqual(expectedFile, file);
            done();
        }, (error) => {
            chai.assert.isOk(false, `Failed read file from server ! Reason : ${error}`);
            done();
        });
    });

    it("upload & delete", (done) => {
        let manager = new FileManager({
            url: filesUrl
        });

        let blob = new Blob(["Lorem ipsum"], {
            type: "plain/text",
            filename: "Multi File 1"
        });

        let blob2 = new Blob(["Lorem ipsum 2"], {
            type: "plain/text",
            filename: "Multi File 2"
        });

        manager.upload(
            "files",
            [blob, blob2],
            (response) => {
                chai.assert.equal(response.length, 2);
                let uploadedFiles = [response[0].filename, response[1].filename];
                manager.delete(
                    uploadedFiles,
                    (response2) => {
                        chai.assert.equal(response2.length, 2);
                        done();
                    },
                    (error) => {
                        chai.assert.isOk(false, "File couldn't delete ! Detail : ", error);
                        done(error);
                    }
                );
            },
            (error) => {
                chai.assert.isOk(false, "File couldn't upload ! Detail : ", error);
                done(error);
            }
        );
    });

});

