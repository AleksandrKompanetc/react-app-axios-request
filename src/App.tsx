import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card';

interface Item {
  id: number
  title: string
  description: string
}

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => {
        const data = response.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          description: post.body
        }))
        setItems(data)
      })
        .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="App">
      <h1>Card List</h1>
      <form>
        <input 
          type="text"
          value={title}
          placeholder='Enter title...' 
        />
        <input 
          type="text"
          value={description} 
          placeholder='Enter description...'
        />
        <button>Add Card</button>
      </form>

      <div className='card-list'>
        {items.map((item) => (
          <Card key={item.id} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}

export default App;
