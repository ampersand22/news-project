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

  return (
    <div className="main">
      <h1>Sarcastic News Site (Create an actual name)</h1>

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

      <section className='card-deck showPage'>
        {news.map((article) => {
          return(
        <>
          <div className="card" key={article._id}>
            <img src={article.image}/>
            <h2>{article.title}</h2>
            <h5>{article.category}</h5>
            <p>{article.article}</p>
            <p>{article.date}</p>

          </div> 
        </>
          )
        })
      }
      </section>
    </div>
  );
}

export default App;