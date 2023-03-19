// audioControl.js
const audioControl = (() => {
    'use strict';
    const audioPanel = document.querySelector("#audio-panel");
    // 音声ファイルパスのDOM追加：
    async function appendAudioElements(contents) {
        console.dir("start appendAudioElements");
        // audioPanel配下のDOM削除
        let previousDoms = audioPanel.querySelectorAll("audio");
        previousDoms.forEach((el) => (el.remove()));
        //
        await contents.forEach(async (content)=>{
            const _indexName = content.index;
            const _audioName = `${_indexName.replace("idx","")}.mp3`;
            const _audioPath = "audio/" + _audioName;
            const _fileExist = await resourceAllinOne.checkFileExist(_audioPath);
            console.log("  result@appendAudioDOMs : " + _fileExist);
            if (_fileExist) {
                const _appendDom = new Audio(_audioPath);
                const _dataKey  = document.createAttribute("data-Key");
                _dataKey.value = _indexName;
                _appendDom.id = _indexName;
                _appendDom.classList.add("hidden");
                _appendDom.controls = true;
                console.log(_appendDom);
                await audioPanel.appendChild(_appendDom);
            }
        });
        previousDoms = await audioPanel.querySelectorAll("audio");
        return audioPanel;
    }
    // 音声ファイル再生・停止：
    let audioAction = "<audio></audio>";
    const audioState = { state : "stop"};
    function playAudioFile(audioPanelElm, indexName) {
        if (audioState.state === "play") return;
        console.log(audioPanelElm)
        console.log(indexName)
        const audioPanelId = audioPanelElm.getAttribute("id");
        console.log(audioPanelId);
        const audioElems = document.getElementById(audioPanelId).querySelectorAll("audio");
        audioElems.forEach((audioElem) => {
            audioElem.classList.add("hidden");
        });
        audioAction = document.getElementById(audioPanelId).querySelector(`#${indexName}`);
        console.log(audioAction);
        audioAction.classList.remove("hidden");
        console.log(audioAction);
        audioState.state = "play";
        audioAction.play();
        audioState.state = "stop";
    }
    function stopAudioFile(audioPanelElm, indexName) {
        console.log("stopAudioFile");
        console.log(audioPanelElm)
        console.log(indexName)
        const audioPanelId = audioPanelElm.getAttribute("id");
        console.log(audioPanelId);
        audioAction = document.getElementById(audioPanelId).querySelector(`#${indexName}`);
        console.log(audioAction);
        audioAction.pause();
        audioState.state = "stop";
    }
    function stopAllAudioFiles(audioPanelElm) {
        console.log(audioState);
        audioAction.pause();
        audioState.state = "stop";
        const audioPanelId = audioPanelElm.getAttribute("id");
        console.log(audioPanelId);
        const audioElems = document.getElementById(audioPanelId).querySelectorAll("audio");
        audioElems.forEach(async (audioElem) => {
            audioElem.pause();
            audioElem.classList.add("hidden");
        });
    }
    return { appendAudioElements, playAudioFile, stopAudioFile, stopAllAudioFiles, audioState }
})();
