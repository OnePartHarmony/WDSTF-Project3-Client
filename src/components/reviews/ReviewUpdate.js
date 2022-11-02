import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { reviewUpdate } from "../../api/review"

const ReviewUpdate = (props) => {

    const {currentReview, company, msgAlert} = props
    
    const [review, setReview] = useState(currentReview)

    const handleChange = (e) => {
        setReview(prevReview => {
            return({...prevReview, [e.target.name]: e.target.value})
        })
    }

    const handleSubmit = () => {
        reviewUpdate(review)
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Your review has ben updated.',
                    variant: 'success'
                })
            })
            .catch((err) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to update review.' + err,
                    variant: 'danger'
                })
            })
    }


    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center", }}>
        <div  style={{width: "33vw", margin: "auto", backgroundColor: "rgb(197,231,255)", border: "2px solid rgb(126,196,255)", height: "500px"}}>
            <h3>Update {currentReview.title}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label>Review Title:</Form.Label>
                    <Form.Control type="text" name="title" value={review.title} onChange={handleChange}/>
                </Form.Group>
                <Form.Group clasName="mb-2 star-rating" style={{display: "flex", justifyContent: "space-between"}}>
                    <Form.Label>Your Rating:</Form.Label>
                    {/* Star rating radio inputs */}
                    <Form.Check type="radio" name="generalRating" value="1" label='1' onChange={handleChange}/>
                    <Form.Check type="radio" name="generalRating" value="2" label='2' onChange={handleChange}/>
                    <Form.Check type="radio" name="generalRating" value="3" label='3' onChange={handleChange} />
                    <Form.Check type="radio" name="generalRating" value="4" label='4' onChange={handleChange} />
                    <Form.Check type="radio" name="generalRating" value="5" label='5' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Starting Position:</Form.Label>
                    <Form.Select aria-label="starting position" name="startingPosition" defaultValue={review.startingPosition} onChange={handleChange}>
                        <option value="Entry">Entry</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Management">Management</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Starting Salary:</Form.Label>
                    <Form.Control placeholder={`Your starting yearly salary at ${company.name} in USD`} name="startingSalary" value={review.startingSalary}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Review:</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="What are your reasons for this rating?" name="content" value={review.content} onChange={handleChange}/>
                </Form.Group>        
                <Button type="submit">Submit Review</Button>
            </Form>
            <Button className='btn-warning' onClick={closeReviewForm}>Nevermind</Button>
        </div>
    </div>
    )
}

export default ReviewUpdate