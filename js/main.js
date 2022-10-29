"use strict";

// メッセージ表示
var msg;

// スロット
var carr; // 各スロットの動作状態、インクリメント、出目の結果を保持
var nowStatus; // スロットの動作状態を保持
var count = 0; // 場面の進行用カウンター


// リール
const Symbols0 = ["☀", "♥", "★", "♥", "🌙", "💧", "♥", "★", "💧", "♥", "🌙", "💧", "♥", "💧", "🌙", "♥"];
const Symbols1 = ["☀", "🌙", "♥", "★", "💧", "♥", "💧", "★", "♥", "☀", "♥", "🌙", "♥", "💧", "🌙", "♥"];
const Symbols2 = ["☀", "♥", "🌙", "★", "♥", "💧", "🌙", "♥", "💧", "★", "♥", "🌙", "💧", "♥", "💧", "♥"];

// 各スロットのスピード調整
setInterval(slot1, 400);
setInterval(slot2, 350);
setInterval(slot3, 300);


// 初期化
window.addEventListener("load", function () {
    carr = [
        { f: false, v: 0, obj: null, result: "" },
        { f: false, v: 0, obj: null, result: "" },
        { f: false, v: 0, obj: null, result: "" }
    ];
    carr[0].obj = document.getElementById("c0");
    carr[1].obj = document.getElementById("c1");
    carr[2].obj = document.getElementById("c2");
    nowStatus = false;

    // 初期メッセージの表示
    msg = document.getElementById("message");
    msg.innerText = "＊「では はじめましょう!";
});



// ボタンをクリックするたびにcountで場面を進める
function nextScene() {
    switch (count) {
        case 0:
            // スロットを回す
            start();
            msg.innerText = "";
            document.getElementById("btn").innerText = "ストップ";
            break;

        case 1:
            // リール1を止める
            stop(count);
            break;

        case 2:
            // リール2を止める
            stop(count);
            break;

        case 3:
            // リール3を止める
            stop(count);

            // 判定
            if (carr[0].result == carr[1].result && carr[1].result == carr[2].result) {
                msg.innerText = "*「おめでとうございます。あたりです!";
            } else {
                msg.innerText = "＊「ざんねん。もういちど挑戦しますか？」";
            }
            document.getElementById("btn").innerText = "スタート";
            break;
    }

    // カウントが4までいったら初期化
    if (count != 4) {
        count += 1;
    } else {
        count = 0;
        nextScene();
    }
}


function start() {
    if (nowStatus) { return; }
    else { nowStatus = true; carr[0].f = true; carr[1].f = true; carr[2].f = true; }
}

function slot1() {
    if (carr[0].f) {
        for (let i = 0; i < 15; i++) {
            carr[0].v++;
            if (carr[0].v > 15) { carr[0].v = 0; }
            carr[0].obj.innerText = Symbols0[carr[0].v];
        }
    }
}

function slot2() {
    if (carr[1].f) {
        for (let i = 0; i < 15; i++) {
            carr[1].v++;
            if (carr[1].v > 15) { carr[1].v = 0; }
            carr[1].obj.innerText = Symbols1[carr[1].v];
        }
    }
}

function slot3() {
    if (carr[2].f) {
        for (let i = 0; i < 15; i++) {
            carr[2].v++;
            if (carr[2].v > 15) { carr[2].v = 0; }
            carr[2].obj.innerText = Symbols2[carr[2].v];
        }
    }
}

function stop(count) {
    if (nowStatus) {
        carr[count - 1].f = false;
        carr[count - 1].result = document.getElementById(`c${count - 1}`).innerText;
        if (count == 3) {
            nowStatus = false;
        }
    }
}
