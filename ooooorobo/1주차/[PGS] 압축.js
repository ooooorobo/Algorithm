/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/17684?language=javascript#
 *
 * @param msg
 * @returns {*[]}
 */
function solution(msg) {
    /**
     * 사전 - <단어, 인덱스> 구조로 표현하기 위해 Map 자료구조 사용함
     * 단어를 가지고 그 단어의 인덱스를 찾아야 하기 때문에 배열보다는 Map이 적절
     * 이후 A~Z까지 기본 단어로 사전을 초기화
      */
    const dic = new Map() // <string, number> , string => 문자열 / number => 인덱스
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        dic.set(String.fromCharCode(i), i - 'A'.charCodeAt(0) + 1);
    }

    const answer = []
    // 어차피 while문 안에서 i를 증가시킬 거라서 증가치 안씀
    for (let i = 0; i < msg.length;) {
        // 한글자부터 탐색 시작
        let w = msg[i]
        // 사전에 w가 있으면, 한글자 더 늘려서 찾아본다
        // 여기서 조건에 i + 1 < msg.length를 안 한 이유는 무한루프 때문임 증가치 안썼기 때문에 무한루프남
        while (dic.has(w) && i < msg.length) {
            // i + 1 < msg.length 확인을 안했기 때문에 msg[++i]가 존재하는지 확인해야 함
            if (msg[++i]) {
                w = w + msg[i]
            }
        }
        // while문을 벗어나는 경우는
        // 1. w에 해당하는 문자열이 사전에 없다 => answer push 후 사전에 세팅
        // 2. w가 msg의 마지막 한 글자다 => w.slice(0, 1)
        // 3. w가 msg의 마지막 n글자 단어이고, 사전에 등록되어 있다 (예: msg = apple 에서, w === 'ple'인 경우) => dic.get(w)
        answer.push(dic.get(w) || dic.get(w.slice(0,w.length - 1 || 1)))
        // 만약에 사전도 정확해야하면 위의 3번 경우 고려해서 빼줘야 함. if문의 and 조건에 !dic.has(w) 추가해야 함
        if (w.length > 1) {
            dic.set(w, dic.size + 1)
        }
    }

    return answer;
}