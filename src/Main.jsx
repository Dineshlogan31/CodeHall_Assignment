import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import style from "./css/main.module.css"

const Main = () => {
    let [data, setdata] = useState([])
    let [pageNumber,setPageNumber]=useState(0)
    let [query, setQuery] = useState("")

      // UseEffect is a hook to use data fetching and dom manipulation ,it will load whenever render the component
      useEffect(() => {
        fetch("https://gutendex.com/books/")
            .then((x) => x.json())
            .then((value) => { setdata(value) })
            .catch((err) => err)
    },[])

    // set how many data should show in one page
    const dataPerPage=5

    // it is how many data should load when we are visited the page
    const pageVisited=pageNumber * dataPerPage

    // this is display data in one page based on the  slice method and filter the query return the value
    const displayData=data.results?.slice(pageVisited,pageVisited+dataPerPage).filter(value => (value.title.toLowerCase().includes(query)) || (value.authors.find(e => e.name).name.toLowerCase().includes(query))).map((x)=>{
        return (
            <li id={style.list}>
                <div id={style.card}>
                    <img id={style.image} src={x.formats['image/jpeg']} alt="" />
                    <div id={style.innerDiv}>
                        <h1>Title:{x.title}</h1>
                        {x.authors.map((y) => {
                            return (
                                <h2>Author:{y.name}</h2>
                            )
                        })}
                        <h3>Download Count:{x.download_count}</h3>
                        <h3><a href={x.formats["application/x-mobipocket-ebook"]}>Download e-Book</a></h3>
                    </div>
                </div>
            </li>
        )
    })

  

// this is  showing load the pagination page number based on the dataPerPage
const pageCount=Math.ceil(data.results?.length / dataPerPage)

//this method is used to set the Page number based on selected page
const changePage=({selected})=>{
    setPageNumber(selected)
}


    return (
        <div id={style.main}>
            <form action="" method="post">
                <label htmlFor="">Search</label>
                <input type="text" placeholder='Search by Title/Authors' onChange={(e) => {
                    setQuery(e.target.value)
                }} />

            </form>


            <div id={style.display} >
                {displayData}
                <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={style.paginationbttn}
                previousLinkClassName={"previousbttn"}
                nextLinkClassName={"nextbttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={style.paginationActive}
                />
            </div>

        </div>
    )
}

export default Main