const NotReadyMessage = message => {
    console.warn(message) // for devs.  TODO: replace with our custom logger
    return <div>
        <p>This view could not be rendered properly.  We're sorry for the inconvenience!</p>
        <p>Please notify 
            <b>
                <href a='harvesthavenapps@gmail.com'> harvesthavenapps@gmail.com</href>
            </b>
        </p>
    </div>; // for Users
}

export default NotReadyMessage;