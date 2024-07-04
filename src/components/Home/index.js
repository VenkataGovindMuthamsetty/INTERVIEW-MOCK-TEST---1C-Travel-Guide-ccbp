import {Component} from 'react'
import Loader from 'react-loader-spinner'

class Home extends Component {
  state = {
    isShow: true,
    packageList: [],
  }

  componentDidMount() {
    this.getPackage()
  }

  getPackage = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    if (response.ok === true) {
      const dataList = data.packages
      const formattedData = dataList.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        imageUrl: eachObj.image_url,
        description: eachObj.description,
      }))
      this.setState({isShow: false, packageList: formattedData})
    }
  }

  renderList = () => {
    const {packageList} = this.state
    return (
      <div>
        <ul>
          {packageList.map(eachObj => (
            <li key={eachObj.id}>
              <div>
                <img src={eachObj.imageUrl} alt={eachObj.name} />
                <h1>{eachObj.name}</h1>
                <p>{eachObj.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isShow, packageList} = this.state
    console.log(packageList)
    return (
      <div>
        <h1>Travel Guide</h1>
        <div>{isShow ? this.renderLoading() : this.renderList()}</div>
      </div>
    )
  }
}
export default Home
