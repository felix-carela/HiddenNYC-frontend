import React from 'react'

const EventFormModal = ({eventModalRef, show}) => {
    if(!show){
        return
    }
    return(
        <div className='EventModal' ref={eventModalRef}>
            <form>
                <div>
                    <textarea>

                    </textarea>
                    <input>
                    </input>
                    <button type='submit'></button>
                </div>
            </form>
        </div>
    )
}

export default EventFormModal;