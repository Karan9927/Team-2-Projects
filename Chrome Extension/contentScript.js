let youtubeLeftControls, youtubePlayer;
let currentVideo = "";
let currentVideoBookmarks = [];

const getTime = (t) => {
  let date = new Date(0);
  date.setSeconds(t);
  return date.toISOString().substr(11, 8);
};

const fetchBookmarks = () => {
  return new Promise((resolve) => {
    if (chrome.runtime && !chrome.runtime.lastError) {
      // console.log("chrome", chrome);

      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    } else {
      console.error("Extension context invalidated.");
      resolve([]);
    }
  });
};

const addNewBookmarkEventHandler = async () => {
  const currentTime = youtubePlayer.currentTime;
  const newVideoBookmarkObj = {
    time: currentTime,
    desc: "Bookmark at : " + getTime(currentTime),
    // desc: getTime(currentTime),
  };

  currentVideoBookmarks = await fetchBookmarks();

  chrome.storage.sync.set({
    [currentVideo]: JSON.stringify(
      [...currentVideoBookmarks, newVideoBookmarkObj].sort(
        (a, b) => a.time - b.time
      )
    ),
  });

  // Send a message to the background script to show the badge
  chrome.runtime.sendMessage({ type: "SHOW_BADGE" });
};

const newVideoLoaded = async () => {
  youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
  youtubePlayer = document.getElementsByClassName("video-stream")[0];

  if (youtubeLeftControls && youtubePlayer) {
    currentVideoBookmarks = await fetchBookmarks();
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/timestamp.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";
      bookmarkBtn.style.width = "30px";
      bookmarkBtn.style.height = "30px";
      bookmarkBtn.style.marginTop = "7px";

      youtubeLeftControls.appendChild(bookmarkBtn);

      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

      return true; //! if Bookmark button added
    } else {
      return false; //! if Bookmark button already exists
    }
  }

  return false; //! if Bookmark button not added
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(message);
  const { type, value, videoId } = message;

  if (type === "NEW") {
    currentVideo = videoId;
    // sendResponse(newVideoLoaded());
    newVideoLoaded();
  } else if (type === "PLAY") {
    youtubePlayer.currentTime = value;
  } else if (type === "DELETE") {
    // console.log(value);
    const bookmarkTime = value;
    currentVideoBookmarks = currentVideoBookmarks.filter(
      (b) => b.time !== bookmarkTime
    );
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(currentVideoBookmarks),
    });
    sendResponse(currentVideoBookmarks);
  }
});
