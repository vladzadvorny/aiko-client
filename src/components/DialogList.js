import React from 'react'
import './DialogList.scss'

// Mock data for dialogs
const mockDialogs = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Hello there! How are you doing?',
    timestamp: new Date() // Today
  },
  {
    id: 2,
    name: 'Alice Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: 3,
    name: 'Bob Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Thanks for your help with the project!',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: 4,
    name: 'Carol Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Did you see the latest updates?',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Let me know when you are available',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  },
  {
    id: 6,
    name: 'Emma Brown',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'The files have been uploaded',
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) // 25 days ago
  },
  {
    id: 7,
    name: 'Frank Miller',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Looking forward to our collaboration',
    timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000) // 40 days ago
  }
]

const DialogList = () => {
  // Group dialogs by time period
  const groupDialogsByTime = dialogs => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const groups = {
      today: [],
      lastWeek: [],
      lastMonth: [],
      older: []
    }

    dialogs.forEach(dialog => {
      const dialogDate = new Date(dialog.timestamp)

      if (dialogDate >= today) {
        groups.today.push(dialog)
      } else if (dialogDate >= lastWeek) {
        groups.lastWeek.push(dialog)
      } else if (dialogDate >= lastMonth) {
        groups.lastMonth.push(dialog)
      } else {
        groups.older.push(dialog)
      }
    })

    return groups
  }

  const groupedDialogs = groupDialogsByTime(mockDialogs)

  const formatTimePeriod = period => {
    const labels = {
      today: 'Сегодня',
      lastWeek: 'Последняя неделя',
      lastMonth: 'Последний месяц',
      older: 'Старые'
    }
    return labels[period]
  }

  const DialogItem = ({ dialog }) => (
    <div className="dialog-item">
      <img src={dialog.avatar} alt={dialog.name} className="dialog-avatar" />
      <div className="dialog-info">
        <div className="dialog-name">{dialog.name}</div>
        <div className="dialog-last-message">{dialog.lastMessage}</div>
      </div>
    </div>
  )

  return (
    <div className="dialog-list">
      {Object.entries(groupedDialogs).map(
        ([period, dialogs]) =>
          dialogs.length > 0 && (
            <div key={period} className="dialog-group">
              <div className="dialog-group-header">{formatTimePeriod(period)}</div>
              {dialogs.map(dialog => (
                <DialogItem key={dialog.id} dialog={dialog} />
              ))}
            </div>
          )
      )}
    </div>
  )
}

export default DialogList
