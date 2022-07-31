const questionMark = Array.from({length: 10_000}, () => '?')
function getAllCases(word) {
    const result = new Set()
    for (let i = 0; i < word.length; i++) {
        result.add(questionMark.slice(0, i).join('') + word.slice(i, word.length))
        result.add(word.slice(0, i) + questionMark.slice(i, word.length).join(''))
    }
    return Array.from(result.keys())
}
function solution(words, queries) {
    const map = new Map();
    words.forEach(w => {
        getAllCases(w).forEach(c => map.set(c, (map.get(c) || 0) + 1))
    })
    return queries.map(q => map.get(q) || 0)
}