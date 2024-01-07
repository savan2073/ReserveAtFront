import Header from "./Header";

import BusinessCard from "./BusinessCard.jsx";
import Carousel from "./Carousel.jsx";
import "../styles/Home.css";


function Home() {
    return(
        <div className="Home">
            <Header/>
            <Carousel>
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
                <BusinessCard businessId={13} />
            </Carousel>

        </div>
    )
}

export default Home;