import * as firebase from "firebase";

export const initializeFirebase = () => {
    const config = {
        messagingSenderId: "384521971147"
    }
    firebase.initializeApp(config)
}
export const askForPermissionToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log("token: " + token);
        localStorage.setItem("notification-token", token);
        return token;

    } catch (error) {
        console.error(error);

    }
}
export function initializePush() {
    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(() => {
            console.log("Have Permission");
            return messaging.getToken();
        })
        .then(token => {
            console.log("FCM Token:", token);
            //you probably want to send your new found FCM token to the
            //application server so that they can send any push
            //notification to you.
        })
        .catch(error => {
            if (error.code === "messaging/permission-blocked") {
                console.log("Please Unblock Notification Request Manually");
            } else {
                console.log("Error Occurred", error);
            }
        });
    messaging.onMessage(payload => {
        console.log("Notification Received", payload);
        //this is the function that gets triggered when you receive a 
        //push notification while you’re on the page. So you can 
        //create a corresponding UI for you to have the push 
        //notification handled.
    });
}