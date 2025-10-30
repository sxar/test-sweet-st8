import { useState } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { useCounter } from '../../stores/counterStore'
import { DisplayCard } from '../shared/DisplayCard'

export default function SimpleCounter() {
  const [state, actions] = useCounter()
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Simple Counter - Global Store
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
          <li>The <strong>"Count: X"</strong> display reads from <strong>state.count</strong> via the useCounter hook created with <strong>createHook</strong></li>
          <li>The <strong>"Increment"</strong> button calls <strong>actions.increment</strong>, which uses setState to add 1 to the count</li>
          <li>The <strong>"Decrement"</strong> button calls <strong>actions.decrement</strong>, which uses setState to subtract 1 from the count</li>
          <li>The <strong>"Reset"</strong> button calls <strong>actions.reset</strong>, which uses setState to set count back to 0</li>
          <li>All actions and state come from a single global store created with <strong>createStore</strong> - no scoping or containers</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
          <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Global store creation</li>
          <li>setState updates</li>
          <li>Immediate state propagation</li>
          <li>Action execution</li>
        </ul>
        </div>
      )}

      <DisplayCard>
        <div
          className="value-display"
          data-testid="global-counter-value"
        >
          Count: {state.count}
        </div>

        <div className="button-group">
          <button
            data-testid="global-counter-increment"
            onClick={actions.increment}
          >
            Increment
          </button>

          <button
            data-testid="global-counter-decrement"
            onClick={actions.decrement}
          >
            Decrement
          </button>

          <button
            data-testid="global-counter-reset"
            onClick={actions.reset}
          >
            Reset
          </button>
        </div>
      </DisplayCard>
    </div>
  )
}
