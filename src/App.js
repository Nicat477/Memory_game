
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages=[
  {"src":'img/helmet-1.png',matched:false},
  {"src":'img/potion-1.png',matched:false},
  {"src":'img/ring-1.png',matched:false},
  {"src":'img/scroll-1.png',matched:false},
  {"src":'img/shield-1.png',matched:false},
  {"src":'img/sword-1.png',matched:false}
]
function App() {
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
  const [choiceOne,setchoiceOne]=useState(null)
  const [choiceTwo,setchoiceTwo]=useState(null)
  const [disabled,setDisabled]=useState(false)
  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
    setchoiceOne(null)
    setchoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  const handleChoice=(card)=>{
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }
  useEffect(()=>{
    shuffleCards()
  },[])
  useEffect(()=>{
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src===choiceTwo.src){
        setCards(prev=>{
          return prev.map(pre=>{
            if (pre.src===choiceOne.src){
              return {...pre,matched:true}
            }else{
              return pre
            }
          })
        })
        reset()
      }else{
        setTimeout(() => reset(), 1000);
        
      }
    }
  },[choiceOne,choiceTwo])
  const reset=()=>{
    setTurns(prev=>prev+1)
    setchoiceOne(null)
    setchoiceTwo(null)
    setDisabled(false)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} disabled={disabled} flipped={card===choiceOne || card===choiceTwo|| card.matched}/>
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
