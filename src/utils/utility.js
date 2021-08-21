import moment from "moment";


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD HH:mm')
}

export { formatDate }