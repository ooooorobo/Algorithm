/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/72411?language=javascript
 * 레벨2 / 24분
 *
 * 완전탐색 DFS
 * @param orders
 * @param course
 * @returns {*[]}
 */
function solution(orders, course) {
    // 가장 많이 함께 주문한 단품 (최소 2명 이상)
    // 코스 -> 최소 2가지 이상 단품

    // 문자열 조합 경우의수 전부 만들어야 할 듯
    const orderedMap = new Map(); // Map<string, number>
    function dfs(i, arr, res) {
        if (i === arr.length) {
            return
        }
        dfs(i+1, arr, res)

        const newRes = res + arr[i]
        orderedMap.set(newRes, (orderedMap.get(newRes) || 0) + 1)
        dfs(i+1, arr, newRes)
    }

    // order에 들어오는 문자열이 알파벳 오름차순으로 정렬된게 아님
    orders.forEach(o => dfs(0,Array.from(o).sort().join(''),''))

    const answerMap = new Map(); // Map<number, string[]>
    const answerCountMap = new Map(); // Map<number, number>
    Array.from(orderedMap.entries()).forEach(([key, value]) => {
        const nowMax = answerCountMap.get(key.length);
        if (!nowMax || nowMax < value) {
            answerMap.set(key.length, [key])
            answerCountMap.set(key.length, value)
        }
        if (nowMax === value) {
            answerMap.get(key.length).push(key)
        }
    });


    let answer = []
    course.forEach(c => {
        if (answerCountMap.get(c) > 1)
            answer = answer.concat(answerMap.get(c))
    })
    return answer.sort()
}