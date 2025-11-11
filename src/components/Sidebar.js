import './Sidebar.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import DialogList from './DialogList'

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && <div className="sidebar-overlay active" onClick={onToggle} />}

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span>Sidebar</span>
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
        <i className="floating-toggle-btn" onClick={onToggle}>
          <FaChevronRight />
        </i>
      )}
    </>
  )
}

export default Sidebar
