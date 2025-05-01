const firsts = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const middles = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const lasts = ["", "ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ", "ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function composeKorean(first, middle, last = '') {
    const firstIdx = firsts.indexOf(first);
    const middleIdx = middles.indexOf(middle);
    const lastIdx = lasts.indexOf(last);
    if (firstIdx === -1 || middleIdx === -1 || lastIdx === -1) throw new Error("자음모음 잘못됨(자음: " + first + ", 모음:" + middle + ")");
    return String.fromCharCode(0xAC00 + (firstIdx * 21 * 28) + (middleIdx * 28) + lastIdx);
}

function decomposeKorean(char) {
    let code = char.charCodeAt(0);

    if (code < 0xAC00 || code > 0xD7A3) throw new Error("한글문자 아님: " + char);

    code -= 0xAC00;
    const firstIdx = Math.floor(code / (21 * 28));
    const middleIdx = Math.floor((code % (21 * 28)) / 28);
    const lastIdx = code % 28;
    return { first: firsts[firstIdx], middle: middles[middleIdx], last: lasts[lastIdx] };
}