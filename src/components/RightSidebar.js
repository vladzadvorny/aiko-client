import './RightSidebar.scss'

const RightSidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      <aside className={`right-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <h3>Right Sidebar</h3>
          <p>This is the right sidebar content</p>
          <button className="toggle-btn" onClick={onToggle}>
            {isOpen ? '→' : '←'}
          </button>
        </div>
      </aside>

      {/* Floating toggle button when sidebar is closed */}
      {!isOpen && (
        <button className="floating-toggle-btn right" onClick={onToggle}>
          ←
        </button>
      )}
    </>
  )
}

export default RightSidebar
