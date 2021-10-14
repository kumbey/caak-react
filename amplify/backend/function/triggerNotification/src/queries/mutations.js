module.exports = {
    notificationAdded: `mutation NotificationAdded($section: String!, $to: ID!) {
        notificationAdded(section: $section, to: $to) {
            section
            to
        }
    }
    `
}