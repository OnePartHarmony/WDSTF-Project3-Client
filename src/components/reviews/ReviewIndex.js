import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { reviewIndex } from "../../api/review"

const ReviewIndex = (props) => {

    const {companyId, msgAlert} = props

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        reviewIndex(companyId)
            .then(res => {
                setReviews(res.data.reviews)
            })
            .catch((err) => {
                msgAlert({
                    heading: "Failure",
                    message: "Failed to find reviews" + err,
                    variant: "danger"
                })
            })
    }, [])


    const reviewCards = reviews.map(review => {
        return (
        <Card key={review._id} style={{margin: "20px"}}>
            <Card.Header>{review.title}</Card.Header>
            <Card.Body>
                <div style={{display: "flex", justifyContent: "center"}}>
                   {Array.from({length: review.generalRating}, (a,index) => 
                    <svg key={index} width="30" height="30" viewBox="0 0 60 60"><path fill="gold" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/></svg>
                    )} 
                </div>
                <p>{review.startingPosition}</p>
                <p>{review.startingSalary}</p>
            </Card.Body>
            <Card.Footer>
                <Link className="btn btn-success" to={`/reviews/${review._id}`} >Read More</Link>
            </Card.Footer>
        </Card>            
        )

    })
    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center", }}>
            
            <div  style={{overflow: "scroll", width: "33vw", margin: "auto", backgroundColor: "rgb(197,231,255)", border: "2px solid rgb(126,196,255)", height: "500px"}}>
                <div style={{backgroundColor: "rgb(152,212,255)", border: "2px solid rgb(126,196,255)", height: "50px"}}>
                    <h3>Reviews</h3> 
                </div>                
                {reviews.length > 0 ? reviewCards : "No Reviews Yet"}
            </div>            
        </div>
    )
}

export default ReviewIndex