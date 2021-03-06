/**
 *
 * @desc 获取滚动条距顶部的距离
 */
function getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}
/**
 *
 * @desc 设置滚动条距顶部的距离
 */
function setScrollTop(value) {
    window.scrollTo(0, value);
    return value;
}

var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
/**
 *
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */
function scrollTo(to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    var diff = to - getScrollTop();
    if (diff === 0) return;
    var step = diff / duration * 10;
    requestAnimationFrame(
        function () {
        if (Math.abs(step) > Math.abs(diff)) {
            setScrollTop(getScrollTop() + diff);
            return;
        }
        setScrollTop(getScrollTop() + step);

        if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
            return ;
        }
        scrollTo(to, duration - 16);
    });
}