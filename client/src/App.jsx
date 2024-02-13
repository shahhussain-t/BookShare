import { useEffect, useMemo, useState } from "react"
import { add_book, get_book, get_books } from "./redux/book/actions";
import { useDispatch, useSelector } from "react-redux";



function App() {

  const [bookInfo, setBookInfo] = useState({
    bookName: "",
    title: "",
    submit: ""
  });

  const dispatch = useDispatch()
  const { loading, success, error, book, books } = useSelector(state => state.book)

  useEffect(() => {
    dispatch(get_books())
  }, [])

  const submitForm_addBook = (e) => {
    e.preventDefault();
    dispatch(add_book(bookInfo))
  }

  const inputBook_infoHandler = (e) => {
    const { name, value } = e.target;
    setBookInfo({ ...bookInfo, [name]: value })
  }

  return (
    <>

      <form action="" style={{ width: "max-content", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center", border: "1px solid red", padding: "1rem" }}>
        <input onChange={inputBook_infoHandler} name="bookName" type="text" placeholder="bookName" defaultValue="" style={{ border: "1px solid grey", height: "3rem", maxWidth: "30rem", fontSize: "1.3rem", padding: "0.2rem 1rem", borderRadius: "4px" }} />
        <input onChange={inputBook_infoHandler} name="title" type="text" placeholder="title" defaultValue="" style={{ border: "1px solid grey", height: "3rem", maxWidth: "30rem", fontSize: "1.3rem", padding: "0.2rem 1rem", borderRadius: "4px" }} />
        <input onChange={inputBook_infoHandler} name="category" type="text" placeholder="category" defaultValue="" style={{ border: "1px solid grey", height: "3rem", maxWidth: "30rem", fontSize: "1.3rem", padding: "0.2rem 1rem", borderRadius: "4px" }} />
        <input type="submit" onClick={submitForm_addBook} value="Submit" style={{ background: "teal", color: "white", textAlign: "cennter", height: "3rem", cursor: "pointer" }} />
      </form>

      <div style={{ width: "100%", height: "max-content", display: "grid", gridTemplateColumns:"repeat(2, 49%)", columnGap:"1%", rowGap:"0.5rem", marginTop:"2rem"}}>
        {
          loading ? <p>Loading...</p> : success && books.length > 0 &&
            books.map((v, i) => {
             return <div key={i} className="card" style={{ border:"1px solid red",}}>
                <h4>{ v.title }</h4>
                <p>{v.bookName}</p>
                <h6>{v.category}</h6>
              </div>
            })

        }
      </div>

    </>
  )
}

export default App
