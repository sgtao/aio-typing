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
    return {loadResource}
})();