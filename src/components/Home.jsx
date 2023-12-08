import Header from "./Header";

import BusinessCard from "./BusinessCard.jsx";
import Carousel from "./Carousel.jsx";
import "../styles/Home.css";


function Home() {
    return(
        <div className="Home">
            <Carousel>
                <BusinessCard businessId={1} />
                <BusinessCard businessId={2} />
                <BusinessCard businessId={3} />
                <BusinessCard businessId={4} />
                <BusinessCard businessId={5} />
                <BusinessCard businessId={6} />
                <BusinessCard businessId={7} />
                <BusinessCard businessId={8} />
            </Carousel>

        </div>
    )
}

export default Home;