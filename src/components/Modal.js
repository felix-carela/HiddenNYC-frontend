import React from 'react'

const ShowModal = ({show}) => {
    //will accept certain params to change the modal ie update the post, create the post, show the post
    // const event = {
    //     try()
    // }

    if(!show){
        return
    }
    return(
        <div className='ShowModal'>
            <p>THIS WILL HAVE INFO</p>
        </div>
    )
}

export default ShowModal