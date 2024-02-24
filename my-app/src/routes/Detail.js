import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        console.log(json.data)
        setMovieData(json.data);
    };
    useEffect(() => {
        getMovie();
    }, [id]);

    return ( 
        <div>
            {movieData ? (
                <h1>{movieData.movie.title_long}</h1>
                ) : (
                    <h1>Loading...</h1>
                )
            }        
        </div>
    );
}

export default Detail;