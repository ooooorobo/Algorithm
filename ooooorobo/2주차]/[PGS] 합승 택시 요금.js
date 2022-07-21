
function solution(n, s, a, b, fares) {
    // s => x + x => a + x => b 계산해야함
    const graph = Array.from({length: n }, () => Array.from({length: n}, () => Infinity))
    for ([start, end, weight] of fares) {
        graph[start-1][end-1] = weight
        graph[end-1][start-1] = weight
    }

    // 플로이드 워셜
    // 노드 간의 최소거리 구해두기
    for (let k = 0; k < n; k++) {
        for (let j = 0; j < n; j++) {
            for (let i = 0; i < n; i++) {
                if (graph[i][k] === Infinity || graph[j][k] === Infinity) continue;
                if (graph[i][k] + graph[k][j] < graph[i][j])
                    graph[i][j] = graph[i][k] + graph[k][j]
            }
        }
    }

    // 아래 케이스 중에 최소가 되는 것을 찾아야 함
    // s => a => b
    // s => b => a
    // s => a + s => b
    // s => i => a,b
    let min = Infinity
    for (let i = 0; i < n; i++) {
        const temp = graph[s-1][i] + graph[i][a-1] + graph[i][b-1]
        if (min > temp) min = temp
    }

    return Math.min(graph[s-1][a-1] + graph[a-1][b-1],
        graph[s-1][b-1] + graph[b-1][a-1],
        graph[s-1][a-1] + graph[s-1][b-1],
        min);
}