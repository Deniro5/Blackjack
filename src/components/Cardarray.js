var cards = []
var count = 2;

//insert cards 2-10 
while (count < 11) {
    cards.push(["imgs/"  + count + "S.png",count])
    cards.push(["imgs/"  + count + "C.png",count])
    cards.push(["imgs/"  + count + "D.png",count])
    cards.push(["imgs/"  + count + "H.png",count])
    count++;
}

//insert face cards + aces
cards.push(["imgs/KS.png",10])
cards.push(["imgs/KC.png",10])
cards.push(["imgs/KD.png",10])
cards.push(["imgs/KH.png",10])
cards.push(["imgs/QS.png",10])
cards.push(["imgs/QD.png",10])
cards.push(["imgs/QH.png",10])
cards.push(["imgs/QC.png",10])
cards.push(["imgs/JS.png",10])
cards.push(["imgs/JD.png",10])
cards.push(["imgs/JH.png",10])
cards.push(["imgs/JC.png",10])
cards.push(["imgs/AS.png",11])
cards.push(["imgs/AD.png",11])
cards.push(["imgs/AH.png",11])
cards.push(["imgs/AC.png",11])

export default cards;
