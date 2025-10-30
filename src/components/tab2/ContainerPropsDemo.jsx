import { useState } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { MultiplierContainer, useMultiplier } from '../../stores/multiplierStore'

function MultiplierCounter({ testId }) {
  const [state, actions] = useMultiplier()

  return (
    <div className="display-card">
      <div
        className="value-display"
        data-testid={`multiplier-value-${testId}`}
      >
        Count: {state.count}
      </div>

      <button
        data-testid={`multiplier-increment-${testId}`}
        onClick={actions.increment}
      >
        Increment
      </button>
    </div>
  )
}

export default function ContainerPropsDemo() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Container Props Affect Action Behavior
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
          <li>You see <strong>three counter sections</strong> labeled "Multiplier: 1x", "Multiplier: 2x", and "Multiplier: 5x"</li>
          <li>Each section is wrapped in a <strong>MultiplierContainer</strong> (created with <strong>createContainer</strong>) with both a <strong>scope</strong> and <strong>multiplier</strong> prop</li>
          <li>The <strong>"Count: X"</strong> display in each section reads from its scoped store instance</li>
          <li>When you click <strong>"Increment"</strong> in the 1x section, it adds 1; in the 2x section it adds 2; in the 5x section it adds 5</li>
          <li>The same increment action behaves differently because it accesses the <strong>multiplier prop</strong> passed to its container and multiplies accordingly</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Container props passed to actions</li>
          <li>Same action, different behavior per container</li>
          <li>Dynamic store configuration</li>
        </ul>
        </div>
      )}

      <div className="grid-3">
        <MultiplierContainer scope="1x" multiplier={1}>
          <div>
            <h3>Multiplier: 1x</h3>
            <MultiplierCounter testId="1x" />
          </div>
        </MultiplierContainer>

        <MultiplierContainer scope="2x" multiplier={2}>
          <div>
            <h3>Multiplier: 2x</h3>
            <MultiplierCounter testId="2x" />
          </div>
        </MultiplierContainer>

        <MultiplierContainer scope="5x" multiplier={5}>
          <div>
            <h3>Multiplier: 5x</h3>
            <MultiplierCounter testId="5x" />
          </div>
        </MultiplierContainer>
      </div>
    </div>
  )
}
