import './Sidebar.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const RightSidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && <div className="sidebar-overlay active" onClick={onToggle} />}

      <aside className={`right-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <i className="toggle-btn" onClick={onToggle}>
            <FaChevronRight />
          </i>
          <span>header</span>
        </div>
        <div className="sidebar-content">
          <h3>Right Sidebar</h3>
          <p>This is the right sidebar content</p>
        </div>
        <div className="sidebar-footer">footer</div>
      </aside>

      {/* Floating toggle button when sidebar is closed */}
      {!isOpen && (
        <i className="floating-toggle-btn right" onClick={onToggle}>
          <FaChevronLeft />
        </i>
      )}
    </>
  )
}

export default RightSidebar
