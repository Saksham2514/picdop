import React, { Component } from "react";
import { Button,InputLabel } from "@mui/material";

class ImageUploadPreviewComponent extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  render() {
    return (
      <form>
        <div
          className="form-group multi-preview "
          style={{
            overflow: "scroll",
            width: "100%",
            height: "150px",
            marginTop: "1rem",
            display: this.fileArray.length === 0 ? "none" : "flex",
          }}
        >
          {(this.fileArray || []).map((url) => (
            <>
              <img
                src={url}
                alt="..."
                height={100}
                width={100}
                style={{ border: "1px solid black" }}
              />
              <br />
            </>
          ))}
        </div>
        <InputLabel sx={{my:1.5,ml:0.5}}>
              Shop Images
              </InputLabel>
        <Button variant="outlined" component="label">
          +
          <input
            type="file"
            onChange={this.uploadMultipleFiles}
            multiple
            hidden
          />
        </Button>
      </form>
    );
  }
}
export default ImageUploadPreviewComponent;
