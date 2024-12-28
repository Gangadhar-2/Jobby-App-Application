import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="main">
      <h1 className="head-text">Find The Job That Fits Your Life</h1>
      <p className="para-text">
        Millions of people are searching for jobs,salary information,company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="nav-link">
        <button className="find-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
