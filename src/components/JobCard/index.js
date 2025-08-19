import {Link} from 'react-router-dom'
import {FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import './index.css'

const JobCard = ({job}) => {
  const {
    id,
    title,
    company_logo_url: companyLogoUrl,
    rating,
    location,
    employment_type: employmentType,
    package_per_annum: packagePerAnnum,
    job_description: jobDescription,
  } = job

  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <div className="job-card">
        {/* Header */}
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt={`${title} company logo`}
            className="job-logo"
          />
          <div className="job-title-section">
            <h2 className="job-title">{title}</h2>
            <p className="job-rating">⭐ {rating}</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="job-meta">
          <div className="meta-left">
            <p className="job-location">
              <FaMapMarkerAlt className="meta-icon" /> {location}
            </p>
            <p className="job-type">
              <FaBriefcase className="meta-icon" /> {employmentType}
            </p>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>

        <hr />
        <h3 className="description-heading">Description</h3>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
