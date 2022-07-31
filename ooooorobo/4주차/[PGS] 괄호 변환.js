function solution(p) {
    // (,) 개수가 같으면 균형잡힌 괄호 문자열 ))((
    // (,) 짝이 맞으면 올바른 괄호 문자열  (())
    return action(p);
}

function action(p) {
    if (p === '') return ''
    let done = ''
    let cnt = 0
    let i = 0
    let balanced = true
    for (const idx in p) {
        cnt += p[idx] === '(' ? 1 : -1
        if (cnt === 0) {
            i = Number(idx)
            break
        } else if (cnt < 0) {
            balanced = false
        }
    }
    const [u,v] = [p.slice(0,i+1), p.slice(i+1,p.length)]
    if (!balanced) {
        return '(' + action(v) + ')' + Array.from(u).slice(1,u.length - 1).map(x => x === '(' ? ')' : '(').join('')
    } else return u + action(v)
}