import { useState } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { useSharedCounter } from '../../stores/sharedCounterStore'
import { RenderCounter } from '../shared/RenderCounter'

function CounterComponent({ label, testId }) {
  const [state, actions] = useSharedCounter()

  return (
    <div className="display-card">
      <h3 className="card-title">{label}</h3>

      <div
        className="value-display"
        data-testid={`shared-counter-${testId}`}
      >
        Count: {state.count}
      </div>

      <RenderCounter testId={`shared-renders-${testId}`} />

      <button
        data-testid={`shared-increment-${testId}`}
        onClick={actions.increment}
      >
        Increment
      </button>
    </div>
  )
}

export default function MultipleSubscribers() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Multiple Components Sharing State
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
          <li>You see <strong>three separate cards</strong> (Component A, Component B, Component C), each displaying its own "Count" and "Increment" button</li>
          <li>Each card's <strong>"Count: X"</strong> display reads from the same <strong>useSharedCounter</strong> hook created with <strong>createHook</strong></li>
          <li>Clicking <strong>"Increment"</strong> in any card calls the shared action, which updates the global store via setState</li>
          <li>Because all three components subscribe to the same store instance, <strong>all three "Count" displays update simultaneously</strong></li>
          <li>The <strong>"Renders"</strong> counter in each card increases every time that component re-renders due to a store update</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Shared state across components</li>
          <li>All subscribers receive updates</li>
          <li>Single source of truth</li>
        </ul>
        </div>
      )}

      <div className="grid-3">
        <CounterComponent label="Component A" testId="A" />
        <CounterComponent label="Component B" testId="B" />
        <CounterComponent label="Component C" testId="C" />
      </div>
    </div>
  )
}
