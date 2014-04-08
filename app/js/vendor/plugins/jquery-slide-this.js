/* jQuery Slide This
* ----------------------------------------------------------
* Author: Dave Utley
*
*
*
* ----USAGE----
* Add this class to your element tag:
* class="slidethis"
*
* Add this attribute to your element tag with the values you require:
* data-slidethis="id|uniqueIdHere"
*
*
*/
 /* jQuery Slide This
* ----------------------------------------------------------
* Author: Dave Utley
*
*
*
* ----USAGE----
* Add this class to your element tag:
* class="slidethis"
*
* Add this attribute to your element tag with the values you require:
* data-slidethis="id|uniqueIdHere"
*
*
*/
var slidethis = {};
(function(g) {
  $(document).ready(function() {
    f()
  });
  var l = {};
  var m = {};
  var k = {};
  function f() {
    l = $(".slidethis");
    m = $(".slidethis-prev");
    k = $(".slidethis-next");
    b(l);
    b(m);
    b(k);
    c();
    i();
    a()
  }
  function a() {
    if (typeof m != "undefined" || m.length == 0) {
      for (var n = 0; n < m.length; n++) {
        m.eq(n).click(function() {
          slidethis.slideIt(this["stid"], "prev")
        });
        m.eq(n).attr({href: "javascript:void(0);"})
      }
    }
    if (typeof k != "undefined" || k.length == 0) {
      for (var n = 0; n < k.length; n++) {
        k.eq(n).click(function() {
          slidethis.slideIt(this["stid"], "next")
        });
        k.eq(n).attr({href: "javascript:void(0);"})
      }
    }
  }
  function b(n) {
    for (var q = 0; q < n.length; q++) {
      var p = $(n).eq(q).attr("data-slidethis");
      var o = p.split(",");
      for (var r = 0; r < o.length; r++) {
        var t = false;
        var s = o[r].split("|");
        if ($.inArray(s[0], ["animate"]) != -1) {
          n[q]["st" + s[0]] = Boolean(s[1]);
          t = true
        }
        if ($.inArray(s[0], ["delay", "speed"]) != -1) {
          n[q]["st" + s[0]] = parseInt(s[1]);
          t = true
        }
        if (t == false) {
          n[q]["st" + s[0]] = s[1]
        }
      }
    }
  }
  function c() {
    for (var n = 0; n < l.length; n++) {
      var o = new Array;
      $(l[n]).children("li").each(function() {
        o.push($(this))
      });
      l[n]["stslides"] = o;
      l[n]["stenabled"] = true
    }
  }
  function i() {
    for (var n = 0; n < l.length; n++) {
      j(l[n], false)
    }
  }
  function j(z, p, t) {
    var r = 0;
    var q = 500;
    var C = z.stslides;
    var u = C[0];
    var w = C[C.length - 1];
    if (typeof z.stspeed != "undefined") {
      q = z.stspeed
    }
    if (typeof z.stdelay != "undefined") {
      r = z.stdelay
    }
    if (typeof t != "undefined" && t == "next") {
      w.stleft = -d(u)
    }
    if (typeof t != "undefined" && t == "prev") {
      $(u).animate({opacity: 0}, r, function() {
        $(this).css({position: "absolute",marginLeft: -d(u),opacity: 1})
      })
    }
    for (var v = 0; v < C.length; v++) {
      var B = C[v];
      var o = $(B);
      var y;
      var s;
      B.fullWidth = d(B);
      if (v == 0) {
        y = 0
      } else {
        var A = $(C[v - 1]);
        y = C[v - 1]["stleft"] + parseInt(C[v - 1]["fullWidth"])
      }
      if (B == w && typeof p != "undefined" && p && typeof t != "undefined" && t == "next") {
        var x = y;
        var n = B
      } else {
        B.stleft = y
      }
      if (typeof p != "undefined" && p) {
        o.css({position: "absolute"});
        if (typeof t != "undefined" && t == "next") {
          var s = v + 1;
          if (v == C.length - 1) {
            s = 0
          }
        }
        if (typeof t != "undefined" && t == "prev") {
          var s = (C.length - v);
          if (B == u) {
            s = C.length - 1
          }
        }
        o.delay(s * r).animate({marginLeft: B.stleft}, q, function() {
          if (typeof n != "undefined" && n[0] == $(this)[0] && typeof t != "undefined" && t == "next") {
            var E;
            for (var D = 0; D < C.length; D++) {
              if ($(C[D])[0] == n[0]) {
                E = r * (D - 1)
              }
            }
            w.stleft = x;
            n.css({position: "absolute",marginLeft: w.stleft,opacity: 0}).delay(E).animate({opacity: 1}, r * 2, function() {
              z.stenabled = true
            })
          }
          if (u[0] == $(this)[0] && typeof t != "undefined" && t == "prev") {
            z.stenabled = true
          }
        })
      } else {
        $(B).css({position: "absolute",marginLeft: B.stleft});
        z.stenabled = true
      }
    }
  }
  function d(o) {
    o = $(o);
    var n = parseInt(o.css("width")) + (parseInt(o.css("margin-right")) || 0) + (parseInt(o.css("padding-right")) || 0) + (parseInt(o.css("padding-left")) || 0) + (parseInt(o.css("border-right-width")) || 0) + (parseInt(o.css("border-left-width")) || 0);
    return n
  }
  function h(p, n) {
    var o = e(p)["stslides"];
    if (n == "next") {
      o.push(o.shift())
    }
    if (n == "prev") {
      o.unshift(o.pop())
    }
  }
  function e(p) {
    var o;
    for (var n = 0; n < l.length; n++) {
      if (l[n]["stid"] == p) {
        o = l[n]
      }
    }
    return o
  }
  $.extend(slidethis, {slideIt: function(p, n) {
      var o = e(p);
      if (o.stenabled) {
        o.stenabled = false;
        h(p, n);
        j(o, o.stanimate, n)
      }
    },specificSlide: function(o, n) {
      console.log("stId:" + o + " slideId:" + n)
    }})
}(slidethis.$));
