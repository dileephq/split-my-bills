import './App.css'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {initialFriends.map((friend) => (
            <li key={friend.id}>
              <img src={friend.image} alt="random" />
              <h3>{friend.name}</h3>
              <p>Some text and {friend.balance}</p>
              <button className="button">Select</button>
            </li>
          ))}
          <li>
            <button className="button">Add friend</button>
          </li>
        </ul>
        <form className="form-add-friend">
          <label htmlFor="name">* Friend name</label>
          <input type="text" id="name" name="friend_name" />

          <label htmlFor="avatar">* Image URL</label>
          <input type="text" id="avatar" name="avatar" />

          <button className="button">Add</button>
        </form>
        <div></div>
        <button className="button mt-5">Close</button>
      </div>
      <form className="form-add-friend">
        <h2>Split a bill with [Friend]</h2>
        <label htmlFor="bill">* Bill value</label>
        <input type="text" id="bill" name="bill_value" />

        <label htmlFor="my-expense">* My expense</label>
        <input type="text" id="my-expense" name="my-expense" />

        <label htmlFor="friend-expense">* [friends] expense</label>
        <input type="text" id="friend-expense" name="friend-expense" />

        <label htmlFor="paid_by_whom">- Who is paying the bill</label>

        <select name="paid_by_whom" id="paid_by_whom">
          <option value="you">You</option>
          <option value="friend">Friend</option>
        </select>

        <button className="button">Split bill</button>
      </form>
    </div>
  )
}

export default App
