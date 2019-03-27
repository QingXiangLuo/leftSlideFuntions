/**
 * 封装左滑删除的关键事件
 */
class leftSlideDelete {
    //触屏开始事件
    touchStartFun(e) {
        console.log("touchStartFun");
        if (lastObj !== null && preObj === null) {
            $(lastObj).animate({"left": "0px"}, 300);
            lastObj = null;
        } else {
            pos = {x: 0, y: 0};
            preObj = e.currentTarget;
            Left = parseInt($(preObj).css('left'));
            let touch = e.touches[0];
            pos.x = touch.pageX;
            pos.y = touch.pageY;
            run = 0;
        }
    }

    //触屏滑动事件
    touchmoveFun(e) {
        console.log("touchmoveFun");
        if (preObj !== null && lastObj === null) {
            let touch = e.touches[0];
            if (run === 0) {
                if (touch.pageX === pos.x && touch.pageY !== pos.y) {
                    run = 2;
                }
                if (touch.pageX !== pos.x && touch.pageY === pos.y) {
                    run = 1;
                    pos.x = touch.pageX;
                }
                if (touch.pageX !== pos.x && touch.pageY !== pos.y) {
                    if (Math.abs(touch.pageX - pos.x) > Math.abs(touch.pageY - pos.y)) {
                        run = 1;
                        pos.x = touch.pageX;
                    } else {
                        run = 2;
                    }
                }
                if (touch.pageX === pos.x && touch.pageY === pos.y) {
                    run = 0;
                }
            } else if (run === 1) {
                e.preventDefault();
                let len = touch.pageX - pos.x;
                if (Left >= 0) {
                    if (len >= -80 && len < 0) {
                        $(e.currentTarget).css({"left": len + "px"});
                    } else if (len < -80) {
                        $(e.currentTarget).css({"left": -80 + "px"});
                    } else if (len > 0) {
                        $(e.currentTarget).css({"left": 0 + "px"});
                    }
                } else if (Left <= -80) {
                    if (len <= 80 && len > 0) {
                        $(e.currentTarget).css({"left": len - 80 + "px"});
                    } else if (len > 80) {
                        $(e.currentTarget).css({"left": 0 + "px"});
                    } else if (len < 0) {
                        $(e.currentTarget).css({"left": -80 + "px"});
                    }
                }
            }
        }
    }

    //触屏结束事件
    touchendFun(e) {
        console.log("touchendFun");
        if (preObj !== null && lastObj === null) {
            let touch = e.changedTouches[0].pageX;
            let len = touch - pos.x;
            if (run === 1) {
                e.preventDefault();
                if (len <= -40) {
                    $(preObj).animate({"left": "-80px"}, 150);
                    lastObj = preObj;
                    preObj = null;
                    isCanClick = false;
                } else if (len > -40 && len < 0 && Left >= 0) {
                    $(preObj).animate({"left": "0px"}, 150);
                    preObj = null;
                    lastObj = null;
                    isCanClick = true;
                } else if (len > 0 && len < 40) {
                    $(preObj).animate({"left": "-80px"}, 150);
                    lastObj = preObj;
                    preObj = null;
                    isCanClick = false;
                } else if (len >= 40) {
                    $(preObj).animate({"left": "0px"}, 150);
                    preObj = null;
                    lastObj = null;
                    isCanClick = true;
                }
            }
        }
    }
}

export default leftSlideDelete
