import logo from './logo.svg';
import './App.css';
import { Auth } from './compornant/auth';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from './config/firebase';
import { ref, uploadBytes } from 'firebase/storage';


function App() {



  const [movieList, setMovieList] = useState([]);

  const [newMovieRitle, setNewMovieTitle] = useState('');
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState('');

  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db,"movies");

  const getMovieList = async () => {
      
    try{      
      const data = await getDocs(moviesCollectionRef);
      const filteredData = 
        data.docs.map((doc)=> ({
          ...doc.data(),
          id: doc.id,

        }));
      
      console.log(filteredData);
      setMovieList(filteredData);        
} catch (e) {
      console.log(e);
    }


    
  }

const deleteMovie = async (id) => {
  try{
    const movieDoc = doc(db,"movies",id);
    await deleteDoc(movieDoc);
  } catch (e) {
    console.log(e);
  }

  getMovieList();
  
};

const updateMovie = async (id) => {
  try{
    const movieDoc = doc(db,"movies",id);
    await updateDoc(movieDoc,{title: updatedMovieTitle});
  } catch (e) {
    console.log(e);
  }



  getMovieList();
  
};

  useEffect(() =>{
    

    getMovieList();
  },[]);



  const onsubmitMovie = async () => {
    try{
    await addDoc(moviesCollectionRef,{
      title: newMovieRitle,
      releaseDate: newMovieReleaseDate,
      receivedAnOscar: newMovieReceivedAnOscar,
      userId: auth?.currentUser?.uid,
     
    })} catch (e) {
      console.log(e);
      
    }

    getMovieList();
  }

  const uploadFile = async () =>{
    if(!fileUpload){
      return;}
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      try{
        await uploadBytes(filesFolderRef, fileUpload);

      }catch(e){
        console.log(e);
      } 
  };

  return (

    <div className='App'>Firebase Course
    <Auth />
    <div>
   
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green":"red"}}>{movie.title}</h1>
            <p> Date: {movie.releaseDate}</p>

            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <br />
            <input placeholder='New Movie Title' onChange={(e) => setUpdatedMovieTitle(e.target.value)}/>
            <button onClick={()=> updateMovie(movie.id)}>Update Title</button>
            <br />

          </div>
        ))}

        <div>
        <div>
  <input placeholder="Title...." 
  onChange={(e) => setNewMovieTitle(e.target.value)}
  />
</div>
<div>
  <input placeholder="Release Date...."
  type = "number"
  onChange={(e) => setNewMovieReleaseDate(e.target.value)}

  />

</div>

<div>
  <input type="checkbox" 
  checked={newMovieReceivedAnOscar} 
  onChange={(e) => setNewMovieReceivedAnOscar(e.target.checked)}
  />
  <label>Received an Oscar</label>
</div>
<div>
  <button onClick={onsubmitMovie}>Add Movie</button>

</div>
        </div>
      
    </div>
    
    
    
    <div>
      <input type="file" onChange={(e)=> setFileUpload(e.target.files[0]) }  onClick={uploadFile} />
      <button>Upload File</button>
    </div>
    
    </div>
  );
}

export default App;
