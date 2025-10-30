import { useState, useRef } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { ChatContainer, useChat } from '../../stores/chatStore'
import { DisplayCard } from '../shared/DisplayCard'

function ChatRoom() {
  const [state, actions] = useChat()
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      actions.sendMessage(inputValue)
      setInputValue('')
    }
  }

  return (
    <DisplayCard title="Chat Room">
      <div data-testid="chat-message-count">
        Messages: {state.messages.length}
      </div>

      <input
        data-testid="chat-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />

      <button data-testid="chat-send" onClick={handleSend}>
        Send
      </button>

      <ul data-testid="chat-messages" className="task-list">
        {state.messages.map(msg => (
          <li key={msg.id} className="task-item">
            {msg.text} <small>({msg.timestamp})</small>
          </li>
        ))}
      </ul>
    </DisplayCard>
  )
}

export default function ChatLifecycle() {
  const [showChat, setShowChat] = useState(false)
  const mountCount = useRef(0)
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  const handleToggle = () => {
    if (!showChat) {
      mountCount.current++
    }
    setShowChat(!showChat)
  }

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Container Lifecycle & Memory Cleanup
        </h2>
        <div className="info-buttons-group">
          <button
            onClick={() => setShowSetup(!showSetup)}
            className={`info-button ${showSetup ? 'active' : ''}`}
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => setShowTests(!showTests)}
            className={`info-button ${showTests ? 'active' : ''}`}
          >
            <CheckCircle size={16} />
          </button>
        </div>
      </div>

      {showSetup && (
        <div className="setup-section">
        <h4>⚙️ SETUP</h4>
        <ul>
          <li>The <strong>"Show Chat"</strong> checkbox toggles whether the chat room is rendered or not</li>
          <li>The <strong>"Mounts"</strong> counter tracks how many times the chat has been shown (mounted)</li>
          <li>When checked, a <strong>ChatContainer</strong> (created with <strong>createContainer</strong>) mounts with <strong>onInit</strong> and <strong>onCleanup</strong> hooks</li>
          <li>The <strong>"Messages: X"</strong> count, <strong>input field</strong>, <strong>"Send"</strong> button, and <strong>message list</strong> all use the scoped chat store</li>
          <li>When you uncheck "Show Chat", the onCleanup hook runs, clearing all messages and resetting state - notice the message count resets to 0 when you show it again</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Scoped stores cleanup on unmount</li>
          <li>onInit/onDestroy lifecycle hooks</li>
          <li>Memory leak prevention</li>
        </ul>
        </div>
      )}

      <DisplayCard>
        <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            data-testid="chat-toggle"
            checked={showChat}
            onChange={handleToggle}
          />
          Show Chat
        </label>
        <span className="render-counter" data-testid="chat-mount-count" style={{ marginLeft: '2rem' }}>
          Mounts: {mountCount.current}
        </span>
      </div>

        {showChat && (
          <ChatContainer scope="chat">
            <ChatRoom />
          </ChatContainer>
        )}
      </DisplayCard>
    </div>
  )
}
