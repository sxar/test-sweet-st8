import { useState, useRef } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { usePersistCounter } from '../../stores/persistCounterStore'
import { DisplayCard } from '../shared/DisplayCard'

function LocalComponent() {
  const [localCount, setLocalCount] = useState(0)

  return (
    <DisplayCard title="Component with Local State">
      <div data-testid="persist-local-count">
        Component Count: {localCount}
      </div>
      <button
        data-testid="persist-increment-local"
        onClick={() => setLocalCount(c => c + 1)}
      >
        Increment Local
      </button>
    </DisplayCard>
  )
}

export default function StatePersistence() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)
  const [globalState, globalActions] = usePersistCounter()
  const [showComponent, setShowComponent] = useState(false)
  const mountCount = useRef(0)

  const handleToggle = () => {
    if (!showComponent) {
      mountCount.current++
    }
    setShowComponent(!showComponent)
  }

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Global Store Persists When Components Unmount
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
          <li>You see a <strong>"Global Store"</strong> card with <strong>"Global Count"</strong> and <strong>"Increment Global"</strong> button that's always visible</li>
          <li>The <strong>"Show Component"</strong> checkbox toggles whether a second component with <strong>"Component Count"</strong> and <strong>"Increment Local"</strong> appears</li>
          <li>The <strong>"Mounts"</strong> counter tracks how many times the togglable component has been shown</li>
          <li>The Global Count uses a store created with <strong>createStore</strong> that persists even when no components are using it</li>
          <li>The Component Count uses local React state (useState) - notice it resets to 0 each time you re-check "Show Component" while Global Count stays the same</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Global stores persist across component lifecycle</li>
          <li>State survives component unmount/remount</li>
          <li>Difference between global and scoped stores</li>
        </ul>
        </div>
      )}

      <DisplayCard title="Global Store (Always Persists)">
        <div data-testid="persist-global-count">
          Global Count: {globalState.count}
        </div>
        <button
          data-testid="persist-increment"
          onClick={globalActions.increment}
        >
          Increment Global
        </button>
      </DisplayCard>

      <div style={{ margin: '1rem 0' }}>
        <label>
          <input
            type="checkbox"
            data-testid="persist-toggle"
            checked={showComponent}
            onChange={handleToggle}
          />
          Show Component
        </label>
        <span className="render-counter" data-testid="persist-mount-count" style={{ marginLeft: '2rem' }}>
          Mounts: {mountCount.current}
        </span>
      </div>

      {showComponent && <LocalComponent />}
    </div>
  )
}
