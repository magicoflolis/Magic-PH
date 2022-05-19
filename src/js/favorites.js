import { check } from "./general.js";
import mph from './api.js';
import webext from './api-webext.js';

webext.getItem((config) => {
  if(check.favorites) {
    mph.query("body").then(() => {
    document.title = "[MagicPH] Favorites";
    $(document.body).addClass("mph");
    $(".wrapper > .container").attr("class", "favorites").html(config.favorites);
    let downloader = document.querySelectorAll("button.download-trigger"),
    remover = document.querySelectorAll("button.remove-trigger"),
    downloadfn = (e) => {
      mph.halt(e);
      let m = e.target
      if($(m).text() == "Download") {
        $(m).parent().siblings("div").addClass("rm");
        $(m).parent().parent().parent().addClass("marked");
        $(m).parent().parent().siblings("a").addClass("rm");
        $(m).parent().parent().siblings("span").addClass("rm");
        $(m).text("Downloaded!");
      } else {
        $(m).parent().siblings("div").removeClass("rm");
        $(m).parent().parent().parent().removeClass("marked");
        $(m).parent().parent().siblings("a").removeClass("rm");
        $(m).parent().parent().siblings("span").removeClass("rm");
        $(m).text("Download");
      };
      downloader.forEach((item,i) => {
        downloader[i].removeEventListener("click", downloadfn)
        mph.ael(downloader[i],"click", downloadfn);
        remover[i].removeEventListener("click", removerfn)
        mph.ael(remover[i],"click", removerfn);
      });
      config.favorites = $(".magic-popup > .favorites").html();
      webext.setItem(config);
    },
    removerfn = (e) => {
      mph.halt(e);
      let m = e.target
      if($(m).text() == "Remove") {
        $(m).parent().siblings("div").addClass("rm");
        $(m).parent().parent().parent().addClass("marked");
        $(m).parent().parent().siblings("a").addClass("rm");
        $(m).parent().parent().siblings("span").addClass("rm");
        $(m).text("Undo");
      } else {
        $(m).parent().siblings("div").removeClass("rm");
        $(m).parent().parent().parent().removeClass("marked");
        $(m).parent().parent().siblings("a").removeClass("rm");
        $(m).parent().parent().siblings("span").removeClass("rm");
        $(m).text("Remove");
      };
      downloader.forEach((item,i) => {
        downloader[i].removeEventListener("click", downloadfn)
        mph.ael(downloader[i],"click", downloadfn);
        remover[i].removeEventListener("click", removerfn)
        mph.ael(remover[i],"click", removerfn);
      });
      config.favorites = $(".magic-popup > .favorites").html();
      webext.setItem(config);
    };
    remover.forEach((item,i) => {
      remover[i].removeEventListener("click", removerfn)
      mph.ael(remover[i],"click", removerfn);
    });
    downloader.forEach((item,i) => {
      downloader[i].removeEventListener("click", downloadfn)
      mph.ael(downloader[i],"click", downloadfn);
    });
  });
  };
});


// function fetchURL(link) {
//   return new Promise((resolve,reject) => {
//     $.ajax({
//       type: "GET",
//       url: link,
//       dataType: 'image/jpg',
//       async: true,
//       success: (data) => {
//         resolve(data);
//       },
//       error: (error) => {
//         reject(error);
//       }
//     })
//   });
// };