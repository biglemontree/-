const showActionSheet = (array) => {
    return new Promise((reslove, reject) => {
        wx.showActionSheet({
            itemList: array,
            success: reslove,
            fail: reject
        })
    })
}

/**
 * 模态框
 * @param {*标题} title
 * @param {*提示内容} content
 */
const showModal = (title, content, showCancel = false) => {
    return new Promise((reslove, reject) => {
        wx.showModal({
            title,
            content,
            showCancel: showCancel,
            success: reslove
        })
    })
}

/**
 * 吐司
 * @param {*标题} title
 * @param {*图标} icon
 */
const showToast = (title, icon) => {
    wx.hideToast()
    return new Promise((reslove, reject) => {
        wx.showToast({
            title,
            icon,
            duration: 2000,
            success: reslove
        })
    })
}

export {
    showActionSheet,
    showModal,
    showToast,
}
