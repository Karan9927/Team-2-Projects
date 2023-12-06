//! Get which tab is active
const getActiveTabURL = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  return tab[0];
};

//! Get Time function
const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};

const addNewBookmark = (bookmarksElement, bookmark) => {
  //! here bookmark is an object which contain data from youtube (contentscript.js)

  const bookmarkNoteElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");
  const controlsElement = document.createElement("div");

  bookmarkNoteElement.textContent = bookmark.desc;
  bookmarkNoteElement.className = "bookmark-note";
  controlsElement.className = "bookmark-controls";

  setBookmarkAttributes("play", onPlay, controlsElement);

  const onDeleteClosure = (e) => {
    onDelete(e, bookmark.time);
  };

  setBookmarkAttributes("delete", onDeleteClosure, controlsElement);

  newBookmarkElement.id = "bookmark-" + bookmark.time.toFixed(3);
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  newBookmarkElement.appendChild(bookmarkNoteElement);
  newBookmarkElement.appendChild(controlsElement);
  bookmarksElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const allTimeAtamp = document.getElementById("allTimeAtamp");
  console.log(allTimeAtamp);
  allTimeAtamp.innerHTML = "";

  if (currentBookmarks.length > 0) {
    currentBookmarks.forEach((bookmark) => {
      addNewBookmark(allTimeAtamp, bookmark);
    });
  } else {
    allTimeAtamp.innerHTML = '<i class="row">No bookmarks to show.</i>';
  }
};

const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  //! *tabs.sendMessage()* The message will be received in the extension context by any listeners to the runtime.onMessage event. Listeners may then optionally return something as a response back to the sender.

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const onDelete = async (e, bookmarkTime) => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  const currentVideo = urlParameters.get("v");
  const bookmarkElementToDelete = document.getElementById(
    "bookmark-" + bookmarkTime.toFixed(3)
  );

  bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

  // Fetch the stored bookmarks
  chrome.storage.sync.get([currentVideo], (data) => {
    let currentBookmarks = data[currentVideo]
      ? JSON.parse(data[currentVideo])
      : [];

    // Filter out the deleted bookmark
    currentBookmarks = currentBookmarks.filter(
      (bookmark) => Math.abs(bookmark.time - bookmarkTime) > 0.001
    );

    // Update the stored bookmarks
    chrome.storage.sync.set(
      { [currentVideo]: JSON.stringify(currentBookmarks) },
      () => {
        console.log("Bookmark deleted and storage updated.");
      }
    );
  });

  chrome.tabs.sendMessage(activeTab.id, {
    type: "DELETE",
    value: bookmarkTime,
  });
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);

  return eventListener;
};

//! The 'DOMContentLoaded' event indicates when a browser has finished parsing a document.
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParam = new URLSearchParams(queryParameters);

  const currentVideo = urlParam.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    //! Chrome stores the data locally when the browser is offline and resumes syncing when it's back online.

    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];
      // const title = document.querySelectorAll("#video-title");
      // console.log(title);
      viewBookmarks(currentVideoBookmarks);
      console.log(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is not a YouTube video page.</div>';
  }
});
