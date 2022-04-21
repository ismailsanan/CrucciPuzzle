const {readFile, writeFile} = require('fs');
//split the word list into key letter and value is the list

readFile('./word-list.txt', 'utf-8', (err, result) => {
    if(err){
        console.log(err)
        return
    }

    const words = result.split('\r\n');

    let startWith = 'A'

    let all = {}
    let wordsArr = []
    let co = 0;
    for(let i = 0; i < words.length; i++){
        if(!words[i].startsWith(startWith)){
            all[startWith] = wordsArr;
            wordsArr = []
            startWith = words[i].charAt(0);   
        }
        wordsArr.push(words[i]) 
    }
    all[startWith] = wordsArr;

    writeFile("./word-list.json", JSON.stringify(all, null, 4), (err, res) => {
        if(err){
            console.log(err)
            return
        }
        console.log("done")
    })

})