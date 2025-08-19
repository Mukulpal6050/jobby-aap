import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

class Profile extends Component {
  state = {
    profileData: null,
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({loading: true, error: false})
    const URL = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(URL, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({profileData: data.profile_details, loading: false})
    } else {
      this.setState({error: true, loading: false})
    }
  }

  render() {
    const {profileData, loading, error} = this.state

    if (loading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    if (error) {
      return (
        <div className="profile-error">
          <button type="button" onClick={this.getProfile}>
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="profile-container">
        <img
          src={profileData.profile_image_url}
          alt="profile"
          className="image"
        />
        <h1 className="name">{profileData.name}</h1>
        <p className="des">{profileData.short_bio}</p>
      </div>
    )
  }
}

export default Profile
