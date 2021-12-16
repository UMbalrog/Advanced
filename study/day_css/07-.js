"use strict";

var aeGap,
    aeObserverAPI,
    aeContainer = document.body.querySelector("#ae-wrapper"),
    aeViewportHeight = window.innerHeight,
    aeHandleCompleted = !1,
    aeNavHeight = 65,
    aeAutoplay = !0;

var aeTouch,
    aeMobileRatio = window.matchMedia("(max-aspect-ratio: 1/1)");
window.matchMedia("(pointer:coarse)").matches ?
    ((aeTouch = !0), aeContainer.classList.add("ae-touch-true")) :
    (aeTouch = !1);

var aeSections = aeContainer.querySelectorAll(".ae-section"),
    aeNav = aeContainer.querySelector("#ae-nav"),
    aeNavLinks = aeNav.querySelectorAll("a"),
    aeProgressPath = 49.9416,
    aeSectionCurrent = "1",
    aeSectionsTop = [],
    aeSectionsBottom = [],
    aeSectionsHeight = [];

function aeNavGetData() {
    aeSections.forEach(function (e) {
            var a = e.getAttribute("data-id");
            (aeSectionsTop[a] =
                e.getBoundingClientRect().top +
                window.pageYOffset -
                aeViewportHeight / 2),
            (aeSectionsBottom[a] =
                e.getBoundingClientRect().bottom +
                window.pageYOffset -
                aeViewportHeight / 2),
            (aeSectionsHeight[a] = e.offsetHeight);
        }),
        document.querySelectorAll("#ae-nav a").forEach(function (e) {
            var a = e.getAttribute("data-id");
            aeContainer.style.setProperty(
                "--ae-nav-" + a,
                e.querySelector("span").clientHeight + "px"
            );
        });
}

function aeNavUpdate() {
    function e(e, a) {
        var t;
        if (1 == a) {
            var r = -aeProgressPath / aeSectionsHeight[aeSectionCurrent];
            (t = (aeY - aeSectionsTop[aeSectionCurrent]) * r + aeProgressPath) < 0 &&
                (t = 0);
        } else t = aeProgressPath;
        aeContainer.querySelector(
            '#ae-nav a[data-id="' + e + '"] svg circle'
        ).style.strokeDashoffset = t;
    }
    aeSections.forEach(function (e) {
            var a = e.getAttribute("data-id");
            aeSectionCurrent != a &&
                aeSectionsTop[a] <= aeY &&
                aeSectionsBottom[a] > aeY &&
                ((aeSectionCurrent = a),
                    aeContainer
                    .querySelector("#ae-nav .ae-active")
                    .classList.remove("ae-active"),
                    aeContainer
                    .querySelector('#ae-nav a[data-id="' + a + '"]')
                    .classList.add("ae-active"));
        }),
        aeY > aeSectionsTop[1] ? e(aeSectionCurrent, !0) : e(aeSectionCurrent, !1);
}

function drawImageProp(e, a, t, r, o, i, n, l) {
    2 === arguments.length &&
        ((t = r = 0), (o = e.canvas.width), (i = e.canvas.height)),
        (n = "number" == typeof n ? n : 0.5) < 0 && (n = 0),
        (l = "number" == typeof l ? l : 0.5) < 0 && (l = 0),
        1 < n && (n = 1),
        1 < l && (l = 1);
    var s,
        c,
        u,
        d,
        S = a.width,
        g = a.height,
        f = Math.min(o / S, i / g),
        p = S * f,
        m = g * f,
        v = 1;
    p < o && (v = o / p),
        Math.abs(v - 1) < 1e-14 && m < i && (v = i / m),
        (s = (S - (u = S / ((p *= v) / o))) * n) < 0 && (s = 0),
        (c = (g - (d = g / ((m *= v) / i))) * l) < 0 && (c = 0),
        S < u && (u = S),
        g < d && (d = g);
    console.log(e);
    e.drawImage && e.drawImage(a, s, c, u, d, t, r, o, i);
}

function aeSResize(e, a) {
    var t = (e.width = e.getBoundingClientRect().width),
        r = (e.height = e.getBoundingClientRect().height);
    window.devicePixelRatio;
    if (
        (1 < window.devicePixelRatio &&
            ((t = e.width = 2 * t), (r = e.height = 2 * r)),
            e.getAttribute("data-duration"))
    )
        return (
            (aeSstart[a] =
                aeContainer.querySelector("#" + aeStrigger[a]).getBoundingClientRect()
                .top + window.pageYOffset),
            (aeSduration[a] = e.getAttribute("data-duration") * aeViewportHeight),
            (aeSend[a] = aeSstart[a] + aeSduration[a]),
            (aeSstep[a] = aeSduration[a] / aeStotalFrames[a])
        );
}

