import { useState, useRef, useEffect } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { useUserName, useUserAge, useUserEmail, useUserActions } from '../../stores/userProfileStore'
import { DisplayCard } from '../shared/DisplayCard'

function NameDisplay() {
  const [name] = useUserName()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <DisplayCard title="Name Display">
      <div className="value-display" data-testid="selector-name">
        {name}
      </div>
      <div className="render-counter" data-testid="selector-name-renders">
        Renders: {renderCount.current}
      </div>
    </DisplayCard>
  )
}

function AgeDisplay() {
  const [age] = useUserAge()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <DisplayCard title="Age Display">
      <div className="value-display" data-testid="selector-age">
        {age}
      </div>
      <div className="render-counter" data-testid="selector-age-renders">
        Renders: {renderCount.current}
      </div>
    </DisplayCard>
  )
}

function EmailDisplay() {
  const [email] = useUserEmail()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <DisplayCard title="Email Display">
      <div className="value-display" data-testid="selector-email">
        {email}
      </div>
      <div className="render-counter" data-testid="selector-email-renders">
        Renders: {renderCount.current}
      </div>
    </DisplayCard>
  )
}

function UpdateControls() {
  const [, actions] = useUserActions()
  const [nameInput, setNameInput] = useState('')
  const [ageInput, setAgeInput] = useState('')
  const [emailInput, setEmailInput] = useState('')

  return (
    <DisplayCard title="Update Controls">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div className="form-row">
          <label htmlFor="update-name-input">Update Name:</label>
          <input
            id="update-name-input"
            data-testid="update-name-input"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="New name"
          />
          <button
            data-testid="update-name-btn"
            onClick={() => {
              actions.updateName(nameInput)
              setNameInput('')
            }}
          >
            Update
          </button>
        </div>

        <div className="form-row">
          <label htmlFor="update-age-input">Update Age:</label>
          <input
            id="update-age-input"
            data-testid="update-age-input"
            type="number"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
            placeholder="New age"
          />
          <button
            data-testid="update-age-btn"
            onClick={() => {
              actions.updateAge(ageInput)
              setAgeInput('')
            }}
          >
            Update
          </button>
        </div>

        <div className="form-row">
          <label htmlFor="update-email-input">Update Email:</label>
          <input
            id="update-email-input"
            data-testid="update-email-input"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="New email"
          />
          <button
            data-testid="update-email-btn"
            onClick={() => {
              actions.updateEmail(emailInput)
              setEmailInput('')
            }}
          >
            Update
          </button>
        </div>
      </div>
    </DisplayCard>
  )
}

export default function SelectorsDemo() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Selectors Prevent Unnecessary Re-renders
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
          <li>You see three display cards showing <strong>"Name"</strong>, <strong>"Age"</strong>, and <strong>"Email"</strong>, each with its own <strong>"Renders"</strong> counter</li>
          <li>Each card uses a different hook created with <strong>createHook with a selector</strong>: useUserName only subscribes to name changes, useUserAge to age, useUserEmail to email</li>
          <li>The <strong>"Update Controls"</strong> section has inputs and buttons to update each field via <strong>actions</strong> (from a hook with <strong>selector: null</strong>)</li>
          <li>When you update name, watch only the Name card's <strong>"Renders"</strong> counter increase - Age and Email don't re-render because their selected data didn't change</li>
          <li>This demonstrates how <strong>selectors</strong> prevent unnecessary re-renders by isolating components to specific slices of state</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Selectors isolate component updates</li>
          <li>Only components with changed data re-render</li>
          <li>Major performance optimization</li>
        </ul>
        </div>
      )}

      <div className="grid-3">
        <NameDisplay />
        <AgeDisplay />
        <EmailDisplay />
      </div>

      <UpdateControls />
    </div>
  )
}
