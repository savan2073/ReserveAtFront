import Header from "./Header";

import BusinessCard from "./BusinessCard.jsx";
import Carousel from "./Carousel.jsx";
import "../styles/Home.css";
import Footer from "./Footer.jsx";
import DescriptionSection from "./DescriptionSection.jsx";


function Home() {
    return(
        <div className="Home">
            <Header/>
            <div style={{marginTop: '550px'}}>
            <DescriptionSection/>
            <Carousel>
                <BusinessCard businessId={13} />
                <BusinessCard businessId={15} />
                <BusinessCard businessId={16} />
                <BusinessCard businessId={17} />
                <BusinessCard businessId={18} />
                <BusinessCard businessId={19} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
            </Carousel>
            <Footer/>
            </div>
        </div>
    )
}

export default Home;