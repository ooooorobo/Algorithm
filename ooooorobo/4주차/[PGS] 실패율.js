function solution(N, stages) {
    // 실패율 = 클리어 못한 플레이어 / 도달한 플레이어
    const arr = Array.from({length: N + 2}, () => 0);
    stages.forEach(s => arr[s] += 1);
    const c = Array.from({length: N + 2}, () => 0);
    for (let i = N + 1; i > -1; i--) {
        c[i] = arr[i] + (i < N+1 ? c[i+1] : 0)
    }

    return arr.map((a, i) =>( {rate: a / c[i] || 0, stage: i}))
        .slice(1, N+1)
        .sort((a,b) => (b.rate - a.rate))
        .map(a => a.stage)
}