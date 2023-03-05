// typingGame.js
'use strict';
{
    const targetWords = ["red", "pink", "blue", "yellow", "green"];
    const target = document.querySelector("#target");
    const result = document.querySelector("#result");
    let words;
    let word;
    let wordUpper;
    let wordLower;
    let loc = 0; // target location
    // setTargetWords : assetsから読み込んだオブジェクトをtargetWordsにセット
    async function setWords() {
        let allInOne = await resourceAllinOne.loadResource("assets-sample.json");
        console.log('at setWords ' + allInOne);
        console.log(typeof(allInOne));
        let _words = [];
        allInOne.forEach(item => {
            console.log(item.englishText);
            _words.push(item.englishText);
        });
        console.log(_words);
        return _words;
    }
    // setWord：次の単語をセットする
    function setWord(target) {
        // word = words[Math.floor(Math.random() * words.length)];
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        wordUpper = word.toUpperCase();
        wordLower = word.toLowerCase();
        // console.log(words);
        target.textContent = word;
        loc = 0;
    }
    //
    // ゲーム開始：
    let isPlaying = false;
    let startTime;
    target.textContent = "Click/Enter to Start!";
    async function startGame() {
        isPlaying = true;
        // words = targetWords.concat(); // 複製して初期化
        words = await setWords();
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
            if (words.length === 0) { // 終了条件
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                result.textContent = `Finished! ${elapsedTime} seconds!`;
                isPlaying = false;
            } else {
                setWord(target);
            }
        }
    });
}