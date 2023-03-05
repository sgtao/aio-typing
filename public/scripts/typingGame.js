// typingGame.js
'use strict';
{
    const targetWords = ["red", "pink", "blue", "yellow", "green"];
    const target = document.querySelector("#target");
    const result = document.querySelector("#result");
    let sectionContents = [];
    let contents_index = [];
    let word;
    let wordUpper;
    let wordLower;
    let loc = 0; // target location
    // setTargetWords : assetsから読み込んだオブジェクトをtargetWordsにセット
    async function setContents() {
        let allInOne = await resourceAllinOne.loadResource("assets-sample.json");
        console.log('at setWords ' + allInOne);
        console.log(typeof(allInOne));
        let ctx = [];
        contents_index = [];
        let _index = 0;
        allInOne.forEach(item => {
            console.log(item);
            ctx.push({ "index": item.index, "word": item.englishText});
            contents_index.push(_index++);
        });
        console.log(ctx);
        console.log(contents_index);
        return {ctx};
    }
    // setWord：次の単語をセットする
    function setWord(target) {
        console.dir(sectionContents.ctx);
        console.dir(typeof(sectionContents.ctx));
        // word = words[Math.floor(Math.random() * words.length)];
        let _index = contents_index.splice(Math.floor(Math.random() * contents_index.length), 1)[0];
        console.log(contents_index);
        let _context = sectionContents.ctx.at(_index);
        console.log(_context);
        word = _context.word;
        wordUpper = word.toUpperCase();
        wordLower = word.toLowerCase();
        // console.log(words);
        target.textContent = word;
        loc = 0;
        //
        // start audio
        let audioAction = document.querySelector(`audio[data-key="${_context.index}"]`);
        audioAction.play();
    }
    //
    // ゲーム開始：
    let isPlaying = false;
    let startTime;
    target.textContent = "Click/Enter to Start!";
    async function startGame() {
        isPlaying = true;
        // words = targetWords.concat(); // 複製して初期化
        sectionContents = await setContents();
        setWord(target);
        result.textContent = "";
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
            target.textContent = "_".repeat(loc) + word.substring(loc);
        }
        if (loc >=  word.length || (loc == word.length - 1 && word[loc] === "”")) {
            if (contents_index.length === 0) { // 終了条件
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                result.textContent = `Finished! ${elapsedTime} seconds!`;
                isPlaying = false;
            } else {
                setWord(target);
            }
        }
    });
}