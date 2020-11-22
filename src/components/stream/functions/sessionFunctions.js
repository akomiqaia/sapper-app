import { handleError } from "./errorHandlingFunctions";


export function initializeSession(apiKey, sessionId) {
  if (OT.checkSystemRequirements() == 1) {
    return OT.initSession(apiKey, sessionId);
  } else {
    handleError("your browser doesn't support webRTC");
  }
}
export function manageSession(session) {
  session.on({
    sessionDisconnected: (event) => {
      // The event is defined by the SessionDisconnectEvent class
      if (event.reason == "networkDisconnected") {
        alert("Your network connection terminated.");
      }
    },
    connectionCreated: (event) => {

    },
  });
}
export function connectSession(session, token, publisher) {
  // Connect to the session
  session.connect(token, (error) => {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {

      session.publish(publisher, handleError);

    }
  });
}

export function disconnectFromSession(session) {
  console.log("disconect user");
  session.disconnect();
}
