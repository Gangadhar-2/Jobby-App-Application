import {Component} from 'react'
import Header from '../Header'
import JobDetails from '../JobDetails'
import Profile from '../Profile'
import './index.css'

class Jobs extends Component {
  state = {
    employmentType: [], // Stores selected employment types
    salaryRange: '', // Stores selected salary range
  }

  // Handler for employment type changes
  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    this.setState(prevState => ({
      employmentType: checked
        ? [...prevState.employmentType, value]
        : prevState.employmentType.filter(type => type !== value),
    }))
  }

  // Handler for salary range changes
  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value})
  }

  render() {
    const {employmentType, salaryRange} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          {/* Pass handlers to Profile */}
          <Profile
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
          {/* Pass the filter state to JobDetails */}
          <JobDetails
            employmentType={employmentType}
            salaryRange={salaryRange}
          />
        </div>
      </>
    )
  }
}

export default Jobs
