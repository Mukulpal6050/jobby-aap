import {Component} from 'react'
import {IoSearch} from 'react-icons/io5'

import Profile from '../Profile'
import JobList from '../JobList'
import Header from '../Header'

import './index.css'

class Jobs extends Component {
  state = {
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    const {selectedEmploymentTypes} = this.state

    let updatedTypes
    if (checked) {
      updatedTypes = [...selectedEmploymentTypes, value]
    } else {
      updatedTypes = selectedEmploymentTypes.filter(type => type !== value)
    }
    this.setState({selectedEmploymentTypes: updatedTypes})
  }

  onChangeSalaryRange = event => {
    this.setState({selectedSalaryRange: event.target.value})
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {searchInput, selectedEmploymentTypes, selectedSalaryRange} =
      this.state

    // ✅ join array into comma-separated string before passing
    const employmentTypesParam = selectedEmploymentTypes.join(',')

    return (
      <div className="jobs-container">
        <Header />
        <div className="job-container">
          <div className="sidebar-container">
            <Profile />

            <hr />
            {/* Employment Types */}
            <div>
              <h1 className="heading">Type of Employment</h1>
              <ul className="checkbox-container">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId} className="list-item">
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                      onChange={this.onChangeEmploymentType}
                      className="checkbox"
                    />
                    <label htmlFor={each.employmentTypeId} className="label">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr />
            {/* Salary Ranges */}
            <div>
              <h1 className="heading">Salary Range</h1>
              <ul className="checkbox-container">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId} className="list-item">
                    <input
                      type="radio"
                      id={each.salaryRangeId}
                      name="salary"
                      value={each.salaryRangeId}
                      onChange={this.onChangeSalaryRange}
                      className="checkbox"
                    />
                    <label htmlFor={each.salaryRangeId} className="label">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="main-container">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-button"
              >
                <IoSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-list-container">
              <JobList
                searchInput={searchInput}
                selectedEmploymentTypes={employmentTypesParam}
                selectedSalaryRange={selectedSalaryRange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
