import React from 'react';
import illustration from '../assets/images/descriptionphoto.jpg'; // Upewnij się, że ścieżka do ilustracji jest prawidłowa
import "../styles/DescriptionSection.css"
function DescriptionSection() {
    return (
        <section className="description-section">
            <div className="description-text">
                <h2>Umów się online</h2>
                <p>Chcesz umówić się do fryzjera, barbera, stylistki paznokci lub salonu masażu w okolicy? Szukasz miejsca, w którym najlepsi specjaliści zadbanją o Twoją brodę, brwi lub zrobią relaksujący masaż?</p>
                <p>ReserveAt to darmowa aplikacja do rezerwacji, dzięki której z łatwością znajdziesz wolny termin i wygodnie umówisz się na wizytę. Bez dzwonienia — rezerwujesz o każdej porze i z dowolnego miejsca.</p>
                <p>Odkrywaj nowe miejsca w okolicy i umawiaj się na wizyty z ReserveAt!</p>
            </div>
            <div className="description-image">
                <img src={illustration} alt="Ilustracja" />
            </div>
        </section>
    );
}

export default DescriptionSection;
