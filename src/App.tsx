import './App.css'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

const avatarURL = 'https://i.pravatar.cc/48'

type Friend = {
  id: number
  name: string
  image: string
  balance: number
}

const initialFriends: Friend[] = [
  {
    id: 118836,
    name: 'Clark',
    image: avatarURL,
    balance: -7,
  },
  // {
  //   id: 933372,
  //   name: 'Sarah',
  //   image: avatarURL,
  //   balance: 20,
  // },
  // {
  //   id: 499476,
  //   name: 'Anthony',
  //   image: avatarURL,
  //   balance: 0,
  // },
]

function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [addFriendToggle, setAddFriendToggle] = useState(true)
  const [friendName, setFriendName] = useState('')
  const [friendAvatar, setFriendAvatar] = useState(avatarURL)

  const onAddFriend = (e: MouseEvent) => {
    e.preventDefault()
    setFriends((friends) => [
      ...friends,
      {
        id: Date.now(),
        name: friendName,
        image: friendAvatar,
        balance: 0,
      },
    ])
    setFriendAvatar(avatarURL)
    setFriendName('')
    setAddFriendToggle((t) => !t)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              name={friend.name}
              image={friend.image}
              balance={friend.balance}
            />
          ))}
          {addFriendToggle ? (
            <li>
              <button
                onClick={() => setAddFriendToggle((t) => !t)}
                className="button"
              >
                Add friend
              </button>
            </li>
          ) : null}
        </ul>
        {!addFriendToggle && (
          <>
            <form className="form-add-friend">
              <Input
                value={friendName}
                onChange={setFriendName}
                id="friend_name"
                text="Friend name"
              />
              <Input
                value={friendAvatar}
                onChange={setFriendAvatar}
                id="avatar"
                text="Image URL"
              />
              <button onClick={onAddFriend} className="button">
                Add
              </button>
            </form>
            <button
              onClick={() => setAddFriendToggle((t) => !t)}
              className="button"
            >
              Close
            </button>
          </>
        )}
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
      {balance < 0 && (
        <p className="red">{`You owe ${name} £${Math.abs(balance)}`}</p>
      )}
      {balance === 0 && <p>{`You and ${name} are even`}</p>}
      {balance > 0 && (
        <p className="green">{`${name} owes You  £${balance}`}</p>
      )}
      <button className="button">Select</button>
    </li>
  )
}

type ButtonProps = {
  text: string
  addFriendToggle: boolean
  setAddFriendToggle: Dispatch<SetStateAction<boolean>>
}
const Button = ({ text, addFriendToggle, setAddFriendToggle }: ButtonProps) => {
  return (
    <>
      {addFriendToggle ? (
        <button
          onClick={() => setAddFriendToggle((t) => !t)}
          className="button"
        >
          {text}
        </button>
      ) : null}
    </>
  )
}

type InputProps = {
  text: string
  id: string
  value: string
  onChange: Dispatch<SetStateAction<string>>
}
const Input = ({ text, id, value, onChange }: InputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <>
      <label htmlFor={id}>{`* ${text}`}</label>
      <input
        value={value}
        onChange={handleInputChange}
        type="text"
        id={id}
        name={id}
      />
    </>
  )
}

export default App
