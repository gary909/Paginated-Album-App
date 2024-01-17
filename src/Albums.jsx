import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css'; // Make sure this path is correct based on your project structure

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
                setAlbums(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchAlbums();
    }, []);

    const pagesVisited = currentPage * itemsPerPage;

    const displayAlbums = albums
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((album) => (
            <div key={album.id} className="Album">
                {album.title}
            </div>
        ));

    const pageCount = Math.ceil(albums.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="Albums">
            <div className="AlbumsList">
                {displayAlbums}
            </div>
            <div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            </div>
        </div>
    );
};

export default Albums;

