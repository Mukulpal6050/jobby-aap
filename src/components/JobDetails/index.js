import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import './index.css'

class JobDetails extends Component {
  state = {
    job: null,
    similarJobs: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    this.setState({loading: true, error: false})

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        this.setState({loading: false, error: true})
        return
      }

      const data = await response.json()
      this.setState({
        job: data.job_details,
        similarJobs: data.similar_jobs,
        loading: false,
      })
    } catch {
      this.setState({loading: false, error: true})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.fetchJobDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {job, similarJobs, loading, error} = this.state

    if (loading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (error) {
      return this.renderFailureView()
    }

    if (!job) return null

    const {
      company_logo_url: companyLogoUrl,
      title,
      rating,
      location,
      employment_type: employmentType,
      package_per_annum: packagePerAnnum,
      company_website_url: companyWebsiteUrl,
      job_description: jobDescription,
      skills,
      life_at_company: lifeAtCompany,
    } = job

    return (
      <div className="job-details-container">
        {/* -------- Container 1: Job Details -------- */}
        <div className="job-details-card">
          {/* Header */}
          <div className="job-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h2>{title}</h2>
              <p>⭐ {rating}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="job-meta">
            <p>
              <FaMapMarkerAlt /> {location}
            </p>
            <p>
              <FaBriefcase /> {employmentType}
            </p>
            <p>{packagePerAnnum}</p>
          </div>

          <hr />

          {/* Description */}
          <div className="section-header">
            <h1>Description</h1>
            {companyWebsiteUrl && (
              <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                Visit
              </a>
            )}
          </div>
          <p>{jobDescription}</p>

          {/* Skills */}
          <h1>Skills</h1>
          <ul className="skills-grid">
            {skills?.map(skill => (
              <li key={skill.name} className="skill-item">
                <img src={skill.image_url} alt={skill.name} />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>

          {/* Life at Company */}
          <h1>Life at Company</h1>
          <div className="life-at-company">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>

        {/* -------- Container 2: Similar Jobs -------- */}
        <div className="similar-jobs-card">
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-grid">
            {similarJobs.map(similar => (
              <li key={similar.id} className="similar-job-card">
                <img
                  src={similar.company_logo_url}
                  alt="similar job company logo"
                  className="company-logo"
                />
                <h2>{similar.title}</h2>
                <p>⭐ {similar.rating}</p>
                <h3>Description</h3>
                <p>{similar.job_description}</p>
                <p>
                  <FaMapMarkerAlt /> {similar.location}
                </p>
                <p>
                  <FaBriefcase /> {similar.employment_type}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobDetails
