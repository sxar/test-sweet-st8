import { useState } from 'react'
import './App.css'

import SimpleCounter from './components/tab1/SimpleCounter'
import MultipleSubscribers from './components/tab1/MultipleSubscribers'
import ActionsWithParams from './components/tab1/ActionsWithParams'
import ScopedTodos from './components/tab2/ScopedTodos'
import ContainerPropsDemo from './components/tab2/ContainerPropsDemo'
import ChatLifecycle from './components/tab2/ChatLifecycle'
import SelectorsDemo from './components/tab3/SelectorsDemo'
import MultipleStores from './components/tab3/MultipleStores'
import RaceConditions from './components/tab4/RaceConditions'
import StatePersistence from './components/tab4/StatePersistence'

interface MenuItem {
  id: string
  label: string
  category: string
  component: React.ComponentType
}

const menuItems: MenuItem[] = [
  { id: 'simple-counter', label: 'Simple Counter', category: 'Basic Features', component: SimpleCounter },
  { id: 'multiple-subscribers', label: 'Multiple Subscribers', category: 'Basic Features', component: MultipleSubscribers },
  { id: 'actions-with-parameters', label: 'Actions with Parameters', category: 'Basic Features', component: ActionsWithParams },
  { id: 'scoped-store-instances', label: 'Scoped Store Instances', category: 'Scoping & Containers', component: ScopedTodos },
  { id: 'container-props', label: 'Container Props', category: 'Scoping & Containers', component: ContainerPropsDemo },
  { id: 'container-lifecycle', label: 'Container Lifecycle', category: 'Scoping & Containers', component: ChatLifecycle },
  { id: 'selectors', label: 'Selectors', category: 'Advanced Features', component: SelectorsDemo },
  { id: 'multiple-stores', label: 'Multiple Stores', category: 'Advanced Features', component: MultipleStores },
  { id: 'race-conditions', label: 'Race Conditions', category: 'Miscellaneous', component: RaceConditions },
  { id: 'state-persistence', label: 'State Persistence', category: 'Miscellaneous', component: StatePersistence },
]

const categories = [
  'Basic Features',
  'Scoping & Containers',
  'Advanced Features',
  'Miscellaneous'
]

function App() {
  const [activeTest, setActiveTest] = useState('simple-counter')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const ActiveComponent = menuItems.find(item => item.id === activeTest)?.component

  return (
    <div className="app">
      <header className="app-header">
        <h1>TestSweet | react-sweet-state Test App</h1>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {categories.map(category => {
              const categoryItems = menuItems.filter(item => item.category === category)
              const isExpanded = expandedCategories.includes(category)

              return (
                <div key={category} className="menu-category">
                  <button
                    className="category-header"
                    onClick={() => toggleCategory(category)}
                    data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className={`category-icon ${isExpanded ? 'expanded' : ''}`}>▶</span>
                    <span className="category-label">{category}</span>
                  </button>

                  {isExpanded && (
                    <ul className="category-items">
                      {categoryItems.map(item => (
                        <li key={item.id}>
                          <button
                            className={`menu-item ${activeTest === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTest(item.id)}
                            data-testid={`test-${item.id}`}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        <main className="main-content">
          {ActiveComponent && <ActiveComponent />}
        </main>
      </div>
    </div>
  )
}

export default App
