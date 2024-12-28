import './index.css'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBagFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <div className="similarJobs-container">
      <li className="list-item">
        <div className="side">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="head-des">Description</h1>
        <p className="para">{jobDescription}</p>
        <div className="side">
          <FaMapMarkerAlt className="location" />
          <p className="para">{location}</p>
          <BsFillBagFill className="location" />
          <p className="para">{employmentType}</p>
        </div>
      </li>
    </div>
  )
}
export default SimilarJobs
