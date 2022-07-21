function makeCases(info) {
    const cases = []
    function dfs(arr, i, now) {
        if (i + 2 === arr.length) return cases.push(now)
        dfs(arr, i+1, now + '-')
        dfs(arr, i+1, now + arr[i+1])
    }
    dfs(info, 0, '-')
    dfs(info, 0, info[0])
    return cases
}

function bisect(arr, target) {
    let [left, right] = [0, arr.length - 1]
    let mid = 0
    while (left <= right) {
        mid = Math.floor((left+right) / 2)
        if (arr[mid] >= target) {
            // 원래대로면 여기에 right = mid + 1 와야하는데
            // 정렬을 역으로 해서 반대로 오는 게 맞음
            left = mid + 1
        } else {
            right = mid - 1;
        }
        if (target === 150) console.log(target, arr, left, arr[left])
    }
    if (arr[left] >= target) return left+1
    return left
}

function solution(info, query) {
    // 선택해야할 거 -  개발언어 / 지원직군 / 경력구분 / 소울푸드
    // 조건 = 선택해야할거 각각 + 점수
    const answer = []

    const db = new Map()
    // info의 조합에서 만들 수 있는 모든 경우를 미리 만듦
    // 이걸 모두 만드는게 query 하나마다 info 하나하나 탐색하는 것보다 훨씬 빠름
    // - info 하나에서 나오는 조합은 2^4 = 16개고
    // - 배열은 50,000개 이하라서 16 * 50,000
    // = 그런데 쿼리 하나당 info 전부 탐색한다면 => 100,000 * 50,000
    info.map(x => x.split(' ')).forEach(i => {
        makeCases(i).forEach(c => {
            if (!db.has(c)) db.set(c, [])
            db.get(c).push(Number(i[4]))
        })
    })

    // 이진탐색 하기위해 정렬
    // 개수 편하게 세려고 역순으로 정렬함
    for (const [key,val] of db.entries()) {
        db.set(key, val.sort((a,b) => b-a))
    }

    query.forEach(q => {
        const parsed = q.split(' ').filter(x => x !== 'and');
        const point = Number(parsed[4])
        const qq = parsed.slice(0,4).join('')
        // 효율성때문에 이진탐색 해야함
        answer.push(bisect(db.get(qq) || [], point))
    })

    return answer;
}

