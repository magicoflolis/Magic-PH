import mph from './api.js';
const q_err = "[Error] Not Found";
let { q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,getMediaUrl } = q_err;
let fetchP = async (frame = window) => {
  const video = $(".mainPlayerDiv").attr('data-video-id'),
    flashvarsId = `flashvars_${video}`,
    phmedia = frame[flashvarsId].mediaDefinitions;
  let vw = mph.query(".video-wrapper").then(async() => {
    for(let i = 0; i < phmedia.length; i++) {
      let media = phmedia[i];
      media.format === "mp4" ? (getMediaUrl = media.videoUrl) : false;
    };
    let qURL = await mph.getURL(getMediaUrl).then(r => {
      for (let i = 0; i < r.length; i++) {
        let vid = r[i],
        quality = vid.quality,
        link = vid.videoUrl;
        (quality === "240") ? (q_240 = link) :
        (quality === "480") ? (q_480 = link) :
        (quality === "720") ? (q_720 = link) :
        (quality === "1080") ? (q_1080 = link, mph.setItem("mgp_player", '{"quality":1080}')) :
        (quality === "1440") ? (q_1440 = link, mph.setItem("mgp_player", '{"quality":1440}')) :
        (quality === "2160") ? (q_2160 = link, mph.setItem("mgp_player", '{"quality":2160}')) : false;
        q_best = link ?? q_2160 ?? q_1440 ?? q_1080 ?? q_720;
      };
      return q_best ?? q_2160 ?? q_1440 ?? q_1080 ?? q_720 ?? q_480 ?? q_240;
    });
    return qURL;
  })
  return vw;
};

export default fetchP;