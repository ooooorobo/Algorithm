// 시간초과로 83.9점이지만 여기에서 만족하겠습니다
function solution(play_time, adv_time, logs) {
    // 가장 많이 보는 구간을 찾아야 함
    // 어떤 구간을 정했을 때 누적 재생시간이 가장 많이 나오는 곳

    // 시간을 초 단위로 계산해서 시작시간 빠른순으로 소팅
    const arr = logs
        .map(x => x.split('-').map(y => y.split(':').reduce((sum,z,i) => sum+Number(z) * 60**(2-i),0)))
        .sort((a,b)=>a[0]-b[0])

    const pt = play_time.split(':').reduce((sum,z,i) => sum+Number(z) * 60**(2-i),0)
    const advt = adv_time.split(':').reduce((sum,z,i) => sum+Number(z) * 60**(2-i),0)
    const times = Array.from({length: pt}, () => 0)

    // play_time을 초로 환산한 만큼의 길이의 배열에 하나하나 넣어주기
    arr.forEach(([a,b]) => {
        for (let i = a; i < b; i++) {
            times[i] += 1
        }
    })

    let sum = times.slice(0,advt).reduce((a,b) => a+b)
    let max = sum;

    let ans = 0;
    // 배열을 하나하나 돌면서 최대가 되는 구간 찾기
    for (let i = 1; i < pt-advt+1; i++) {
        sum = sum - times[i-1] + times[i + advt - 1]
        if (sum > max) {
            max = sum
            ans = i
        }
    }

    return [Math.floor(ans / 3600), Math.floor((ans % 3600) / 60), ans % 60].map(x=>(x < 10) ? '0' + x : x).join(':');
}