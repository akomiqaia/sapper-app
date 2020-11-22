import { handleError } from "./errorHandlingFunctions";

export function initPublisher(publisherDomElement) {
  let publisherOptions = {
    insertMode: "append",
    width: "100%",
    height: "100%",
    resolution: "1280x720",
    usePreviousDeviceSelection: true,
  };
  return OT.initPublisher(publisherDomElement, publisherOptions, handleError);
}

export function initScreenSharingPublisher(screenSharingDOM) {
  let publisherOptions = {
    videoSource: "screen",
    publishAudio: true,
    maxResolution: { width: 1920, height: 1080 },
    insertMode: "append",
    width: "100%",
    height: "100%",
  };
  let screenSharePublisher = OT.initPublisher(
    screenSharingDOM,
    publisherOptions,
    handleError
  );

  return screenSharePublisher;
}


export function publishScreenshare(session, screenSharePublisher) {
  session.publish(screenSharePublisher, handleError);
}
export function unpublish(session, publisher) {
  session.unpublish(publisher);
}
