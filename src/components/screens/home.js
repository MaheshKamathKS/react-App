import React,{useEffect,useState} from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import Card from '../card'
import './carausal.css';



const Home = () => {
  const [search, setSearch] = useState('');
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);

const loadData = async()=>{
  let response = await fetch("http://localhost:5001/api/foodData",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  response = await response.json();

  setFoodItem(response[0]);
  setFoodCat(response[1]);
  // console.log(response[0],response[1]);
}

useEffect(()=>{
  loadData()
},[])



  return (
    <div  >
<div><Navbar search={search} setSearch={setSearch} /> </div>
<div ><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption d-none d-md-block" style={{zIndex:"10", }}>
  <div className="d-flex justify-content-center"></div>
  <div>
  <h1 style={{ fontSize: "104px", color: "white", fontFamily: "Allan", fontWeight: 'bold' }}>Nitte Foodz</h1>
</div>
<div style={{ textAlign: "center", color: "aliceblue", marginTop: "22px", fontSize: "30px" }}>
  <h1>Discover the best food & drinks in Nitte</h1>
</div>
{/* <input className="form-control me-2 inp" type="search" placeholder="Search" aria-label="Search" style={{ backgroundColor: "white", padding: "22px", width: "600px", height: "15px", border: "none", outline: "none", borderRadius: "10px",  fontFamily: "sans-serif" }} value={search} onChange={(e)=>{setSearch(e.target.value)}} /> */}


  </div>
    <div className="carousel-item active">
      <img src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1734.jpg" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/premium-photo/bowl-biryani-with-lemon-spiced-rice_234209-405.jpg" className="d-block w-100"  style={{filter:"brightness(50%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/deep-fried-samosas-dumplings-gourmet-appetizer-generated-by-ai_188544-13491.jpg" className="d-block w-100"  style={{filter:"brightness(50%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
<div className='container bg-white '>
  {
    foodCat !==[]
    ? 
    foodCat.map((data)=>{
      return(<div className='row mb-3'>
      <div key={data._id} className='fs-3 m-3'>
      <div className='fs-3 m-3' style={{ color: 'Black', fontWeight: 'bold' }}>
                  {data.CategoryName}
                </div>
        </div>
        <hr />
        {foodItem !==[]
        ? 
        foodItem.filter((item)=>( item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems=>{
          return(
            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
              <Card foodItem= {filterItems}
              options={filterItems.options[0]}
             
              ></Card>
            </div>
          )
        }
         ): <div>No data</div>}
        </div>

      )
    })
    : "" 
  }
  </div>


<div><Footer /></div>


    </div>
  )
}

export default Home