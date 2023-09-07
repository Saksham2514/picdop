import React from "react";
import axios from "axios";

class FileUploader extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      responseArray: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files,
      responseArray: [],
    });
  }

  onSubmit(e) {
    if (!this.state.selectedFile) {
      alert("Please select a file!");
      return false;
    }
    const data = new FormData();

    for (let i = 0; i < this.state.selectedFile.length; i++) {
      data.append(this.props.name, this.state.selectedFile[i]);
    }

    let url = process.env.REACT_APP_BACKEND_URL + "test";
    axios.post(url, data,{
      headers:{
          "Authorization":this.props.token
      }
    }).then(
      (res) => {
        console.log(res.data);
        // then print response status
        if(res?.data?.stat === "success"){
          this.setState({ responseArray: res.data.message });
          const {details }= {...this.props};
          this.props.setDetails({...details, name : res.data.message })
          this.resetFile();
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  resetFile() {
    // Reset file input control
    document.getElementsByName("file")[0].value = null;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>{this.props.label}</label>
              <input
                type="file"
                className="form-control"
                multiple
                name="shopImages"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="form-row">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => this.onSubmit()}
              >
                Upload {this.props.label}
              </button>
            </div>
          </div>
          <br />
          <div style={{
            display:"flex",
            overflowX:"auto"
          }}>
          {this.state.responseArray.map((res, i) => (
              
                <img key={i} src={process.env.REACT_APP_BACKEND_URL+res} alt="res" style={{
                  height:"10rem",
                  aspectRatio:"1/1",
                  marginRight:"1rem",
                  marginLeft:"1rem"
                }}/>
              
                ))}
            </div>
        </div>
      </div>
    );
  }
}

export default FileUploader;
