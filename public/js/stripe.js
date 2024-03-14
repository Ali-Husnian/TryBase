import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
    'pk_test_51OI7wKFW4AE5jwYD35PfpvbXYZzUtooP4l9npEHGCHQt5iLNcqDTbAHZRJ5szVhEFYTO052jM4YD6PJTnNJTaG3S001aIIGIo1',
);

export const bookTour = async tourId => {
    try {
        //1. Get checkout sesstion from the API
        const session = await axios(
            `/api/v1/bookings/checkout-session/${tourId}`,
        );
        // console.log(session);

        // 2. Create checkout from + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id,
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};
