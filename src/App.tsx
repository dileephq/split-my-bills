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
            <FriendCard
              key={friend.id}
              name={friend.name}
              image={friend.image}
              balance={friend.balance}
            />
          ))}
          <li>
            <Button text="Add friend" />
          </li>
        </ul>
        <form className="form-add-friend">
          <Input id="friend_name" text="Friend name" />
          <Input id="avatar" text="Image URL" />
          <Button text="Add" />
        </form>
        <Button text="Close" />
      </div>
      <form className="form-split-bill">
        <h2>Split a bill with [Friend]</h2>
        <Input id="total_bill" text="Bill value" />

        <Input id="my-expense" text="My expense" />

        <Input id="friend-share" text="[friends] expense" />

        <label htmlFor="paid_by_whom">- Who is paying the bill</label>

        <select name="paid_by_whom" id="paid_by_whom">
          <option value="you">You</option>
          <option value="[friend]">[Friend]</option>
        </select>

        <Button text="Split bill" />
      </form>
    </div>
  )
}

type FriendCardProps = {
  image: string
  name: string
  balance: number
}

const FriendCard = ({ image, name, balance }: FriendCardProps) => {
  return (
    <li>
      <img src={image} alt="random" />
      <h3>{name}</h3>
      <p>Some text and {balance}</p>
      <button className="button">Select</button>
    </li>
  )
}

type ButtonProps = {
  text: string
}
const Button = ({ text }: ButtonProps) => {
  return <button className="button">{text}</button>
}

type InputProps = {
  text: string
  id: string
}
const Input = ({ text, id }: InputProps) => {
  return (
    <>
      <label htmlFor={id}>{`* ${text}`}</label>
      <input type="text" id={id} name={id} />
    </>
  )
}

export default App
