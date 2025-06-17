if (localStorage.getItem('serverUrl'))
    window.serverURL = localStorage.getItem('serverUrl');

main = wl.util.mixinStr(main, [
    `1:R meowerConnection = new WebSocket(window.serverURL ?? server);`,
    `4:R openUpdate('Connection error.<br><button onclick="window.changeServerPage();closemodal();">Click here to change server url</button>');`,
], [])

main = wl.util.mixinStr(main, [`338:R fetch(localStorage.getItem("apiUrl")+\`/\${page === "home" ? "" : "chats/"}\${page}/typing\`, {`], [])
loadPfp = wl.util.mixinStr(loadPfp, [`9:R const resp = await fetch(localStorage.getItem("apiUrl")+\`/users/\${username}\`);`], ["username","userData","button"])
loadreply = wl.util.mixinStr(loadreply, [`6:R const replyresp = await fetch(localStorage.getItem("apiUrl")+\`/posts?id=\${replyid}\`, {`], ["postOrigin","replyid"])
login = wl.util.mixinStr(login, [`22:R fetch(localStorage.getItem("apiUrl")+"/auth/login", {`], [])
signup = wl.util.mixinStr(signup, [`1:R fetch(localStorage.getItem("apiUrl")+"/auth/register", {`], ["username","password","captcha"])
sendpost = wl.util.mixinStr(sendpost, [`28:R fetch(localStorage.getItem("apiUrl")+\`/posts?id=\${repst._id}\`, {`,`42:R fetch(localStorage.getItem("apiUrl")+\`/posts?id=\${editIndicator.getAttribute("data-postid")}\`, {`,`99:R const response = await fetch(localStorage.getItem("apiUrl")+\`/\${page === "home" ? "home" : \`posts/\${page}\`}\`, {`], [])
loadstart = wl.util.mixinStr(loadstart, [`29:R fetch(localStorage.getItem("apiUrl")+'/ulist?autoget')`], [])
opendm = wl.util.mixinStr(opendm, [`9:R fetch(localStorage.getItem("apiUrl")+\`/users/\${username}/dm\`, {`], ["username"])
loadchat = wl.util.mixinStr(loadchat, [`4:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}\`, {`], ["chatId"])
loadposts = wl.util.mixinStr(loadposts, [`23:R const response = await fetch(localStorage.getItem("apiUrl")+\`\${path}?page=\${pageNo}\`, {`], ["pageNo"])
loadrecent = wl.util.mixinStr(loadrecent, [`5:R fetch(localStorage.getItem("apiUrl")+\`/users/\${recentuser}/posts\`, {`], ["user"])
loadrecentposts = wl.util.mixinStr(loadrecentposts, [`17:R const response = await fetch(localStorage.getItem("apiUrl")+\`\${path}?page=\${pageNo}\`, {`], ["pageNo"])
loadAuthenticators = wl.util.mixinStr(loadAuthenticators, [`1:R const mfaAuthenticators = (await(await fetch(localStorage.getItem("apiUrl")+"/me/authenticators", {`], [])
addTotpModal = wl.util.mixinStr(addTotpModal, [`5:R totpSecret = await(await fetch(localStorage.getItem("apiUrl")+"/me/authenticators/totp-secret", {`], ["totpSecret"])
addTotp = wl.util.mixinStr(addTotp, [`11:R const resp = await fetch(localStorage.getItem("apiUrl")+"/me/authenticators", {`], ["secret"])
editAuthenticator = wl.util.mixinStr(editAuthenticator, [`4:R const resp = await fetch(localStorage.getItem("apiUrl")+\`/me/authenticators/\${authenticatorId}\`, {`], ["authenticatorId"])
removeAuthenticator = wl.util.mixinStr(removeAuthenticator, [`8:R const resp = await fetch(localStorage.getItem("apiUrl")+\`/me/authenticators/\${authenticatorId}\`, {`], ["authenticatorId"])
resetRecoveryCode = wl.util.mixinStr(resetRecoveryCode, [`8:R const resp = await fetch(localStorage.getItem("apiUrl")+\`/me/reset-mfa-recovery-code\`, {`], [])
loadProfile = wl.util.mixinStr(loadProfile, [`36:R fetch(localStorage.getItem("apiUrl")+\`/users/\${username}\`)`], [])
chatSettings = wl.util.mixinStr(chatSettings, [`4:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}\`, {`], ["chatId"])
chatMembers = wl.util.mixinStr(chatMembers, [`4:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}\`, {`], ["chatId"])
saveChat = wl.util.mixinStr(saveChat, [`33:R xhttp.open("PATCH", localStorage.getItem("apiUrl")+\`/chats/\${chatId}\`);`], ["chatId"])
saveProfile = wl.util.mixinStr(saveProfile, [`34:R xhttp.open("PATCH", localStorage.getItem("apiUrl")+"/me/config");`], [])
deletePost = wl.util.mixinStr(deletePost, [`2:R const response = await fetch(localStorage.getItem("apiUrl")+\`/posts?id=\${postid}\`, {`], ["postid"])
createChat = wl.util.mixinStr(createChat, [`9:R fetch(localStorage.getItem("apiUrl")+"/chats", {`], [])
favChat = wl.util.mixinStr(favChat, [`12:R fetch(localStorage.getItem("apiUrl")+"/me/config", {`], ["e","chatId"])
closeChat = wl.util.mixinStr(closeChat, [`2:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}\`, {`], ["chatId"])
openUsrModal = wl.util.mixinStr(openUsrModal, [`15:R fetch(localStorage.getItem("apiUrl")+\`/users/\${uId}\`)`], ["uId"])
sendReport = wl.util.mixinStr(sendReport, [`1:R fetch(localStorage.getItem("apiUrl")+\`/posts/\${id}/report\`, {`], ["id"])
loadreports = wl.util.mixinStr(loadreports, [`1:R fetch(localStorage.getItem("apiUrl")+"/admin/reports?autoget=1&page=1&status=pending", {`], [])
loadmoduser = wl.util.mixinStr(loadmoduser, [`1:R fetch(localStorage.getItem("apiUrl")+\`/admin/users/\${user}\`, {`,`86:R fetch(localStorage.getItem("apiUrl")+\`/admin/notes/\${data.uuid}\`, {`], ["user"])
loadmodpost = wl.util.mixinStr(loadmodpost, [`1:R fetch(localStorage.getItem("apiUrl")+\`/admin/posts/\${postid}\`, {`,`10:R fetch(localStorage.getItem("apiUrl")+\`/users/\${data.u}\`)`,`62:R fetch(localStorage.getItem("apiUrl")+\`/admin/notes/\${postid}\`, {`], ["postid"])
modDeletePost = wl.util.mixinStr(modDeletePost, [`2:R const response = await fetch(localStorage.getItem("apiUrl")+\`/admin/posts/\${postid}\`, {`], ["postid"])
updateNote = wl.util.mixinStr(updateNote, [`3:R fetch(localStorage.getItem("apiUrl")+\`/admin/notes/\${postid}\`, {`], ["postid"])
sendAlert = wl.util.mixinStr(sendAlert, [`3:R fetch(localStorage.getItem("apiUrl")+\`/admin/users/\${userid}/alert\`, {`], ["userid"])
closeReport = wl.util.mixinStr(closeReport, [`2:R fetch(localStorage.getItem("apiUrl")+\`/admin/reports/\${postid}\`, {`,`19:R fetch(localStorage.getItem("apiUrl")+\`/admin/reports/\${postid}\`, {`], ["postid","action"])
loadstats = wl.util.mixinStr(loadstats, [`2:R const response = await fetch(localStorage.getItem("apiUrl")+'/statistics');`], [])
blockUser = wl.util.mixinStr(blockUser, [`10:R fetch(localStorage.getItem("apiUrl")+\`/users/\${user}/relationship\`, {`], ["user"])
agreementModal = wl.util.mixinStr(agreementModal, [`22:R fetch(localStorage.getItem("apiUrl")+"/").then(resp => resp.json().then(resp => {`], [])
changePassword = wl.util.mixinStr(changePassword, [`1:R fetch(localStorage.getItem("apiUrl")+"/me/password", {`], [])
deleteTokens = wl.util.mixinStr(deleteTokens, [`3:R fetch(localStorage.getItem("apiUrl")+"/me/tokens", {`], [])
deleteAccount = wl.util.mixinStr(deleteAccount, [`3:R fetch(localStorage.getItem("apiUrl")+"/me", {`], ["password"])
transferOwnership = wl.util.mixinStr(transferOwnership, [`2:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}/members/\${user}/transfer\`, {`], ["chatId"])
addMembertoGC = wl.util.mixinStr(addMembertoGC, [`2:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}/members/\${user}\`, {`], ["chatId"])
removeMemberFromGC = wl.util.mixinStr(removeMemberFromGC, [`1:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${chatId}/members/\${user}\`, {`], ["chatId","user"])
notify = wl.util.mixinStr(notify, [`6:R fetch(localStorage.getItem("apiUrl")+\`/chats/\${location}\`, {`,`72:R fetch(localStorage.getItem("apiUrl")+\`/users/\${user}\`)`], ["u","p","location","val"])


