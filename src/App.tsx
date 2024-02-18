import './App.css'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'

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
  {
    id: 933372,
    name: 'Sarah',
    image: avatarURL,
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: avatarURL,
    balance: 0,
  },
]

function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [addFriendToggle, setAddFriendToggle] = useState(true)
  const [friendName, setFriendName] = useState('')
  const [friendAvatar, setFriendAvatar] = useState(avatarURL)

  const [splitBill, setSplitBill] = useState<null | number>(null)

  const [totalBill, setTotalBill] = useState(0)
  const [myShare, setMyShare] = useState(0)
  const [whoPaid, setWhoPaid] = useState(0)

  const selectedFriend = friends.find((f) => f.id === splitBill) as Friend
  const friendShare = totalBill - myShare

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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let friendLatest: Friend
    if (whoPaid === 0) {
      friendLatest = {
        ...selectedFriend,
        balance: selectedFriend.balance + friendShare,
      }
    } else {
      friendLatest = {
        ...selectedFriend,
        balance: selectedFriend.balance - myShare,
      }
    }

    setFriends((f) =>
      f.map((e) =>
        e.id === selectedFriend.id ? { ...e, ...friendLatest } : e,
      ),
    )
    setSplitBill(null)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              id={friend.id}
              name={friend.name}
              image={friend.image}
              splitBill={splitBill}
              setSplitBill={setSplitBill}
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
      {splitBill && (
        <form onSubmit={handleFormSubmit} className="form-split-bill">
          <h2>Split a bill with {selectedFriend.name}</h2>
          <Input
            value={totalBill}
            onChange={setTotalBill}
            id="total_bill"
            text="Bill value"
          />

          <Input
            value={myShare}
            onChange={setMyShare}
            id="my-expense"
            text="My expense"
          />

          <Input
            disabled={true}
            value={friendShare}
            onChange={() => {}}
            id="friend-share"
            text={`${selectedFriend.name} expense`}
          />

          <label htmlFor="paid_by_whom">* Who is paying the bill</label>

          <select
            value={whoPaid}
            onChange={(e) => setWhoPaid(Number(e.target.value))}
            name="paid_by_whom"
            id="paid_by_whom"
          >
            <option value={0}>You</option>
            <option value={selectedFriend.id}>{selectedFriend.name}</option>
          </select>

          <button className="button">Split bill</button>
        </form>
      )}
    </div>
  )
}

type FriendCardProps = {
  id: number
  image: string
  name: string
  balance: number
  splitBill: number | null
  setSplitBill: Dispatch<SetStateAction<number | null>>
}

const FriendCard = ({
  id,
  image,
  name,
  balance,
  splitBill,
  setSplitBill,
}: FriendCardProps) => {
  const isCardSelected = splitBill === id
  const onSelectingFriend = (id: number) => {
    isCardSelected ? setSplitBill(null) : setSplitBill(id)
  }
  return (
    <li className={isCardSelected ? 'selected' : ''}>
      <img src={image} alt="random" />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">{`You owe ${name} £${Math.abs(balance)}`}</p>
      )}
      {balance === 0 && <p>{`You and ${name} are even`}</p>}
      {balance > 0 && (
        <p className="green">{`${name} owes You  £${balance}`}</p>
      )}
      <button onClick={() => onSelectingFriend(id)} className="button">
        {isCardSelected ? 'Close' : 'Select'}
      </button>
    </li>
  )
}

type InputProps = {
  text: string
  id: string
  value: string | number
  onChange: Dispatch<SetStateAction<string | number>>
  disabled?: boolean
}
const Input = ({ text, id, value, onChange, disabled }: InputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <>
      <label htmlFor={id}>{`* ${text}`}</label>
      <input
        disabled={disabled}
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
