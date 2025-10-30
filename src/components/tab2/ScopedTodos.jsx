import { useState } from 'react'
import { Settings, CheckCircle } from 'lucide-react'
import { TodoContainer, useTodo } from '../../stores/todoStore'

function TodoList({ title, testId }) {
  const [state, actions] = useTodo()
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim()) {
      actions.addTask(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="display-card">
      <h3>{title}</h3>

      <div data-testid={`todo-count-${testId}`}>
        Tasks: {state.tasks.length}
      </div>

      <input
        data-testid={`todo-input-${testId}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter task..."
      />

      <button
        data-testid={`todo-add-${testId}`}
        onClick={handleAdd}
      >
        Add
      </button>

      <ul data-testid={`todo-list-${testId}`} className="task-list">
        {state.tasks.map(task => (
          <li key={task.id} className="task-item">
            {task.text}
            <button onClick={() => actions.removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ScopedTodos() {
  const [showSetup, setShowSetup] = useState(false)
  const [showTests, setShowTests] = useState(false)

  return (
    <div className="test-section">
      <div className="test-section-header">
        <h2 className="test-section-title">
          Scoped Store Instances - Isolation Demo
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
          <li>You see <strong>three todo lists</strong>: "Personal Tasks", "Work Tasks", and "Shopping List"</li>
          <li>Each list is wrapped in a <strong>TodoContainer</strong> (created with <strong>createContainer</strong>) with a unique <strong>scope</strong> prop ("personal", "work", "shopping")</li>
          <li>The <strong>"Tasks: X"</strong> count, <strong>input field</strong>, <strong>"Add"</strong> button, and <strong>task list</strong> in each card access their own isolated store instance based on the scope</li>
          <li>Adding a task in one list (e.g., Personal) only updates that list's count and items - the other lists remain completely unchanged</li>
          <li>Each scope maintains its own separate state even though they all use the same TodoStore definition</li>
        </ul>
        </div>
      )}

      {showTests && (
        <div className="what-this-tests">
        <h4>✓ WHAT THIS TESTS</h4>
        <ul>
          <li>Container scoping creates isolated instances</li>
          <li>Each scope maintains independent state</li>
          <li>Same store definition, different data</li>
        </ul>
        </div>
      )}

      <div className="grid-3">
        <TodoContainer scope="personal">
          <TodoList title="Personal Tasks" testId="personal" />
        </TodoContainer>

        <TodoContainer scope="work">
          <TodoList title="Work Tasks" testId="work" />
        </TodoContainer>

        <TodoContainer scope="shopping">
          <TodoList title="Shopping List" testId="shopping" />
        </TodoContainer>
      </div>
    </div>
  )
}
