import React from 'react';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';

//filepond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImageResize);

const FileUpload = ({ fileList, setFileList }) => {
  return (
    <div>
      <div>
        <FilePond
          allowMultiple={true}
          files={fileList}
          maxFiles={5}
          imageResizeTargetWidth={200}
          allowReorder={true}
          name='productImages'
          onupdatefiles={(fileItems) => {
            setFileList(fileItems.map((fileItem) => fileItem.file));
          }}
        />
      </div>
    </div>
  );
};

export default FileUpload;
