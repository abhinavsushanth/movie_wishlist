import React, { Fragment, useEffect, useState } from 'react';

const App = () => {
  useEffect(() => {
      const getAPI = async () => {
          const response = await fetch('http://localhost:8080/');
          console.log(response);
          console.log("app.js");
          const data = await response.json();

          try {
              console.log(data);
              setLoading(false);
              setMovie(data);
          } catch (error) {
              console.log(error);
          }
      };
      getAPI();
  }, []);

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <Fragment>
            <h1>Movie Home</h1>

            <div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <div>
                        {movie.map((data) => (
                            <div key={data._id}>
                                <ul>
                                    <li>
                                        <h1>
                                            <a href={`http://localhost:8080/${data._id}`}>{data.name}</a>
                                        </h1>
                                    </li>
                                    <li>
                                        <img src={data.image} alt={data.name} />
                                    </li>
                                    <li>
                                        <p>{data.description}</p>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h1>Add New Movie</h1>
                <form method="POST" action="http://localhost:8080/add-movie">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="text" name="image" required />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" required />
                    </div>

                    <div>
                        <button type="submit">Add Movie</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default App;