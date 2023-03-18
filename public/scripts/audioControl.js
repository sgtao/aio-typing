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
            const _audioPath = "assets/audioContents/" + _audioName;
            const _fileExist = await resourceAllinOne.checkFileExist(_audioPath);
            console.log("  result@appendAudioDOMs : " + _fileExist);
            if (_fileExist) {
                const _appendDom = document.createElement("audio");
                const _dataKey  = document.createAttribute("data-Key");
                _dataKey.value = _indexName;
                _appendDom.id = _indexName;
                _appendDom.src = _audioPath;
                console.log(_appendDom);
                await audioPanel.appendChild(_appendDom);
            }
        });
        previousDoms = await audioPanel.querySelectorAll("audio");
        return audioPanel;
    }
    // 音声ファイル再生・停止：
    let audioState = "stop";
    function playAudioFile(audioPanelElm, indexName) {
        if (audioState === "play") return;
        console.log(audioPanelElm)
        console.log(indexName)
        // const audioPanelElem = document.getElementById(audioPanel.id);
        const audioPanelId = audioPanelElm.getAttribute("id");
        console.log(audioPanelId);
        const audioAction = document.getElementById(audioPanelId).querySelector(`#${indexName}`);
        console.log(audioAction);
        audioState = "play";
        audioAction.play();
        audioState = "stop";
    }
    return { appendAudioElements, playAudioFile }
})();
