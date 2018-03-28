function save(data, obj) {
  const string = JSON.stringify(data);
  try {
    localStorage.setItem(obj, string);
    return true;
  } catch (e) {
    return false;
    /* if (e === QUOTA_EXCEEDED_ERR) {
      alert("Превышен лимит");
    } */
  }
}

function load(obj) {
  const string = localStorage.getItem(obj);
  const data = JSON.parse(string);

  const returnObj = obj === "alboms" ? [] : {};

  return data || returnObj;
}

function createAlbom(event) {
  const form = event.target;
  const name = form.elements.albomName.value;
  if (name === "") return;
  const albom = {
    id: Date.now(),
    name: name,
    items: []
  };

  const storage = load("alboms");
  storage ? save([...storage, albom], "alboms") : save([albom], "alboms");
  form.elements.albomName.value = "";
}

function renameAlbom(event, id) {
  return new Promise((resolve, reject) => {
    const newName = event.target.elements.newName.value;
    const storage = load("alboms");
    const index = storage.findIndex(albom => {
      return albom.id === id;
    });
    storage[index].name = newName;
    save(storage, "alboms");
    resolve(storage[index]);
  });
}

function removeAlbom(id) {
  const storage = load("alboms");
  const newStorage = storage.filter(albom => {
    return albom.id !== Number(id);
  });
  return save(newStorage, "alboms") ? true : false;
}

function removeImg(idImg, idAlbom) {
  return new Promise((resolve, reject) => {
    const storage = load("alboms");
    const newStorage = storage.map(albom => {
      const index = albom.items.findIndex(id => id === idImg);

      if (albom.id === idAlbom) {
        const newImages = [
          ...albom.items.slice(0, index),
          ...albom.items.slice(index + 1)
        ];
        albom.items = newImages;
      }

      return albom;
    });
    resolve(save(newStorage, "alboms"));
  });
}

export { save, load, createAlbom, renameAlbom, removeAlbom, removeImg };
