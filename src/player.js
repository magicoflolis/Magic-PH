// import Plyr from 'plyr';
let quality_240p = "error",
quality_480p = "error",
quality_720p = "error",
quality_1080p = "error";
export default async function ph_player() {
  let itemId = WIDGET_RATINGS_LIKE_FAV.itemId,
    flashvarsId = "flashvars_" + itemId,
    flashvarsObject = eval(flashvarsId),
    getMediaUrl = "error";
    $.each(flashvarsObject.mediaDefinitions, function (i, item) {
      (item.format == 'mp4') ? (getMediaUrl = item.videoUrl) : false;
    })
    await getVideoUrl(getMediaUrl)
    let button = `<div onClick="$('.mgp_contextMenu').addClass('mgp_hidden');$('.mgp_downloadInfo').addClass('mgp_active');" class="mgp_download">Download Video</div>`,
    layout = `
    <div class="mgp_downloadInfo">
      <div class="mgp_copyCloseDiv">
        <div class="mgp_title">Download Options</div>
        <div onClick="$('.mgp_downloadInfo').removeClass('mgp_active');" class="mgp_hideMenu">×</div>
      </div>
      <div class="mgp_titleInfo">Quality</div>
      <ul>
        <li><span>240p:</span><textarea cols="80" rows="1" id="urlArea1" readonly="readonly">${quality_240p}</textarea><a class="suggestToggleAlt greyButton" onclick="copyUrl('urlArea1')">Copy</a></li>
        <li><span>480p:</span><textarea cols="80" rows="1" id="urlArea2" readonly="readonly">${quality_480p}</textarea><a class="suggestToggleAlt greyButton" onclick="copyUrl('urlArea2')">Copy</a></li>
        <li><span>720p:</span><textarea cols="80" rows="1" id="urlArea3" readonly="readonly">${quality_720p}</textarea><a class="suggestToggleAlt greyButton" onclick="copyUrl('urlArea3')">Copy</a></li>
        <li><span>1080p:</span><textarea cols="80" rows="1" id="urlArea4" readonly="readonly">${quality_1080p}</textarea><a class="suggestToggleAlt greyButton" onclick="copyUrl('urlArea4')">Copy</a></li>
        </ul>
    </div>
    <script>
    function copyUrl(id) {
      let Url2 = document.getElementById(id);
      Url2.select();
      document.execCommand("Copy");
  }
    </script>
    `;
    $(button).appendTo("div.mgp_contextMenu > div.mgp_content")
    $(layout).appendTo(".playerFlvContainer")
function getVideoUrl(getMediaUrl) {
    return new Promise((resolve) => {
      $.ajax({
        type: "GET",
        url: getMediaUrl,
        success: (data, status) => {
          if (status == "success") {
            $.each(data, function (i, item) {
              let m = console.log(`[MagicPH] ${item.videoUrl}`);
              (item.quality == '240') ? (quality_240p = item.videoUrl) :
              (item.quality == '480') ? (quality_480p = item.videoUrl) :
              (item.quality == '720') ? (quality_720p = item.videoUrl) :
              (item.quality == '1080') ? (quality_1080p = item.videoUrl) : false
            });
            resolve("We Loaded！")
          }
      }
      })
    });
}
}
