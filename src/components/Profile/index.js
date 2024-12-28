import {Component} from 'react'
import Cookies from 'js-cookie'
import SortOptions from '../SortOptions'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  retry: 'RETRY',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileData: {},
    apistatus: apistatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    this.setState({apistatus: apistatusConstants.inProgress})

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {name, profile_image_url, short_bio} = data.profile_details
      const updatedData = {
        name,
        profileImageUrl: profile_image_url,
        shortBio: short_bio,
      }
      this.setState({
        profileData: updatedData,
        apistatus: apistatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apistatus: apistatusConstants.retry})
    } else {
      this.setState({apistatus: apistatusConstants.retry})
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {profileImageUrl = '', name = '', shortBio = ''} = profileData
    const {onChangeEmploymentType, onChangeSalaryRange} = this.props

    return (
      <div className="profile">
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-img" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-name">{shortBio}</p>
        </div>
        <SortOptions
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          onChangeEmploymentType={onChangeEmploymentType}
          onChangeSalaryRange={onChangeSalaryRange}
        />
      </div>
    )
  }

  renderRetryView = () => (
    <div className="retry-container">
      <button className="retry-btn" onClick={this.getProfileData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apistatus} = this.state

    switch (apistatus) {
      case apistatusConstants.success:
        return this.renderProfileView()
      case apistatusConstants.retry:
        return this.renderRetryView()
      case apistatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Profile
