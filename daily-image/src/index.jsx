import React, { Component } from 'react'
import axios from 'axios'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
import { render } from 'react-dom'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gallery: []
    }
  } 

  componentDidMount(){
    axios.get('http://res.cloudinary.com/nanoo/image/list/tests.json')
        .then(res => {
            console.log(res.data.resources)
            this.setState({gallery: res.data.resources})
        })
  }

  uploadWidget(){
    cloudinary.openUploadWidget({ 
      cloud_name: 'nanoo',
      upload_preset: 'q0cdakq1',
      tags: ["tests"]
    }, (error, result) => {
      this.setState({gallery: this.state.gallery.concat(result)})
    })
  }
  
  render() {
    return (
      <div className="main">
        <h1>Galleria</h1>
        <div className="gallery">
          <CloudinaryContext cloudName="nanoo">
            {
              this.state.gallery.map(data => {
                return (
                  <div className="responsive" key={data.public_id}>
                    <div className="img">
                      <a target="_blank" href={`http://res.cloudinary.com/nanoo/image/upload/${data.public_id}.jpg`}>
                        <Image publicId={data.public_id}>
                            <Transformation
                                crop="scale"
                                width="300"
                                height="200"
                                dpr="auto"
                                responsive_placeholder="blank"
                            />
                        </Image>
                      </a>
                      <div className="desc">Created at {data.created_at}</div>
                    </div>
                  </div>
                )
              })
            }
        </CloudinaryContext>
        <div className="clearfix"></div>
      </div>
      <div className="upload">
        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
            Add Image
        </button>
      </div>
    </div>
    )
  }
}

render(<Main />, document.getElementById("app"))

