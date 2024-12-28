import {Component} from 'react'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobs'
import Loader from 'react-loader-spinner'
import './index.css'
import {FaStar, FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'
import {BsFillBagFill} from 'react-icons/bs'

const apiJobDetailConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    title: '',
    jobDetails: {},
    similarJobs: [],
    jobDetailStatus: apiJobDetailConstants.initial,
  }

  componentDidMount() {
    const {state} = this.props.location
    if (state && state.title) {
      this.setState({title: state.title})
    }

    const {id} = this.props.match.params
    this.getJobDetails(id)
  }

  getJobDetails = async () => {
    const {id} = this.props.match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    this.setState({jobDetailStatus: apiJobDetailConstants.inProgress})

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()

        const updatedJobDetails = {
          title: data.job_details.title,
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills,
          lifeAtCompany: data.job_details.life_at_company,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        }

        const updatedSimilarJobs = data.similar_jobs.map(job => ({
          id: job.id,
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        }))

        this.setState({
          jobDetails: updatedJobDetails,
          similarJobs: updatedSimilarJobs,
          jobDetailStatus: apiJobDetailConstants.success,
        })
      } else {
        this.setState({jobDetailStatus: apiJobDetailConstants.failure})
      }
    } catch {
      this.setState({jobDetailStatus: apiJobDetailConstants.failure})
    }
  }

  renderDetailsView() {
    const {jobDetails, similarJobs, title} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails
    return (
      <div className="bg">
        <div className="jobDetails-container">
          <div className="side">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="column">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="space">
            <div className="side">
              <FaMapMarkerAlt className="location" />
              <p className="para">{location}</p>
              <BsFillBagFill className="location" />
              <p className="para">{employmentType}</p>
            </div>
            <h1 className="title">{packagePerAnnum}</h1>
          </div>
          <hr className="line" />
          <div className="description-contaienr">
            <div className="space">
              <h1 className="des-head">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-link"
              >
                Visit <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>
            <p className="para">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="des-head">Skills</h1>
            <ul className="skills-list">
              {skills.map(skill => (
                <li className="skill-item" key={skill.name}>
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-icon"
                  />
                  <p className="skills-label">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lifeAtCompany-container">
            <h1 className="des-head">Life at Company</h1>
            <div className="side">
              <p className="para">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.image_url}
                alt="life at company"
                className="company-img"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-head">Similar Jobs</h1>
          <ul className="similarJobs-list">
            {similarJobs.map(each => (
              <SimilarJobs details={each} key={each.id} />
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
      <h1 className="text">Oops! Something Went Wrong</h1>
      <p className="text">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {jobDetailStatus} = this.state

    switch (jobDetailStatus) {
      case apiJobDetailConstants.success:
        return this.renderDetailsView()
      case apiJobDetailConstants.failure:
        return this.renderFailureView()
      case apiJobDetailConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}
export default JobItemDetails
