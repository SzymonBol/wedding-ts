const fs = require('fs');

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
      const name = `${dir}/${file}`
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files)
      } else {
        files.push(name)
      }
    }
    return files
  }

  function renameFiles(){
    const galleryDir='../src/assets/gallery';
    const files = getFiles(galleryDir);
    for(let i=0 ; i< files.length; i++){
        fs.rename(files[i], `${galleryDir}/gallery-img-${i}.jpg`, (err) => {
            if (err) throw err;
            console.log('Rename complete!');
          });
      }
  }

renameFiles();