const resetButton = document.querySelector(".launch-reset");
resetButton.innerText = "Change server URL";
window.changeServerPage = function changeServerPage(q="main") {
    page = "changeserver";
    window.setUrls = function setUrls() {
        localStorage.setItem('serverUrl', document.getElementById('ws-url').value)
        localStorage.setItem('apiUrl', document.getElementById('api-url').value)
    }
    const pageContainer = document.getElementById(q);
    pageContainer.innerHTML = 
    `<div class='login'>
        haiiiii<br>
        <label for="ws-url">cloudlink url:</label><br>
        <input id="ws-url" value="${(localStorage.getItem('serverUrl') ?? '').replaceAll('"', '&quot;')}">
        <label for="api-url">api url:</label><br>
        <input id="api-url" value="${(localStorage.getItem('apiUrl') ?? '').replaceAll('"', '&quot;')}">
        <br>
        <button onclick="window.setUrls()">set</button>
    </div>
    `; 
}
resetButton.onclick = window.changeServerPage;
resetButton.setAttribute("onclick", "window.changeServerPage()")
wl.events.addEventListener("addSettingsPages", function () {
    log("Adding server url settings page")
    wl.util.addSettingsPage('serverUrl', {
        displayName: "Change server URL",
        func: function load() {
            window.changeServerPage(".settings")
        }
    })
})