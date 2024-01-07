import PropTypes from "prop-types";

const Pagination = ({ businessesPerPage, totalBusinesses, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalBusinesses / businessesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    businessesPerPage: PropTypes.number.isRequired,
    totalBusinesses: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired
};

export default Pagination;
