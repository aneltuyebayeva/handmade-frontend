import { Link } from 'react-router-dom'
import ProductsList from "../components/ProductsList"

const Home = (props) => {
    return (
      <div>
        <div className="homeSectionTop">
          <div className="logoHome"></div>
          <div className="backgroundHome"></div>
        </div>
        <div className="allProductsButtonSection">
          <button className="allProductsButton"><Link to={"/products"}>All products</Link></button>
          </div>
        <div>
        <ProductsList route="/products"/>          
        </div>
        <div className="footer">
          <p>© 2021 by Anel Tuyebayeva. All rights reserved</p>
        </div>
      </div>
    )
  }
  
  export default Home