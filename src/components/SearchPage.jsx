import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import BusinessSearchResult from "./BusinessSearchResult.jsx";
import Pagination from "./Pagination.jsx";
import BusinessMapDialog from "./BusinessMapDialog.jsx";
import Header from "./Header.jsx";
import "../styles/SearchPage.css";
import Footer from "./Footer.jsx";


const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const city = searchParams.get('city');
    const businessType = searchParams.get('type');
    const [businesses, setBusinesses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [businessesPerPage] = useState(10); // Możesz dostosować, ile biznesów na stronę
    const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);

    useEffect(() => {
        const fetchBusinesses = async () => {
            // Tutaj logika do pobierania biznesów z API
            const response = await fetch(`/api/business/search?city=${city}&type=${businessType}&pageable=${currentPage}`);
            const data = await response.json();
            console.log(data);
            setBusinesses(data.content); // Zakładając, że odpowiedź API zawiera pole content z biznesami
        };

        fetchBusinesses();
    }, [city, businessType, currentPage]);

    // Logika dla paginacji
    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    const currentBusinesses = businesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Header/>
            <div className="search-container">
                <div className="search-results-header">
                    <h1 className="search-title">Wyniki wyszukiwania</h1>
                    <button onClick={() => setIsMapDialogOpen(true)} className="map-button">Otwórz mapę</button>
                </div>
                {currentBusinesses.map(business => (
                <BusinessSearchResult key={business.businessId} business={business} />
            ))}
            <BusinessMapDialog
                open={isMapDialogOpen}
                onClose={() => setIsMapDialogOpen(false)}
                businesses={businesses}
            />
            <Pagination
                businessesPerPage={businessesPerPage}
                totalBusinesses={businesses.length}
                paginate={paginate}
            />
            </div>
            <Footer/>
        </div>
    );
};

export default SearchPage;