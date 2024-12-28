import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBagFill, BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const jobstatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobsData: [],
    jobStatus: jobstatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsData() // Fetch initial unfiltered data
  }

  componentDidUpdate(prevProps) {
    const {employmentType, salaryRange} = this.props

    // Re-fetch data only when employment type or salary range changes
    if (
      employmentType !== prevProps.employmentType ||
      salaryRange !== prevProps.salaryRange
    ) {
      this.getJobsData()
    }
  }

  getJobsData = async () => {
    const {employmentType, salaryRange} = this.props
    const {searchInput} = this.state

    // Construct query parameters
    const employmentTypeQuery =
      employmentType.length > 0
        ? `employment_type=${employmentType.join(',')}`
        : ''
    const salaryRangeQuery = salaryRange ? `minimum_package=${salaryRange}` : ''
    const searchQuery = searchInput ? `search=${searchInput}` : ''

    const queryString = [employmentTypeQuery, salaryRangeQuery, searchQuery]
      .filter(param => param !== '') // Remove empty query params
      .join('&')

    const url = `https://apis.ccbp.in/jobs?${queryString}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    this.setState({jobStatus: jobstatusConstants.inProgress})

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data

      if (jobs.length === 0) {
        this.setState({jobStatus: jobstatusConstants.noJobs})
      } else {
        const updatedJobs = jobs.map(job => ({
          id: job.id,
          title: job.title,
          rating: job.rating,
          location: job.location,
          jobDescription: job.job_description,
          employmentType: job.employment_type,
          packagePerAnnum: job.package_per_annum,
          companyLogoUrl: job.company_logo_url,
        }))
        this.setState({
          jobsData: updatedJobs,
          jobStatus: jobstatusConstants.success,
        })
      }
    } else {
      this.setState({jobStatus: jobstatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobsData()
  }

  renderJobsView = () => {
    const {jobsData, searchInput} = this.state

    return (
      <div className="jobs">
        <div className="input-container">
          <input
            type="search"
            value={searchInput}
            placeholder="search"
            onChange={this.onChangeSearchInput}
            className="search-input"
            role="searchbox"
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.onSearch}
            className="search-btn"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="job-details-container">
          <ul className="jobs-list">
            {jobsData.map(job => (
              <Link
                to={{
                  pathname: `/job-details/${job.id}`,
                  state: {title: job.title}, // Pass the title in the state
                }}
                key={job.id}
                className="nav-link"
              >
                <li key={job.id} className="job-item">
                  <div className="side">
                    <img
                      src={job.companyLogoUrl}
                      alt="company logo"
                      className="company-logo"
                    />
                    <div className="column">
                      <h1 className="title">{job.title}</h1>
                      <div className="rating-container">
                        <FaStar className="star-icon" />
                        <p className="para">{job.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space">
                    <div className="side">
                      <FaMapMarkerAlt className="location" />
                      <p className="para">{job.location}</p>
                      <BsFillBagFill className="location" />
                      <p className="para">{job.employmentType}</p>
                    </div>
                    <h1 className="title">{job.packagePerAnnum}</h1>
                  </div>
                  <hr className="line" />
                  <h1 className="des-head">Description</h1>
                  <p className="text">{job.jobDescription}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="view-text">Oops! Something Went Wrong</h1>
      <p className="view-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="noJobs-img"
      />
      <h1 className="view-text">No Jobs Found</h1>
      <p className="view-text">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  render() {
    const {jobStatus} = this.state

    switch (jobStatus) {
      case jobstatusConstants.success:
        return this.renderJobsView()
      case jobstatusConstants.failure:
        return this.renderFailureView()
      case jobstatusConstants.inProgress:
        return this.renderLoaderView()
      case jobstatusConstants.noJobs:
        return this.renderNoJobsView()
      default:
        return null
    }
  }
}
export default JobDetails
