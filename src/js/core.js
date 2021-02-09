"use strict";
// console.clear();
import "../libs/jquery.min.js";
navigator.serviceWorker.register('/sw.js');
export const $ = window.jQuery,
  nam = "[MagicPH]",
  debug = "[MagicPH Debug]",
  cache = "?cache=2020120702",
  PH = {},
  ls = {},
  check = {};
export let cfg = {},
  iframe = document.createElement("iframe"),
  catlist = document.createElement("div"),
  mNav = document.querySelector(".sidenav"),
  // Modified headers
  mod = {},
  // Original headers
  src = {};
// sn = $('.sidenav'),
// magicN = $('#magicNav'),
// jQuery(function( $ ) {})