aeNavLinks.forEach(function (t) {
    t.onclick = function (e) {
        var a =
            document
            .querySelector(
                '.ae-section[data-id="' + t.getAttribute("data-id") + '"]'
            )
            .getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: a,
            left: 0,
            behavior: "auto"
        }), e.preventDefault();
    };
});
var aeSequences = aeContainer.querySelectorAll(
    ".ae-sequence-scroll, .ae-sequence-custom"
);
aeSequences = Array.prototype.slice.call(aeSequences);
var aeWebpSupport,
    aeSformat,
    aeSactive = 0,
    aeSonscroll = !1,
    aeSdelay = 0,
    aeSimg = [],
    aeSctx = [],
    aeStrigger = [],
    aeSstart = [],
    aeSend = [],
    aeSduration = [],
    aeStotalFrames = [],
    aeSstep = [],
    aeScurrentFrame = [],
    aeSnewFrame = [],
    aeSpath = [];


function aeSscroll(e) {
    (aeSdelay = 0),
    (e = aeContainer.querySelector("#" + e + " canvas")),
    aeY > aeSstart[aeSactive] && aeY < aeSend[aeSactive] ?
        ((aeSnewFrame[aeSactive] = Math.floor(
                (aeY - aeSstart[aeSactive]) / aeSstep[aeSactive]
            ))) :
        0 !== aeScurrentFrame[aeSactive] && aeY <= aeSstart[aeSactive] ?
        ((aeSnewFrame[aeSactive] = 0)) :
        aeScurrentFrame[aeSactive] !== aeStotalFrames[aeSactive] &&
        aeY >= aeSend[aeSactive] &&
        ((aeSnewFrame[aeSactive] = aeStotalFrames[aeSactive]));
}

var aeY,
    aeObserverList = [],
    aeScrollerList = [],
    aeScrollTriggerY = [],
    aeScrollEl = [],
    aeScroller = {
        ease: 0.1,
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0,
        requestId: null,
    };

var aeRequestTime,
    aeObserverMargin,
    aeThrottleLight = 0,
    aePerformanceLow = !1;

function aeThrottle() {
    aeRequestTime - Date.now() < -500 && aeThrottleLight++,
        (aeRequestTime = Date.now()),
        3 < aeThrottleLight &&
        !1 === aePerformanceLow &&
        (console.log("Moderate performance detected. Light mode turned on."),
            aeContainer.classList.add("ae-performance-low"),
            (aePerformanceLow = !0),
            setTimeout(function () {
                aeOnResize();
            }, 500));
}

function aeUpdateScroller() {
    var e = 0 < aeScroller.resizeRequest;
    e && (aeScroller.resizeRequest = 0),
        (aeY =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0),
        (aeScroller.endY = aeY),
        (aeScroller.y += (aeY - aeScroller.y) * aeScroller.ease),
        (Math.abs(aeY - aeScroller.y) < 0.05 || e) &&
        ((aeScroller.y = aeY), (aeScroller.scrollRequest = 0)),
        window.matchMedia("(min-aspect-ratio: 4/3)") &&
        !1 === aePerformanceLow &&
        aeNavUpdate();
    for (var a = 0; a < aeScrollerList.length; a++) {
        var t = aeScrollerList[a];
        window[aeScrollEl[t].func](t);
    }
    aeThrottle(),
        (aeScroller.requestId =
            0 < aeScroller.scrollRequest ?
            requestAnimationFrame(aeUpdateScroller) :
            null);
}

function aeOnScroll() {
    aeScroller.scrollRequest++,
        aeScroller.requestId ||
        ((aeRequestTime = Date.now()),
            (aeScroller.requestId = requestAnimationFrame(aeUpdateScroller)));
}

function aeTestObserver() {
    if (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
    )
        return (
            (aeObserverAPI = !0),
            window.addEventListener("scroll", aeOnScroll)
        );
    // aeContainer.classList.add("ae-fallback", "ae-performance-low"),
    //     (aeObserverAPI = !1);
}

function aeOnResize() {
    (aeMobileRatio = window.matchMedia("(max-aspect-ratio: 1/1)")),

        (aeViewportHeight = window.innerHeight),
        !0 === aeObserverAPI &&
        (aeNavGetData(),
            aeScroller.scrollRequest++,
            aeScroller.requestId ||
            (aeScroller.requestId = requestAnimationFrame(aeUpdateScroller)),
            aeSequences.forEach(function (e, a) {
                aeSResize(e, a),
                    drawImageProp(aeSctx[a], aeSimg[a][aeScurrentFrame[a]]);
            })),
        (aeRequestTime = Date.now());
}

function handleComplete() {
    (aeHandleCompleted = !0),
        window.focus(),
        aeNavGetData(),
        window.addEventListener("resize", function () {
            null != aeResizeTimeOut && clearTimeout(aeResizeTimeOut),
                (aeResizeTimeOut = setTimeout(function () {
                    aeOnResize();
                }, 500));
        }),
        
        aeContainer.classList.add("ae-loaded"),
        document.addEventListener("visibilitychange", aeOnResize),
        window.addEventListener("focus", aeOnResize),
        aeTestObserver();
}
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        !0 !== aeHandleCompleted && handleComplete();
    }, 4e3);
});
var aeResizeTimeOut = null;
window.onload = function () {
    !0 !== aeHandleCompleted && handleComplete();
};