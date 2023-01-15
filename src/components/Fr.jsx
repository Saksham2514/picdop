import React from 'react'

export default function Fr () {
  return (
    <form action={`${process.env.REACT_APP_BACKEND_URL}test`} enctype="multipart/form-data" method="post">
      <div class="form-group">
        <input type="file" class="form-control-file" name="shopImages"/>
        <input type="submit" value="Upload Image" class="btn btn-default"/>            
      </div>
    </form>
  )
}
