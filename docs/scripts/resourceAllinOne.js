// resourceAllinOne.js
const resourceAllinOne = (() => {
    'use strict';
    let loadedJSON;
    const loadResource = async (file) => {
        await fetch(file)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                loadedJSON = data.contents.copyWithin();
                console.log(loadedJSON);
                console.log(typeof(loadedJSON));
            });
        return loadedJSON;
    }
    const checkFileExist = async (filePath) => {
        let _existFilePath = false;
        console.log(`check file Exist : ${filePath}`);
        await fetch(filePath)
            .then ((response) => {
                console.dir(response);
                if (response !== undefined) _existFilePath = true;
            })
            .catch((e) => {
                _existFilePath = false;
            });
        console.log("  result : " + _existFilePath);
        return _existFilePath;
    }
    return {loadResource, checkFileExist}
})();