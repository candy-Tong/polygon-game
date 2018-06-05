function bestWay({m, op, lines_id}) {
    // m = [
    //     undefined,
    //     [undefined, {min: 1, max: 1, minS: 0, maxS: 0}],
    //     [undefined, {min: 6, max: 6, minS: 0, maxS: 0}],
    //     [undefined, {min: 2, max: 2, minS: 0, maxS: 0}],
    //     [undefined, {min: 8, max: 8, minS: 0, maxS: 0}],
    // ]
    // op = [undefined,'+', '+',  '*','+']
    let n = op.length - 1
    let maxf, minf

    function ployMax() {
        for (let j = 2; j <= n; j++) {
            for (let i = 1; i <= n; i++) {
                for (let s = 1; s < j; s++) {
                    minMax(i, s, j)
                    if (!m[i][j]) {
                        m[i][j] = {
                            min: minf,
                            max: maxf,
                            minS: s,
                            maxS: s
                        }
                    } else {
                        if (minf < m[i][j].min) {
                            m[i][j].min = minf
                            m[i][j].minS = s
                        }
                        if (maxf > m[i][j].max) {
                            m[i][j].max = maxf
                            m[i][j].maxS = s
                        }
                    }
                }
            }
        }
        let list = []
        for (let i = 1; i <= n; i++) {
            list.push(m[i][n].max)
            console.log(m[i][n])
        }
        let max = Math.max(...list)
        let maxIndex = m.slice(1).findIndex((value) => value[n].max === max) + 1
        return {max, maxIndex}
    }

    function minMax(i, s, j) {
        let r = (i + s - 1) % n + 1
        let a = m[i][s].min, b = m[i][s].max
        let c = m[r][j - s].min, d = m[r][j - s].max
        if (op[r] === '+') {
            minf = a + c
            maxf = b + d
        } else {
            minf = Math.min(a * c, a * d, b * c, b * d)
            maxf = Math.max(a * c, a * d, b * c, b * d)
        }
    }

    // console.log(ployMax())
    let {max, maxIndex} = ployMax()

    for (let i = 1; i <= n; i++) {
        let list = []
        for (let j = 1; j <= n; j++) {
            list.push(m[i][j].maxS)
        }
        // console.log(list)
    }

    let opList = []

    function findOp(i, j) {
        if (j >= 2) {
            let r = (i + m[i][j].maxS - 1) % n + 1
            opList.push(r)
            if (j > 2) {
                findOp(i, m[i][j].maxS)
                findOp(r, j - m[i][j].maxS)
            }
        }
    }
    console.log(maxIndex)
    findOp(maxIndex, n)

    opList = opList.reverse()
    opList.unshift(maxIndex)
    console.log(opList)
    let result = []
    opList.forEach((value, index) => {
        result.push(lines_id[value])
    })
    return result
}

function pointChange(points, lines) {
    let m = [
        undefined
    ]
    let lines_id = [undefined]
    let op = [undefined]

    let begin = {x: lines[0].points[0].x, y: lines[0].points[0].y}


    let nextLine = lines.shift()
    op.push(nextLine.operation)
    lines_id.push(nextLine.id)

    while (nextLine) {
        let nextPointIndex = points.findIndex((point) => {
            return (point.x == nextLine.points[1].x && nextLine.points[1].y == nextLine.points[1].y) ||
                point.x == nextLine.points[0].x && nextLine.points[1].y == nextLine.points[0].y
        })
        if (nextPointIndex !== -1) {
            let nextPoint = points[nextPointIndex]
            points.splice(nextPointIndex, 1)
            let list = [undefined]
            let obj = {min: nextPoint.r, max: nextPoint.r, minS: 0, maxS: 0}
            list.push(obj)
            m.push(list)

            let nextLineIndex = lines.findIndex((line) => {
                return (line.points[0].x == nextPoint.x && line.points[0].y == nextPoint.y) ||
                    (line.points[1].x == nextPoint.x && line.points[1].y == nextPoint.y)
            })
            nextLine = lines[nextLineIndex]
            lines.splice(nextLineIndex, 1)
            if(nextLine){
                op.push(nextLine.operation)
                lines_id.push(nextLine.id)
            }

        } else {
            if ((nextLine.points[0].x == begin.x && nextLine.points[0].y==begin.y) || (nextLine.points[1].x == begin.x && nextLine.points[1].y==begin.y)) {
                let list = [undefined]
                let obj = {min: points[0].r, max: points[0].r, minS: 0, maxS: 0}
                list.push(obj)
                m.push(list)
                break
            }
        }

    }

    console.log(m)
    console.log(op)
    console.log(lines_id)

    return {m, op, lines_id}
}


let data = {
    'points': [
        {'x': 365, 'y': 149, 'r': 1, 'id': 0},
        {'x': 246, 'y': 204, 'r': 6, 'id': 1},
        {'x': 391, 'y': 284, 'r': 2, 'id': 2},
        {'x': 562, 'y': 162, 'r': 8, 'id': 3}
    ],
    'lines': [
        {
            'points': [
                {'x': 365, 'y': 149},
                {'x': 246, 'y': 204}
            ],
            'operation': '+',
            'id': 0
        },
        {
            'points': [
                {'x': 246, 'y': 204},
                {'x': 391, 'y': 284}
            ],
            'operation': '+',
            'id': 1
        },
        {
            'points': [
                {'x': 391, 'y': 284},
                {'x': 562, 'y': 162}
            ],
            'operation': '*',
            'id': 2
        },
        {
            'points': [
                {'x': 365, 'y': 149},
                {'x': 562, 'y': 162}
            ],
            'operation': '+',
            'id': 3
        }
    ]
}


// let {op, lines_id} = lineChange(data.lines)
// let opList = bestWay(pointChange(data.points, data.lines))
// console.log(opList)
export {pointChange,bestWay}