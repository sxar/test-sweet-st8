import { useState } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { useParamCounter } from '../../stores/paramCounterStore'
import { DisplayCard } from '../shared/DisplayCard'

export default function ActionsWithParams() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)
  const [state, actions] = useParamCounter()
  const [customValue, setCustomValue] = useState('')

  const handleAddCustom = () => {
    const amount = parseInt(customValue, 10)
    if (!isNaN(amount)) {
      actions.addAmount(amount)
      setCustomValue('')
    }
  }

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Actions with Parameters
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
          <li>The <strong>"Count: X"</strong> display reads from <strong>state.count</strong> via the useParamCounter hook</li>
          <li>Each button (<strong>"Add 1"</strong>, <strong>"Add 5"</strong>, <strong>"Add 10"</strong>) calls the same action <strong>actions.addAmount()</strong> but passes a different number</li>
          <li>The <strong>"Custom Amount"</strong> input and <strong>"Add Custom"</strong> button let you pass any value to the same addAmount action</li>
          <li>The store's addAmount action receives the parameter and uses setState to add that amount to the current count</li>
          <li>This shows how a single store action created with <strong>createStore</strong> can handle different inputs flexibly</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Actions accepting parameters</li>
          <li>Dynamic values from user input</li>
          <li>Action flexibility</li>
        </ul>
        </div>
      )}

      <DisplayCard>
        <div
          className="value-display"
          data-testid="param-counter-value"
        >
          Count: {state.count}
        </div>

        <div className="button-group">
          <button
            data-testid="param-add-1"
            onClick={() => actions.addAmount(1)}
          >
            Add 1
          </button>

          <button
            data-testid="param-add-5"
            onClick={() => actions.addAmount(5)}
          >
            Add 5
          </button>

          <button
            data-testid="param-add-10"
            onClick={() => actions.addAmount(10)}
          >
            Add 10
          </button>
        </div>

        <div className="form-row">
          <label htmlFor="custom-amount-input">Custom Amount:</label>
          <input
            id="custom-amount-input"
            data-testid="param-custom-input"
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Enter amount"
          />
          <button
            data-testid="param-add-custom"
            onClick={handleAddCustom}
          >
            Add Custom
          </button>
        </div>
      </DisplayCard>
    </div>
  )
}
