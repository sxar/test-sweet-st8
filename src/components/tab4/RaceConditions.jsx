import { useState } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { usePosts } from '../../stores/postsStore'
import { DisplayCard } from '../shared/DisplayCard'

export default function RaceConditions() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)
  const [state, actions] = usePosts()

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Race Condition Handling
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
          <li>The <strong>"Request ID"</strong> display shows which request is currently active ("slow" or "fast")</li>
          <li>The <strong>"Loading"</strong> indicator shows whether any request is in progress</li>
          <li>The <strong>"Posts"</strong> display shows the data returned from the completed request</li>
          <li>Clicking <strong>"Fetch Posts (Slow 3s)"</strong> starts a 3-second async action; clicking <strong>"Fetch Posts (Fast 1s)"</strong> starts a 1-second action</li>
          <li>The store's async action tracks each request with a unique <strong>requestId</strong> and ignores responses from stale requests, ensuring only the latest request updates the UI</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Multiple simultaneous async actions</li>
          <li>Request tracking and cancellation</li>
          <li>Latest request wins pattern</li>
          <li>State consistency under concurrent updates</li>
        </ul>
        </div>
      )}

      <DisplayCard>
        <div data-testid="request-id">
          Request ID: {state.requestId}
        </div>

        <div data-testid="posts-loading">
          Loading: {state.loading ? 'true' : 'false'}
        </div>

        <div data-testid="posts-data">
          Posts: {state.posts || 'none'}
        </div>

        <div className="button-group">
          <button
            data-testid="fetch-slow"
            onClick={() => actions.fetchPosts('slow', 3000)}
          >
            Fetch Posts (Slow 3s)
          </button>

          <button
            data-testid="fetch-fast"
            onClick={() => actions.fetchPosts('fast', 1000)}
          >
            Fetch Posts (Fast 1s)
          </button>
        </div>
      </DisplayCard>
    </div>
  )
}
