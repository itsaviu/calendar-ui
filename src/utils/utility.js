import moment from "moment";


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return moment(date).utcOffset("+05:30").format('YYYY-MM-DD HH:mm')
}

export { formatDate }