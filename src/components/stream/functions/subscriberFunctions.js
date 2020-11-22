import { handleError } from "./errorHandlingFunctions";

export function replaceSpotlight(session, spotlightDOM, spotlight) {
  session.subscribe(
    spotlight,
    spotlightDOM,
    { width: "100%", height: "100%" },
    (error) => {
      if (error) {
        handleError(error);
      }
    }
  );
}
export function subscribeStream(session, hostDOM, otherDOM, spotlightDOM) {
  let hostSubscriberOptions = {
    insertMode: "append",
    width: "100%",
    height: "100%",
  };
  let otherSubscriberOptions = {
    insertMode: "append",
    width: "150px",
    height: "150px",
  };

  session.on("streamCreated", (event) => {
    if (event.stream.videoType === "screen") {
      session.subscribe(
        event.stream,
        spotlightDOM,
        { width: "100%", height: "100%" },
        (error) => {
          if (error) {
            handleError(error);
          }
        }
      );
      return;
    }
    if (event.stream.videoType === "camera") {
      const isSpecial = JSON.parse(event.stream.connection.data).special_guest;

      let subscriberOptions = isSpecial
        ? hostSubscriberOptions
        : otherSubscriberOptions;
      let subscriberDOM = isSpecial ? hostDOM : otherDOM;

      session.subscribe(
        event.stream,
        subscriberDOM,
        subscriberOptions,
        (error) => {
          if (error) {
            handleError(error);
          }
        }
      );
      return;
    }
  });
  session.on("streamDestroyed", (event) => {
    console.log("stream was destroyed:", event.stream.videoType);
  });
}
