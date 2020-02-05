var cards = []
var count = 2;

//insert cards 2-10 
while (count < 11) {
    cards.push(["../img/"  + count + "S.png",count])
    cards.push(["../img/"  + count + "C.png",count])
    cards.push(["../img/"  + count + "D.png",count])
    cards.push(["../img/"  + count + "H.png",count])
    count++;
}

//insert face cards + aces
cards.push(["../img/KS.png",10])
cards.push(["../img/KC.png",10])
cards.push(["../img/KD.png",10])
cards.push(["../img/KH.png",10])
cards.push(["../img/QS.png",10])
cards.push(["../img/QD.png",10])
cards.push(["../img/QH.png",10])
cards.push(["../img/QC.png",10])
cards.push(["../img/JS.png",10])
cards.push(["../img/JD.png",10])
cards.push(["../img/JH.png",10])
cards.push(["../img/JC.png",10])
cards.push(["../img/AS.png",11])
cards.push(["../img/AD.png",11])
cards.push(["../img/AH.png",11])
cards.push(["../img/AC.png",11])

export default cards;
