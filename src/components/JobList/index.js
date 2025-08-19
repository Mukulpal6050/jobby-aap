import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import './index.css'

class JobList extends Component {
  state = {
    jobs: [],
    loading: true,
    errorStatus: null,
  }

  componentDidMount() {
    this.fetchJobs()
  }

  componentDidUpdate(prevProps) {
    const {
      searchInput,
      selectedEmploymentTypes,
      selectedSalaryRange,
    } = this.props

    if (
      prevProps.searchInput !== searchInput ||
      prevProps.selectedEmploymentTypes !== selectedEmploymentTypes ||
      prevProps.selectedSalaryRange !== selectedSalaryRange
    ) {
      this.fetchJobs()
    }
  }

  fetchJobs = async () => {
    const {
      searchInput,
      selectedEmploymentTypes,
      selectedSalaryRange,
    } = this.props

    const employmentTypesQuery = selectedEmploymentTypes

    const URL = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesQuery}&minimum_package=${selectedSalaryRange}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    this.setState({loading: true, errorStatus: null})

    try {
      const response = await fetch(URL, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({jobs: data.jobs, loading: false, errorStatus: null})
      } else {
        this.setState({loading: false, errorStatus: response.status})
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      this.setState({loading: false, errorStatus: 'NETWORK_ERROR'})
    }
  }

  renderFailureView = () => {
    const {errorStatus} = this.state
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />

        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-text">
          {errorStatus === 'NETWORK_ERROR'
            ? 'Please check your internet connection.'
            : `Something went wrong. Status: ${errorStatus}`}
        </p>
        <button type="button" onClick={this.fetchJobs} className="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {jobs, loading, errorStatus} = this.state

    if (loading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (errorStatus) {
      return this.renderFailureView()
    }

    if (jobs.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-job-image"
          />
          <h2 className="no-jobs-heading">No Jobs Found</h2>
          <p className="no-jobs-para">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobs.map(job => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    )
  }
}

export default JobList
