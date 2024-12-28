import './index.css'

const NotFound = () => (
  <div className="notFound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notfound-img"
    />
    <h1 className="notfound-title">Page Not Found</h1>
    <p className="para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
