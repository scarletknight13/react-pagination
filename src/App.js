import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
function App() {
  const [counter, setCounter] = useState(1);
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  function handleSubtraction(e){
    setCounter(Math.max(1, counter - 1));
    console.log(counter);
  }
  function handleAddition(e){
    setCounter(Math.min(counter+1, parseInt(Math.ceil(users.length / 10))));
  }
  useEffect(() => {
    const temp = [...users.slice((counter - 1) * 10, (counter - 1) * 10 + 9).map(user => <div>{user.name.first}</div>)]
    console.log(temp)
    setDisplayUsers(temp)

  }, [counter])
  useEffect(() => {
    async function fetchdata(){
      const info = await axios.get('https://randomuser.me/api/?results=101')
      setUsers(info.data.results);
    }
    fetchdata();
  }, []);
  useEffect(() => {
    if(users){
      const temp = [...users.slice(0, 9).map(user => <div>{user.name.first}</div>)];
      console.log(temp);
      setDisplayUsers(temp);
    }
  }, [users])
  return (
    <div className="App">
      <div>
        {displayUsers ? displayUsers : <h1>Loading</h1>}
      </div>
      <div className="page-header">
        <button onClick={handleSubtraction}>{'<<Prev'}</button>
        <h2>{counter}</h2>
        <button onClick={handleAddition}>{'Next>>'}</button>
      </div>
    </div>
  );
}

export default App;
