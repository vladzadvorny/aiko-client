import './Sidebar.scss'

const LeftSidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      <aside className={`left-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <h3>Left Sidebar</h3>
          <p>This is the left sidebar content</p>
          <button className="toggle-btn" onClick={onToggle}>
            {isOpen ? '←' : '→'}
          </button>
        </div>
      </aside>

      {/* Floating toggle button when sidebar is closed */}
      {!isOpen && (
        <button className="floating-toggle-btn left" onClick={onToggle}>
          →
        </button>
      )}
    </>
  )
}

export default LeftSidebar
