import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'














function App() {

  const [article, setArticle] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [news, setNews] = useState([]); 
  const [toggleEdit, setToggleEdit] = useState(true);
  const [newArticleForm, setNewArticleForm] = useState(false);
  const [showArticles, setShowArticles] = useState(true); 

  const handleArticleChange = (e) => {
    setArticle(e.target.value);
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    }
  const handleDateChange = (e) => {
    setDate(e.target.value);
    }
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    }
    const handleImageChange = (e) => {
      setImage(e.target.value);
      }



  const handleNewArticleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://news-project-back.herokuapp.com/news", {
        article: article,
        title: title,
        date: date,
        category: category,
        image: image
      })
      .then(() => {
        axios.get("https://news-project-back.herokuapp.com/news").then((response) => {
          setNews(response.data);
        });
      });
  };

  const handleDeleteArticle = (articleDelete) => {
		axios
			.delete(`https://news-project-back.herokuapp.com/news/${articleDelete._id}`)
			.then(() => {
				axios.get("https://news-project-back.herokuapp.com/news").then((response) => {
					setNews(response.data);
				});
			});
	};

  const handleUpdateArticle = (articleUpdate) => {
    axios
    .put(`https://news-project-back.herokuapp.com/news/${articleUpdate._id}`, {
      article: article,
      title: title,
      date: date,
      category: category,
      image: image
    })
    .then(() => {
      axios.get("https://news-project-back.herokuapp.com/news").then((response) => {
        setNews(response.data)
          });
      });
    };
  
  useEffect(() => {
    axios
    .get('https://news-project-back.herokuapp.com/news')
    .then((res) => {
      setNews(res.data);
    })
  }, [])

  const cardToggle = () => {
		{toggleEdit ? setToggleEdit(false) : setToggleEdit(true);}
	}

  const showArticlesPage = () => {
    setShowArticles(true);
    setNewArticleForm(false);
  }

  const newArticlePage = () => {
    setNewArticleForm(true);
    setShowArticles(false);
  }


  return (
    <div className="main">
      <h1>The App.Post</h1>
      <button onClick={newArticlePage}>Add New Article</button>
      <button onClick={showArticlesPage}>Show Articles</button>
    { newArticleForm ?
      <section className='createForm'>
        <form className="newForm" onSubmit={handleNewArticleFormSubmit}>
          title: <input type="text" onChange={handleTitleChange} />
          category: <input type="text" onChange={handleCategoryChange} />
          article: <input type="text" onChange={handleArticleChange} />
          date: <input type="text" onChange={handleDateChange} />
          image: <input type="text" onChange={handleImageChange} />
          <input type="submit" value="Add New Article" />
        </form>
      </section>
    : null }
    { showArticles ?
      <section className='card-deck showPage'>
        {news.map((article, index) => {
          return(
          <div className="card" key={article._id}>
<<<<<<< HEAD
            <img src={article.image}/>
            <h2>{article.title}</h2>
            <h5>{article.category}</h5>
            <p>{article.article}</p>
            <p>{article.date}</p>
          </div>
          <div>
            <form className="newForm" onSubmit={() => {
              handleUpdateArticle(article)
            }}>
=======
          { toggleEdit ?
            <div className="card-content">
              <img src={article.image}/>
              <h2>{article.title}</h2>
              <h5>{article.category}</h5>
              <p>{article.article}</p>
              <p>{article.date}</p>
            </div>
          :
            <div>
            <form className="updateForm" onSubmit={() => {
                handleUpdateArticle(article)
              }}>
>>>>>>> 7f4bb687bd62cd642cdef95d2b52718b6297938d
              title: <input type="text" onChange={handleTitleChange} />
              category: <input type="text" onChange={handleCategoryChange} />
              article: <input type="text" onChange={handleArticleChange} />
              date: <input type="text" onChange={handleDateChange} />
              image: <input type="text" onChange={handleImageChange} />
<<<<<<< HEAD
              <input type="submit" 
                onClick={()=>{handleUpdateArticle(article)}}
                value="Update Article" />
            </form>
          </div>
          <div>
          <form className="updateForm" onSubmit={() => {
            handleUpdateArticle(article)
          }}>
            title: <input type="text" onChange={handleTitleChange} />
            category: <input type="text" onChange={handleCategoryChange} />
            article: <input type="text" onChange={handleArticleChange} />
            date: <input type="text" onChange={handleDateChange} />
            image: <input type="text" onChange={handleImageChange} />
            <input type="submit" onClick={() => {
              handleUpdateArticle(article)
            }} value= "Update Article"  />
          </form>

=======
              <input type="submit" onClick={() => {
                handleUpdateArticle(article)
              }} value= "Update Article"  />
              <button onClick={(event) => { handleDeleteArticle(article)}}>Delete</button>
            </form>
            </div>
          }   
            <div className='card-button'>
							<button onClick={() =>{cardToggle(index)}}>{ toggleEdit ? "Edit This Article" : "Show All Articles" }</button>
						</div>
>>>>>>> 7f4bb687bd62cd642cdef95d2b52718b6297938d
          </div>
          )
        })
      }
      </section>
    : null}
    </div>
  );
}

export default App;