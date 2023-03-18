// managementGame.js
'use strict';
{
    const translate  = document.querySelector("#translate");
    const targetElem  = document.querySelector("#target");
    const result = document.querySelector("#result");
    let audioPanel;
    let sectionContents = [];
    let contents_index = [];
    let word;
    let wordUpper;
    let wordLower;
    let loc = 0; // target location
    let content_index;
    //
    // setTargetWords : assetsから読み込んだオブジェクトをtargetWordsにセット
    async function setContents() {
        console.dir("start setContents");
        let allInOne = await resourceAllinOne.loadResource("assets-sample.json");
        console.log('at setContents ', allInOne);
        console.log(typeof(allInOne));
        let contents = [];
        contents_index = [];
        let _index = 0;
        allInOne.forEach(item => {
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
    function setWord(targetElem) {
        console.dir("start setWord");
        console.dir(typeof(sectionContents.contents));
        // word = words[Math.floor(Math.random() * words.length)];
        let _index = contents_index.splice(Math.floor(Math.random() * contents_index.length), 1)[0];
        console.log(contents_index);
        let _context = sectionContents.contents.at(_index);
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
        audioControl.playAudioFile(audioPanel, _context.index);
        return _context.index;
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
        audioPanel = await audioControl.appendAudioElements(sectionContents.contents);
        //
        // audio要素の設置後にテキストを表示したいため、遅延実行：
        setTimeout(() => {
            content_index = setWord(targetElem);
        }, 500);
        result.textContent = "";
        isPlaying = true;
        translate.classList.remove("hidden");
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
        console.log(e.key);
        if ( ! isPlaying ) { // ゲームの開始処理を追加
            if (e.key === "Enter")
                startGame();
            return;
        }
        if (e.key === " "){
            console.log(`enter SPACE(${e.key})`);
            audioControl.playAudioFile(audioPanel, content_index);
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
                translate.classList.add("hidden");
            } else {
                content_index = setWord(targetElem);
            }
        }
    });
}