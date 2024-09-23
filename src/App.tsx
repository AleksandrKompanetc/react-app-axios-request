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

  const addCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newItem: Item = {
      id: items.length + 1,
      title,
      description
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', newItem)
    .then((response) => {
      setItems([...items, newItem])
      setTitle('')
      setDescription('')
    })
      .catch((error) => console.error('Error adding card', error))
  }

  return (
    <div className="App">
      <h1>Card List</h1>
      <form onSubmit={addCard}>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter title...' 
        />
        <input 
          type="text"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter description...'
        />
        <button type='submit'>Add Card</button>
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
