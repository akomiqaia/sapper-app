let archiveId;
export async function record(recording, sessionId, archiveName) {
  let recordingOptions;

  if (recording) {
    recordingOptions = {
      sessionId,
      hasAudio: true,
      hasVideo: true,
      archiveName,
      outputMode: "composed",
    };

    const res = await fetch(`${process.env.BASE_API_URL}/startrecording`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordingOptions),
    });

    const data = await res.json();

    archiveId = data.archive.id;
  } else {
    if (archiveId) {
      console.log("archive id is ", archiveId)
      await fetch(`${process.env.BASE_API_URL}/stoprecording/${archiveId}`);
    } else {
      console.log("there was an error");
    }
  }
}