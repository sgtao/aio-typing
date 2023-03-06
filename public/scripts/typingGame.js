// typingGame.js
'use strict';
{
    const targetWords = ["red", "pink", "blue", "yellow", "green"];
    const translate  = document.querySelector("#translate");
    const targetElem  = document.querySelector("#target");
    const result = document.querySelector("#result");
    const audioPanel = document.querySelector("#audio-panel");
    let sectionContents = [];
    let contents_index = [];
    let word;
    let wordUpper;
    let wordLower;
    let loc = 0; // target location
    //
    // setTargetWords : assetsから読み込んだオブジェクトをtargetWordsにセット
    async function setContents() {
        console.dir("start setContents");
        let allInOne = await resourceAllinOne.loadResource("assets-sample.json");
        console.log('at setContents ', allInOne);
        console.log(typeof(allInOne));
        let ctx = [];
        contents_index = [];
        let _index = 0;
        allInOne.forEach(item => {
            console.log(item);
            ctx.push({
                "index": item.index,
                "word": item.englishText,
                "translate": item.translation.slashed
            });
            contents_index.push(_index++);
        });
        console.log(ctx);
        console.log(contents_index);
        return {ctx};
    }
    // 音声ファイルパスのDOM追加：
    async function appendAudioElements(ctx) {
        console.dir("start appendAudioElements");
        // audioPanel配下のDOM削除
        let previousDoms = audioPanel.querySelectorAll("audio");
        previousDoms.forEach((el) => (el.remove()));
        //
        await ctx.forEach(async (content)=>{
            const _indexName = content.index;
            const _audioName = `${_indexName.slice(1,_indexName.length - 1)}.mp3`;
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
    // setWord：次の単語をセットする
    async function setWord(targetElem, audioPanel) {
        console.dir("start setWord");
        console.dir(typeof(sectionContents.ctx));
        // word = words[Math.floor(Math.random() * words.length)];
        let _index = contents_index.splice(Math.floor(Math.random() * contents_index.length), 1)[0];
        console.log(contents_index);
        let _context = sectionContents.ctx.at(_index);
        console.log(_context);
        translate.textContent = _context.translate;
        word = _context.word;
        wordUpper = word.toUpperCase();
        wordLower = word.toLowerCase();
        // console.log(words);
        targetElem.textContent = word;
        loc = 0;
        //
        // start audio
        playAudioFile(audioPanel, _context.index)
    }
    function playAudioFile(audioPanel, indexName) {
        console.log(audioPanel)
        // const audioPanelElem = document.getElementById(audioPanel.id);
        const audioAction = document.getElementById(indexName);
        audioAction.play();
    }
    //
    // ゲーム開始：
    let isPlaying = false;
    let startTime;
    targetElem.textContent = "Click/Enter to Start!";
    async function startGame() {
        //
        // words = targetWords.concat(); // 複製して初期化
        sectionContents = await setContents();
        // check AudioFiles and append audio DOMs
        let _audioPanel = await appendAudioElements(sectionContents.ctx);
        //
        // audio要素の設置後にテキストを表示したいため、遅延実行：
        setTimeout(() => {
            setWord(targetElem, _audioPanel);
        }, 500);
        result.textContent = "";
        isPlaying = true;
        startTime = Date.now();
    }
    document.addEventListener('click', () => {
        if (isPlaying) return; // ゲーム中はクリックを無視する
        startGame();
    });
    function findTypingChar() {
        if (loc >=  word.length - 1) return;
        const regex = /[0-9A-Za-z]/g;
        console.log(loc, word[loc]);
        console.log(word[loc].match(regex));
        while(word[loc].match(regex) === null && loc < word.length - 1) {
            loc = (loc < word.length - 1) ? loc + 1 : loc;
        }
    }
    document.addEventListener('keydown', e => {
        // console.log(e.key);
        if ( ! isPlaying ) { // ゲームの開始処理を追加
            if (e.key === "Enter")
                startGame();
            return;
        }
        findTypingChar();
        if (e.key !== wordUpper[loc] && e.key !== wordLower[loc] && loc < word.length - 1) {
            return;
        } else {
            loc = (loc <  word.length - 1) ? loc + 1 : loc;
            findTypingChar();
            targetElem.textContent = "_".repeat(loc) + word.substring(loc);
        }
        if (loc >=  word.length || (loc == word.length - 1 && word[loc] === "”")) {
            if (contents_index.length === 0) { // 終了条件
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                result.textContent = `Finished! ${elapsedTime} seconds!`;
                isPlaying = false;
            } else {
                setWord(targetElem);
            }
        }
    });
}