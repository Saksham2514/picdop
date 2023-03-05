import React from "react";


class FileUploader extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      responseArray: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileToDataUri = this.fileToDataUri.bind(this);
  }

 
   fileToDataUri  (image)  {
    return new Promise((res) => {
      const reader = new FileReader();
      const {type, name, size} = image;
      reader.addEventListener('load', () => {
          res({
              base64: reader.result,
              name: name,
              type,
              size: size,
          })
      });
      reader.readAsDataURL(image);
    })
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files,
      responseArray: [],
    });
  }

  async onSubmit(e) {
    if (!this.state.selectedFile) {
      alert("Please select a file!");
      return false;
    }
    const data = [];
    console.log(this.state.selectedFile);
    
    const newImagesPromises = []
    for (let i = 0; i < this.state.selectedFile.length; i++) {
    newImagesPromises.push(this.fileToDataUri(this.state.selectedFile[i]))
    }
    const newImages = await Promise.all(newImagesPromises)
    newImages.map((d)=>data.push(d.base64));
    console.log(data);
    
/*
    for (let i = 0; i < this.state.selectedFile.length; i++) {
      //  console.log(fileToDataUri(this.state.selectedFile[i]));
      data.append(this.props.name, this.state.selectedFile[i]);
    }

    let url = process.env.REACT_APP_BACKEND_URL + "test";
    axios.post(url, data).then(
      (res) => {
        // console.log(res.data);
        // then print response status
        if(res?.data?.stat === "success"){
          this.setState({ responseArray: res.data.message });
          this.props.setDetails(res.data.message)
          this.resetFile();
        }
      },
      (error) => {
        alert(error);
      }
    );*/
  }

  resetFile() {
    // Reset file input control
    document.getElementsByName("file")[0].value = null;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
            {this.state.responseArray.length === 0 ? (<>
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
          </>) : (<>
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
            </>)}
        </div>
      </div>
    );
  }
}

export default FileUploader;
