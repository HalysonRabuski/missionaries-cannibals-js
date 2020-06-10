function start(n){
    return {
        boat: 'left',
        left: {
            missionaries: n,
            cannibals: n,
        },
        right: {
            missionaries: 0,
            cannibals: 0,
        }
    }
}

function otherSide(side) {
    if (side == 'left') return 'right';
    else return 'left';
}

function generateChildren(state){
    // let boatSide = state.boat;
    // const otherSide =  //chamar da função
    let children = [];
    let possibilities = [
        {missionaries: 0, cannibals: 2},
        {missionaries: 1, cannibals: 1},
        {missionaries: 2, cannibals: 0},
        {missionaries: 1, cannibals: 0},
        {missionaries: 0, cannibals: 1},
    ]

    possibilities.map(move=>{
        let child = {
            boat: otherSide(state.boat),
            left: {
                missionaries: 0,
                cannibals: 0,
            },
            right: {
                missionaries: 0,
                cannibals: 0,
            }
        }

        if(state.boat=='left'){
            child.left.missionaries = state.left.missionaries - move.missionaries
            child.right.missionaries = state.right.missionaries + move.missionaries
            child.left.cannibals = state.left.cannibals - move.cannibals
            child.right.cannibals = state.right.cannibals + move.cannibals
        }else{
            child.right.missionaries = state.right.missionaries - move.missionaries
            child.left.missionaries = state.left.missionaries + move.missionaries
            child.right.cannibals = state.right.cannibals - move.cannibals
            child.left.cannibals = state.left.cannibals + move.cannibals
        }
        if(isValid(child)){
            child.father = state
            children.push(child)
        }
    })
    state.children = children;
}

function isValid(state){
    if(state.left.missionaries<0 || state.right.missionaries<0 || state.left.cannibals < 0 || state.right.cannibals < 0){
        return false
    }

    return ((state.left.missionaries == 0 || state.left.missionaries >= state.left.cannibals)
        && (state.right.missionaries == 0 || state.right.missionaries >= state.right.cannibals))
}

function isOver(state){
    if(state.left.missionaries == 0 && state.left.cannibals == 0
        && state.right.cannibals == 3 && state.right.missionaries == 3){
            return true
        }else{
            return false
        }
}

function riverCross(state){
    var queue = [state]

    for (var i = 0; i < queue.length; i++) {
        if(isOver(queue[i])){
            resolvePath(queue[i]);
            break
        }else{
            generateChildren(queue[i])
            queue[i].children.map(child=>{
                queue.push(child)
            })
        }
    }
}

function resolvePath(state){
    let path = []
    while(state.father){
        path.push(state)
        state = state.father
    }
    path.push({
        boat: 'left',
        left: {
            missionaries: 3,
            cannibals: 3,
        },
        right: {
            missionaries: 0,
            cannibals: 0,
        }
    })
    stateAsString(path.reverse())
}

function stateAsString(asnwerArray){
    asnwerArray.map(item=>{
            let string = 'Missionários: '+item.left.missionaries+'    | l l  l  ll |    missionários: '+item.right.missionaries+'\n'+
                         'Canibais:     '+item.left.cannibals+'    | l l  l  ll |    Canibais: '+item.right.cannibals+' lado do Barco:'+item.boat+'\n'
            console.log(string)
    })
}



var state = start(3)

riverCross(state)