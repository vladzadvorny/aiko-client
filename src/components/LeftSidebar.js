import './Sidebar.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import DialogList from './DialogList'

const LeftSidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && <div className="sidebar-overlay active" onClick={onToggle} />}

      <aside className={`left-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span>header</span>
          <i className="toggle-btn" onClick={onToggle}>
            <FaChevronLeft />
          </i>
        </div>
        <div className="sidebar-content">
          <DialogList />
        </div>
        <div className="sidebar-footer">footer</div>
      </aside>

      {/* Floating toggle button when sidebar is closed */}
      {!isOpen && (
        <i className="floating-toggle-btn left" onClick={onToggle}>
          <FaChevronRight />
        </i>
      )}
    </>
  )
}

export default LeftSidebar
