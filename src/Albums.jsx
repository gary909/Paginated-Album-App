import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css'; // Make sure this path is correct based on your project structure

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 25;

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
        // .map((album) => (
        //     <div key={album.id} className="Album">
        //         {album.title}
        //     </div>
        // ));
        .map((album) => (
            <tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.title}</td>
            </tr>
        ));

    const pageCount = Math.ceil(albums.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="Albums">
            <table className="AlbumsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAlbums}
                </tbody>
            </table>
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

