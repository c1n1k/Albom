const makeThumb = files => {
  const list = [];
  for (const file of files) {
    if (file.type.match(/image.*/)) {
      list.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = event => {
            resolve({
              id: file.name,
              file: file,
              thumbUrl: event.target.result
            });
          };
          reader.readAsDataURL(file);
        })
      );
    }
  }
  return Promise.all(list);
};

const submitImages = (files, clientId) => {
  const arr = files.map(file => {
    // const clientId = process.env.REACT_APP_IMGUR_CLIENT_ID;
    const df = new FormData();
    df.append("image", file.file);
    const init = {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`
      },
      body: df
    };
    return fetch("https://api.imgur.com/3/image", init)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        //alert('Upload failed: ' + error);
      });
  });

  return Promise.all(arr);
};

export { makeThumb, submitImages };
