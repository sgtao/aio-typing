// managementGame.js
'use strict';
const managementGame = (() => {
    const instruction = document.querySelector("#instruction");
    const translate  = document.querySelector("#translate");
    const categoryIndex  = document.querySelector("#category-index");
    const targetElem  = document.querySelector("#target");
    const audioPanel = document.querySelector("#audio-panel");
    const result = document.querySelector("#result");
    let sectionContents = [];
    let contents_index = [];
    let word;
    let wordUpper;
    let wordLower;
    let loc = 0; // target location
    let current_index;
    //
    // メニュー画面：
    let isPlaying = false;
    let isNextAvailable = false;
    function gotoMenu() {
        isPlaying = false;
        isNextAvailable = false;
        instruction.textContent = "Click/Enter to Start!";
        categoryIndex.classList.add("hidden");
        translate.classList.add("hidden");
        targetElem.classList.add("hidden");
        audioPanel.classList.add("hidden");
        result.classList.add("hidden");
    }
    // setTargetWords : assetsから読み込んだオブジェクトをtargetWordsにセット
    async function setContents(file) {
        console.dir("start setContents");
        const allInOneCategory = await resourceAllinOne.loadResourceCategory(file);
        const allInOneContents = await resourceAllinOne.loadResourceContents(file);
        console.log('at setContents ', allInOneContents);
        console.log(allInOneContents);
        categoryIndex.querySelector(".category").textContent = allInOneCategory;
        let contents = [];
        contents_index = [];
        let _index = 0;
        allInOneContents.forEach(item => {
            console.log(item);
            contents.push({
                "index": item.index,
                "word": item.englishText,
                "translate": item.translation.slashed
            });
            contents_index.push(_index++);
        });
        console.log(contents);
        console.log(contents_index);
        return {contents};
    }
    // setWord：次の単語をセットする
    let startTime;
    function nextContent(targetElem, current_index="idxNNN") {
        isNextAvailable = false;
        console.dir("start setWord");
        console.dir(typeof(sectionContents.contents));
        // 再生中音声終了
        if (current_index !== "idxNNN")
            audioControl.stopAudioFile(audioPanel, current_index);
        // 終了チェック
        if (contents_index.length === 0) {
            gotoMenu();
            return;
        }
        // 次コンテンツ
        let _index = contents_index.splice(Math.floor(Math.random() * contents_index.length), 1)[0];
        console.log(contents_index);
        let _context = sectionContents.contents.at(_index);
        console.log(_context);
        categoryIndex.querySelector(".index").textContent = _context.index;
        translate.textContent = _context.translate;
        word = _context.word;
        wordUpper = word.toUpperCase();
        wordLower = word.toLowerCase();
        // console.log(words);
        targetElem.textContent = word;
        loc = 0;
        findTypingChar();
        //
        startTime = Date.now();
        result.textContent = "";
        // start audio
        audioControl.playAudioFile(audioPanel, _context.index);
        return _context.index;
    }
    // ゲーム開始：
    async function startGame() {
        //
        // words = targetWords.concat(); // 複製して初期化
        sectionContents = await setContents("assets-sample.json");
        // check AudioFiles and append audio DOMs
        await audioControl.appendAudioElements(sectionContents.contents);
        //
        // audio要素の設置後にテキストを表示したいため、遅延実行：
        setTimeout(() => {
            current_index = nextContent(targetElem);
        }, 50);
        result.textContent = "";
        isPlaying = true;
        instruction.textContent = "Space=音声再生／Enter=次の文へ／Esc.=メニューへ戻る";
        categoryIndex.classList.remove("hidden");
        translate.classList.remove("hidden");
        targetElem.classList.remove("hidden");
        audioPanel.classList.remove("hidden");
        result.classList.remove("hidden");
    }
    document.addEventListener('click', () => {
        if (isPlaying) return; // ゲーム中はクリックを無視する
        startGame();
    });
    function findTypingChar() {
        if (loc >=  word.length - 1) return;
        const regex = /[0-9A-Za-z]/g;
        // console.log(loc, word[loc]);
        // console.log(word[loc].match(regex));
        while(word[loc].match(regex) === null && loc < word.length - 1) {
            loc = (loc < word.length - 1) ? loc + 1 : loc;
        }
    }
    function _showFinishContent() {
        isNextAvailable = true;
        audioControl.stopAudioFile(audioPanel, current_index);
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        result.textContent = `Finished! ${elapsedTime} seconds!`;
    }
    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        if ( ! isPlaying ) { // ゲームの開始処理を追加
            if (e.key === "Enter")
                startGame();
            return;
        }
        if ( isNextAvailable ){
            if (e.key === "Enter") {
                if (contents_index.length === 0) { // 終了条件
                    gotoMenu();
                } else {
                    current_index = nextContent(targetElem, current_index);
                }
            }
            return;
        }
        if (e.key === "Escape"){
            audioControl.stopAllAudioFiles(audioPanel);
            gotoMenu();
            return;
        }
        if (e.key === "Enter"){
            _showFinishContent();
            return;
        }
        if (e.key === " "){
            console.log(`enter SPACE(${e.key})`);
            audioControl.playAudioFile(audioPanel, current_index);
            return;
        }
        if (e.key !== wordUpper[loc] && e.key !== wordLower[loc] && loc < word.length - 1) {
            return;
        } else {
            let _beforeReplaced = (loc === 0) ? "" : word.substring(0, loc);
            let _afterReplaced = (loc === (word.length - 1)) ? "" : word.substring(loc + 1, word.length);
            let _showTargetText = _beforeReplaced + "_" + _afterReplaced;
            word = _showTargetText;
            targetElem.textContent = _showTargetText;
            loc = (loc <  word.length - 1) ? loc + 1 : loc;
            findTypingChar();
        }
        if (loc >=  word.length || (loc == word.length - 1 && word[loc] === "”")) {
            _showFinishContent();
        }
    });
    return { gotoMenu, startGame }
})();