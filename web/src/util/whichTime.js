import moment from "moment";
moment.locale('zh-cn')
const whichTime = (time) => {
    return moment(time).format('lll')
}
export default whichTime