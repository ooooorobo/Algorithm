/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/72416
 *
 * 시간: 53분 + ..
 * @param sales
 * @param links
 * @returns {any}
 */
function solution(sales, links) {
    // *구조도 설명*
    // <직원번호, 하루평균 매출액>
    // 1번은 CEO 고정
    // 다른 번호들은 다른 누구에게서 화살표를 하나 받음
    // 화살표 주는사람: 팀장, 받는사람: 팀원
    // 한 직원은 최대 2개 팀에 소속됨 (이 경우 반드시 한 팀에서 팀장, 한 팀에서 팀원)

    // *answer 구하는법*
    // 모든 팀의 최소 1명 이상
    // 참석한 직원의 하루평균 매출액의 합이 최소 ==> 완탐? 그리디?
    // answer => 최소가 되는 참석한 직원의 하루평균 매출액 합

    // 가능한 전략???
    // 일단 두 개의 팀이 있을 때 두 팀에 동시에 속하는 직원은 반드시 있다
    // 1. 그 직원이 참석한다
    // 2. 각 팀에서 하루평균매출액이 최소인 사람들을 뽑는다
    // -> 근데 팀이 여러개가 된다면!!!!!!

    // AC 5 - 19
    // AB 7 - 13
    // CD 10 - 17
    // 합: 49

    // AB 1,7 - 27
    // AC 10 - 17
    // 합: 44

    // 알아야 하는거
    // - 각 팀에 누가 속했는가?
    // - 팀 간에 겹치는 사람이 누구인가?
    // - 어느어느 팀이 겹치는가?

    const teams = new Map(); // <number, number[]>
    const leaders = []; // <number, number>
    links.forEach(([leader, member]) => {
        const m = {i: member, sale: sales[member-1]}
        if (teams.has(leader)) {
            teams.get(leader).push(m)
            teams.get(leader).sort((a,b) => a.sale - b.sale)
        } else {
            const l = {i: leader, sale: sales[leader-1]}
            teams.set(leader, [l, m].sort((a,b) => a.sale - b.sale))
            leaders.push(leader);
        }
    })

    // 조합해보자
    // 조합으로 a,b 팀을 고르고,
    // - a,b팀에 겹치는 사람이 있는지 확인
    // - a,b 각 팀에 이미 선출된 사람이 있는지 확인
    //   - A 팀만 이미 선출된 사람이 있다면
    //       - 그 사람이 겹치는 사람이면 continue;
    //       - 그 사람이 겹치는 사람이 아니면 B 팀에서 최소매출 선출
    // - 두 팀 다 선출된 사람 없으면 min(겹치는사람 매출, 각팀 최소매출 합)

    // 1. 최소 매출인 사람만 다 골라 놓는다
    // 2. 각 팀마다 돌면서 최소 매출인 사람 고르는 것보다 겹치는 사람 고르는게 이득이면 겹치는 사람으로 바꾼다

    const selected = new Map(); // <leader: number, selected: number>
    leaders.forEach(leader => {
        selected.set(leader, teams.get(leader)[0])
    })

    for (let i = 0; i < leaders.length; i++) {
        for (let j = i+1; j < leaders.length; j++) {
            let dupl = undefined
            const a = teams.get(leaders[i]).find(x => x.i === leaders[j])
            const b = teams.get(leaders[j]).find(x => x.i === leaders[i])
            if (a) {
                dupl = a;
            } else {
                dupl = b;
            }
            if (dupl) {
                if (selected.get(leaders[i]).sale + selected.get(leaders[j].sale) >= a.sale) {
                    selected.set(leaders[i], dupl)
                    selected.set(leaders[j], dupl)
                }
            }
        }
        // 여기까지 53분
    }

    return Array.from(selected.values()).reduce((a,b)=>a+b, 0);
}