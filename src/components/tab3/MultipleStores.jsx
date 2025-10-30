import { useState, useRef, useEffect } from 'react'
import { Settings, CheckCircle, Mail, Bell } from 'lucide-react'
import { useTheme } from '../../stores/themeStore'
import { useNotification } from '../../stores/notificationStore'
import { useMultiCounter } from '../../stores/multiCounterStore'
import { DisplayCard } from '../shared/DisplayCard'

function ThemeDisplay() {
  const [themeState, themeActions] = useTheme()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <DisplayCard title="Theme Store">
      <div>
        <label>Select Theme: </label>
        <select
          data-testid="theme-select"
          value={themeState.theme}
          onChange={(e) => themeActions.setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      <div data-testid="theme-current">
        Current Theme: {themeState.theme}
      </div>
      <div className="render-counter" data-testid="theme-renders">
        Renders: {renderCount.current}
      </div>
    </DisplayCard>
  )
}

function NotificationDisplay() {
  const [notifState, notifActions] = useNotification()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <DisplayCard title="Notification Store">
      <div>
        <label>
          <button
            data-testid="notif-email"
            onClick={notifActions.toggleEmail}
            className={`info-button ${notifState.email ? 'active' : ''}`}
            aria-pressed={notifState.email}
            aria-label={`Email notifications ${notifState.email ? 'enabled' : 'disabled'}`}
          >
            <Mail size={16} />
          </button>
          Email Notifications
        </label>
      </div>
      <div>
        <label>
          <button
            data-testid="notif-push"
            onClick={notifActions.togglePush}
            className={`info-button ${notifState.push ? 'active' : ''}`}
            aria-pressed={notifState.push}
            aria-label={`Push notifications ${notifState.push ? 'enabled' : 'disabled'}`}
          >
            <Bell size={16} />
          </button>
          Push Notifications
        </label>
      </div>
      <div data-testid="notif-status">
        Status: Email: {notifState.email ? 'on' : 'off'}, Push: {notifState.push ? 'on' : 'off'}
      </div>
      <div className="render-counter" data-testid="notif-renders">
        Renders: {renderCount.current}
      </div>
    </DisplayCard>
  )
}

function CounterDisplay() {
  const [counterState, counterActions] = useMultiCounter()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <DisplayCard title="Counter Store">
      <div className="value-display" data-testid="multi-counter">
        Count: {counterState.count}
      </div>
      <button data-testid="multi-increment" onClick={counterActions.increment}>
        Increment
      </button>
      <div className="render-counter" data-testid="counter-renders">
        Renders: {renderCount.current}
      </div>
    </DisplayCard>
  )
}

export default function MultipleStores() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Multiple Independent Stores
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
          <li>You see three separate cards: <strong>"Theme Store"</strong> with a dropdown, <strong>"Notification Store"</strong> with toggle buttons, and <strong>"Counter Store"</strong> with a counter</li>
          <li>Each card connects to a completely different store created with <strong>createStore</strong>: ThemeStore, NotificationStore, and MultiCounterStore</li>
          <li>The <strong>"Select Theme"</strong> dropdown updates only ThemeStore; the <strong>notification toggle buttons</strong> update only NotificationStore; the <strong>"Increment"</strong> button updates only MultiCounterStore</li>
          <li>Changing the theme dropdown does not affect the notification toggles or counter value - each store is completely isolated</li>
          <li>This shows how multiple independent stores created with <strong>createStore</strong> and <strong>createHook</strong> can coexist without interfering with each other</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Multiple stores coexist independently</li>
          <li>Updates don't cross store boundaries</li>
          <li>Store isolation and separation of concerns</li>
        </ul>
        </div>
      )}

      <ThemeDisplay />
      <NotificationDisplay />
      <CounterDisplay />
    </div>
  )
}
