import React from "react";

function SearchBar() {
    return (
        <div className="search-bar">
            <h1>Zyj pełnią życia</h1>
            <p>Odkryj najlepsze salony w okolicy i zarezerwuj wizytę online!</p>
            <div className="search-fields">
                <input type="text" placeholder="Znajdź i zarezerwuj usługę" />
                <input type="text" placeholder="Gdzie?" />
                <button type="submit">Szukaj</button>
            </div>

        </div>
    );
}


export default SearchBar